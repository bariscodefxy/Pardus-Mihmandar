<script lang="ts">
  import { goto } from '$app/navigation';
  import PageCard from '$lib/components/PageCard.svelte';
  import { registerRequest } from '$lib/api/client';
  import { authStore } from '$lib/stores/auth';

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let loading = false;
  let errorMessage = '';

  async function submit(): Promise<void> {
    errorMessage = '';

    if (password !== confirmPassword) {
      errorMessage = 'Password confirmation does not match.';
      return;
    }

    loading = true;

    try {
      const response = await registerRequest({
        name,
        email,
        password,
        password_confirmation: confirmPassword
      });

      authStore.setSession(response.token, response.user);
      await goto('/dashboard');
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<PageCard title="Create account" description="Register to receive daily hosted AI credits and sync your desktop sessions.">
  <form class="form" on:submit|preventDefault={submit}>
    <label>Name<input class="input" autocomplete="name" bind:value={name} required /></label>
    <label>Email<input class="input" type="email" autocomplete="email" bind:value={email} required /></label>
    <label>Password<input class="input" type="password" autocomplete="new-password" bind:value={password} required minlength="8" /></label>
    <label>Confirm password<input class="input" type="password" autocomplete="new-password" bind:value={confirmPassword} required minlength="8" /></label>
    {#if errorMessage}<p class="error">{errorMessage}</p>{/if}
    <button class="button" type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
  </form>
</PageCard>

<style>
  .form{display:grid;gap:16px;margin-top:24px}
  label{display:grid;gap:8px;color:var(--muted)}
  .error{margin:0;color:var(--danger)}
  button:disabled{opacity:.75;cursor:not-allowed}
</style>
