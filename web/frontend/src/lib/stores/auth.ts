import { writable } from 'svelte/store';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

const STORAGE_KEY = 'pm_web_auth';

function loadInitialState(): AuthState {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { token: null, user: null };
  }

  try {
    const parsed = JSON.parse(raw) as AuthState;
    return {
      token: typeof parsed.token === 'string' ? parsed.token : null,
      user: parsed.user ?? null
    };
  } catch {
    return { token: null, user: null };
  }
}

function persist(state: AuthState): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(loadInitialState());

  return {
    subscribe,
    setSession: (token: string, user: AuthUser) => {
      const next = { token, user };
      persist(next);
      set(next);
    },
    clear: () => {
      const next = { token: null, user: null };
      persist(next);
      set(next);
    },
    setUser: (user: AuthUser) => {
      update((state) => {
        const next = { ...state, user };
        persist(next);
        return next;
      });
    }
  };
}

export const authStore = createAuthStore();
