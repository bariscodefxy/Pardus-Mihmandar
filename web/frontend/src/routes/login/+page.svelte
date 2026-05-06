<script lang="ts">
  import { goto } from '$app/navigation';
  import PageCard from '$lib/components/PageCard.svelte';
  import { loginRequest } from '$lib/api/client';
  import { authStore } from '$lib/stores/auth';

  let email = '';
  let password = '';
  let loading = false;
  let errorMessage = '';

  async function submit(): Promise<void> {
    errorMessage = '';
    loading = true;

    try {
      const response = await loginRequest({ email, password, device_name: 'web-frontend' });
      authStore.setSession(response.token, response.user);
      await goto('/dashboard');
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<PageCard title="Login" description="Use the same account in the website and desktop app.">
  <form class="form" on:submit|preventDefault={submit}>
    <label>Email<input class="input" type="email" autocomplete="email" bind:value={email} required /></label>
    <label>Password<input class="input" type="password" autocomplete="current-password" bind:value={password} required /></label>
    {#if errorMessage}<p class="error">{errorMessage}</p>{/if}
    <button class="button" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
  </form>
</PageCard>

<style>
  .form{display:grid;gap:16px;margin-top:24px}
  label{display:grid;gap:8px;color:var(--muted)}
  .error{margin:0;color:var(--danger)}
  button:disabled{opacity:.75;cursor:not-allowed}
</style>
