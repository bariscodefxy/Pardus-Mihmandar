<script lang="ts">
  import '../app.css';
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
  <slot />
</div>
