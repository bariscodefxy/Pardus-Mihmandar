<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import PageCard from '$lib/components/PageCard.svelte';
  import { creditsRequest, logoutRequest, meRequest } from '$lib/api/client';
  import { authStore, type AuthUser } from '$lib/stores/auth';

  let user: AuthUser | null = null;
  let credits = 0;
  let loading = true;
  let errorMessage = '';
  let loggingOut = false;

  onMount(async () => {
    const snapshot = get(authStore);

    if (!snapshot.token) {
      await goto('/login');
      return;
    }

    loading = true;
    errorMessage = '';

    try {
      const [me, credit] = await Promise.all([meRequest(snapshot.token), creditsRequest(snapshot.token)]);
      user = me.user;
      credits = credit.credits.balance;
      authStore.setUser(me.user);
    } catch (error) {
      authStore.clear();
      errorMessage = error instanceof Error ? error.message : 'Session expired. Please login again.';
      await goto('/login');
    } finally {
      loading = false;
    }
  });

  async function logout(): Promise<void> {
    const snapshot = get(authStore);
    loggingOut = true;

    try {
      if (snapshot.token) {
        await logoutRequest(snapshot.token);
      }
    } finally {
      authStore.clear();
      loggingOut = false;
      await goto('/login');
    }
  }
</script>

<PageCard title="Dashboard" description="Your Linux learning workspace, credit status, provider mode, and recent assistant activity.">
  {#if loading}
    <p>Loading dashboard...</p>
  {:else}
    <div class="topbar">
      <p class="welcome">Welcome, {user?.name ?? 'User'}.</p>
      <button class="button secondary" type="button" on:click={logout} disabled={loggingOut}>
        {loggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </div>
    {#if errorMessage}<p class="error">{errorMessage}</p>{/if}
    <div class="grid">
      <div class="mini">Credits<br><strong>{credits}</strong></div>
      <div class="mini">Provider<br><strong>Hosted</strong></div>
      <div class="mini">Risk reviews<br><strong>0</strong></div>
    </div>
  {/if}
</PageCard>

<style>
  .topbar{display:flex;gap:12px;justify-content:space-between;align-items:center;margin-bottom:16px}
  .welcome{margin:0;color:var(--muted)}
  .error{margin:0 0 16px;color:var(--danger)}
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .mini{border:1px solid var(--border);border-radius:16px;padding:16px;color:var(--muted)}
  strong{color:var(--text);font-size:1.8rem}
  button:disabled{opacity:.75;cursor:not-allowed}
  @media(max-width:700px){.grid{grid-template-columns:1fr}.topbar{flex-direction:column;align-items:flex-start}}
</style>
