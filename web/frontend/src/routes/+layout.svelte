<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { authStore } from '$lib/stores/auth';
  import '../app.css';

  const publicRoutes = new Set(['/', '/docs', '/login', '/register']);

  let routeGuardReady = false;
  let hasToken = false;

  $: pathname = $page.url.pathname;
  $: isPublicRoute = publicRoutes.has(pathname);
  $: hasToken = !!get(authStore).token;
  $: canRenderRoute = isPublicRoute || hasToken;

  $: if (browser && routeGuardReady && !isPublicRoute && !hasToken) {
    void goto('/login');
  }

  if (browser) {
    routeGuardReady = true;
  }
</script>

<header class="site-nav">
  <div class="container site-nav-inner">
    <a class="brand" href="/">Pardus Mihmandar</a>
    <div class="nav-links">
      <a class="nav-link" href="/docs">Docs</a>
      <a class="nav-link" href="/dashboard">Dashboard</a>
      <a class="nav-link" href="/credits">Credits</a>
      <a class="nav-link" href="/providers">Providers</a>
      <a class="button secondary" href="/login">Login</a>
      <a class="button" href="/register">Create account</a>
    </div>
  </div>
</header>

<div class="page-shell">
  {#if canRenderRoute}
    <slot />
  {:else}
    <main class="container auth-redirect">
      <section class="card auth-redirect-card">
        <p class="muted">Redirecting to login...</p>
      </section>
    </main>
  {/if}
</div>

<style>
  .auth-redirect{padding:28px 0}
  .auth-redirect-card{padding:18px}
</style>
