export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type CreditResponse = {
  credits: {
    id: number;
    balance: number;
    daily_allowance: number;
  };
};

export type ProviderSetting = {
  id: number;
  provider: 'hosted' | 'ollama' | 'lm_studio';
  mode: 'hosted' | 'local';
  base_url: string | null;
  model: string | null;
};

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};
export type AuditLogPayload = {
  event: string;
  actor?: string;
  level?: 'info' | 'warning' | 'high_risk';
  metadata?: Record<string, unknown>;
};

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload !== null && typeof (payload as { message?: unknown }).message === 'string'
        ? ((payload as { message: string }).message)
        : `API request failed (${response.status})`;

    throw new ApiError(response.status, message);
  }

  return payload as T;
}

export const desktopApi = {
  login: (email: string, password: string) =>
    apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, device_name: 'desktop-app' })
    }),
  logout: (token: string) => apiFetch<{ message: string }>('/auth/logout', { method: 'POST' }, token),
  me: (token: string) => apiFetch<{ user: AuthUser }>('/me', {}, token),
  credits: (token: string) => apiFetch<CreditResponse>('/credits', {}, token),
  providerSettings: (token: string) => apiFetch<{ settings: ProviderSetting[] }>('/provider-settings', {}, token),
  saveProviderSettings: (
    token: string,
    payload: { provider: 'hosted' | 'ollama' | 'lm_studio'; mode: 'hosted' | 'local'; base_url?: string; model?: string }
  ) =>
    apiFetch<{ settings: ProviderSetting }>('/provider-settings', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, token),
  hostedChat: (token: string, message: string, model?: string) =>
    apiFetch<{ reply: string; credits_used: number; request_id: number }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, model })
    }, token),
  createAuditLog: (token: string, payload: AuditLogPayload) =>
    apiFetch<{ audit_log: { id: number } }>('/audit-logs', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, token)
};
