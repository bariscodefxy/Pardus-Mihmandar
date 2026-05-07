import { writable } from 'svelte/store';
import type { AuthUser } from '../api/client';

export type SessionState = {
  token: string | null;
  user: AuthUser | null;
};

const STORAGE_KEY = 'pm_desktop_session';

function loadState(): SessionState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { token: null, user: null };
  }

  try {
    const parsed = JSON.parse(raw) as SessionState;
    return {
      token: typeof parsed.token === 'string' ? parsed.token : null,
      user: parsed.user ?? null
    };
  } catch {
    return { token: null, user: null };
  }
}

function persist(state: SessionState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createSessionStore() {
  const { subscribe, set, update } = writable<SessionState>(loadState());

  return {
    subscribe,
    setSession(token: string, user: AuthUser) {
      const next = { token, user };
      persist(next);
      set(next);
    },
    clear() {
      const next = { token: null, user: null };
      persist(next);
      set(next);
    },
    setUser(user: AuthUser) {
      update((state) => {
        const next = { ...state, user };
        persist(next);
        return next;
      });
    }
  };
}

export const sessionStore = createSessionStore();
