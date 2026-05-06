<nav class="nav container">
  <a class="brand" href="/">Pardus Mihmandar</a>
  <div class="links">
    <a href="/docs">Docs</a>
    <a href="/login">Login</a>
    <a class="button" href="/register">Create account</a>
  </div>
</nav>

<main class="container hero">
  <section>
    <p class="eyebrow">Linux guidance with safety built in</p>
    <h1>A calm AI guide for Debian beginners.</h1>
    <p class="lead">Understand commands, solve Linux problems, keep notes, and choose hosted credits or local Ollama/LM Studio without unsafe automation.</p>
    <div class="actions">
      <a class="button" href="/register">Start with hosted credits</a>
      <a class="button secondary" href="/docs">See how safety works</a>
    </div>
  </section>
  <aside class="card terminal">
    <span class="dot"></span><span class="dot amber"></span><span class="dot green"></span>
    <pre>$ apt remove package
Risk: high
Why: removes installed software
Safer: simulate first with apt -s remove</pre>
  </aside>
</main>

<style>
  .nav { display: flex; justify-content: space-between; align-items: center; padding: 22px 0; }
  .brand { font-weight: 800; letter-spacing: -0.03em; }
  .links { display: flex; gap: 18px; align-items: center; color: var(--muted); }
  .hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 48px; align-items: center; min-height: 78vh; }
  .eyebrow { color: var(--primary); text-transform: uppercase; letter-spacing: .14em; font-size: .78rem; }
  h1 { font-size: clamp(3rem, 8vw, 6.5rem); line-height: .9; letter-spacing: -.08em; margin: 0; }
  .lead { color: var(--muted); font-size: 1.15rem; max-width: 640px; line-height: 1.7; }
  .actions { display: flex; gap: 14px; margin-top: 28px; flex-wrap: wrap; }
  .terminal { padding: 22px; min-height: 300px; }
  .dot { display: inline-block; width: 11px; height: 11px; border-radius: 50%; background: var(--danger); margin-right: 8px; }
  .amber { background: var(--primary); }
  .green { background: var(--terminal); }
  pre { white-space: pre-wrap; color: var(--terminal); line-height: 1.8; margin-top: 34px; }
  @media (max-width: 800px) { .hero { grid-template-columns: 1fr; } .links { gap: 10px; font-size: .9rem; } }
</style>
