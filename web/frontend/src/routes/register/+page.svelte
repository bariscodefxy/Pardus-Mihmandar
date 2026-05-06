<script lang="ts">
  import PageCard from '$lib/components/PageCard.svelte';
</script>

<PageCard title="Create account" description="Register to receive daily hosted AI credits and sync your desktop sessions.">
  <form class="form">
    <label>Name<input class="input" autocomplete="name" /></label>
    <label>Email<input class="input" type="email" autocomplete="email" /></label>
    <label>Password<input class="input" type="password" autocomplete="new-password" /></label>
    <button class="button" type="submit">Create account</button>
  </form>
</PageCard>

<style>.form{display:grid;gap:16px;margin-top:24px}label{display:grid;gap:8px;color:var(--muted)}</style>
