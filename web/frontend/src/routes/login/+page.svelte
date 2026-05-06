<script lang="ts">
  import PageCard from '$lib/components/PageCard.svelte';
</script>

<PageCard title="Login" description="Use the same account in the website and desktop app.">
  <form class="form">
    <label>Email<input class="input" type="email" autocomplete="email" /></label>
    <label>Password<input class="input" type="password" autocomplete="current-password" /></label>
    <button class="button" type="submit">Login</button>
  </form>
</PageCard>

<style>.form{display:grid;gap:16px;margin-top:24px}label{display:grid;gap:8px;color:var(--muted)}</style>
