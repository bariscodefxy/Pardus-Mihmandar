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
    user_id: number;
    balance: number;
    daily_allowance: number;
    last_daily_credit_at: string | null;
  };
};

export type CreditTransaction = {
  id: number;
  type: string;
  amount: number;
  balance_after: number;
  description: string | null;
  created_at: string;
};

export type UsageItem = {
  id: number;
  provider: string;
  mode: string;
  model: string | null;
  credits_used: number;
  status: string;
  created_at: string;
};

export type ProviderCatalogItem = {
  slug: 'hosted' | 'ollama' | 'lm_studio';
  name: string;
  mode: 'hosted' | 'local';
};

export type ProviderSetting = {
  id: number;
  user_id: number;
  provider: 'hosted' | 'ollama' | 'lm_studio';
  mode: 'hosted' | 'local';
  base_url: string | null;
  model: string | null;
};

export type DeviceItem = {
  id: number;
  name: string;
  platform: string;
  distro_name: string | null;
  app_version: string | null;
  last_seen_at: string | null;
  revoked_at: string | null;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown
  ) {
    super(message);
  }
}

function parseApiErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === 'object' && payload !== null) {
    const maybeMessage = (payload as { message?: unknown }).message;
    if (typeof maybeMessage === 'string' && maybeMessage.trim().length > 0) {
      return maybeMessage;
    }

    const errors = (payload as { errors?: unknown }).errors;
    if (typeof errors === 'object' && errors !== null) {
      const firstKey = Object.keys(errors)[0];
      const first = firstKey ? (errors as Record<string, unknown>)[firstKey] : null;
      if (Array.isArray(first) && typeof first[0] === 'string') {
        return first[0];
      }
    }
  }

  return fallback;
}

export async function apiFetch<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
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
    const message = parseApiErrorMessage(payload, `API request failed with status ${response.status}`);
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export function registerRequest(payload: { name: string; email: string; password: string; password_confirmation: string }) {
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function loginRequest(payload: { email: string; password: string; device_name?: string }) {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function logoutRequest(token: string) {
  return apiFetch<{ message: string }>('/auth/logout', { method: 'POST' }, token);
}

export function meRequest(token: string) {
  return apiFetch<{ user: AuthUser }>('/me', {}, token);
}

export function creditsRequest(token: string) {
  return apiFetch<CreditResponse>('/credits', {}, token);
}

export function creditTransactionsRequest(token: string) {
  return apiFetch<{ transactions: { data: CreditTransaction[] } }>('/credits/transactions', {}, token);
}

export function usageRequest(token: string) {
  return apiFetch<{ usage: { data: UsageItem[] } }>('/usage', {}, token);
}

export function providersRequest(token: string) {
  return apiFetch<{ providers: ProviderCatalogItem[] }>('/providers', {}, token);
}

export function providerSettingsRequest(token: string) {
  return apiFetch<{ settings: ProviderSetting[] }>('/provider-settings', {}, token);
}

export function upsertProviderSettingsRequest(
  token: string,
  payload: { provider: 'hosted' | 'ollama' | 'lm_studio'; mode: 'hosted' | 'local'; base_url?: string; model?: string }
) {
  return apiFetch<{ settings: ProviderSetting }>('/provider-settings', {
    method: 'POST',
    body: JSON.stringify(payload)
  }, token);
}

export function providerTestRequest(token: string, payload: { provider: 'ollama' | 'lm_studio'; base_url: string }) {
  return apiFetch<{ ok: boolean; status?: number; message?: string }>('/providers/test', {
    method: 'POST',
    body: JSON.stringify(payload)
  }, token);
}

export function devicesRequest(token: string) {
  return apiFetch<{ devices: DeviceItem[] }>('/devices', {}, token);
}

export function revokeDeviceRequest(token: string, id: number) {
  return apiFetch<{ message: string }>(`/devices/${id}`, { method: 'DELETE' }, token);
}
