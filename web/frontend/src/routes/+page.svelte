<main class="container landing">
  <section class="hero card">
    <div>
      <p class="eyebrow">Debian-first AI guide</p>
      <h1>Notion + Copilot, rebuilt for Linux beginners.</h1>
      <p class="lead">
        Pardus Mihmandar explains commands, prevents risky mistakes, and helps users learn Linux step by step with hosted
        credits or local Ollama/LM Studio.
      </p>
      <div class="hero-actions">
        <a class="button" href="/register">Start free with daily credits</a>
        <a class="button secondary" href="/docs">Read safety docs</a>
      </div>
      <p class="footnote">No auto-executed AI commands. Every risky operation requires explicit approval.</p>
    </div>
    <aside class="terminal">
      <p class="terminal-label">Safety preview</p>
      <pre>$ sudo apt remove network-manager
Risk: high
Reason: package removal + privilege escalation
Safer path: apt -s remove network-manager
Action: manual approval required</pre>
    </aside>
  </section>

  <section class="feature-grid">
    <article class="card feature">
      <h2>Hosted Mode</h2>
      <p>Daily credits, account sync, usage history, and managed inference through backend infrastructure.</p>
    </article>
    <article class="card feature">
      <h2>Local Mode</h2>
      <p>Connect directly to Ollama or LM Studio from desktop with zero hosted credit consumption.</p>
    </article>
    <article class="card feature">
      <h2>Safety Layer</h2>
      <p>Risk classification, explanation cards, safer alternatives, and explicit command approval gates.</p>
    </article>
  </section>

  <section class="split">
    <article class="card pane">
      <h3>What beginners get</h3>
      <ul>
        <li>Plain-language Linux explanations</li>
        <li>Command breakdown with risk context</li>
        <li>Workspace for notes, tasks, and snippets</li>
        <li>Guided learning flow for Debian basics</li>
      </ul>
    </article>
    <article class="card pane">
      <h3>What instructors can demo</h3>
      <ul>
        <li>Web + desktop account integration</li>
        <li>Credits model and usage tracking</li>
        <li>Local-provider interoperability</li>
        <li>Security-first command handling model</li>
      </ul>
    </article>
  </section>
</main>

<style>
  .landing{display:grid;gap:22px}
  .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:22px;padding:26px}
  .eyebrow{color:var(--primary);text-transform:uppercase;letter-spacing:.12em;font-size:.75rem;margin:0 0 8px}
  h1{margin:0;font-size:clamp(2rem,5vw,4.4rem);line-height:.95;letter-spacing:-.05em}
  .lead{color:var(--muted);line-height:1.7;font-size:1.05rem;max-width:64ch}
  .hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin:16px 0 8px}
  .footnote{margin:0;color:var(--muted);font-size:.92rem}
  .terminal{border:1px solid var(--border);border-radius:16px;background:#09111b;padding:16px}
  .terminal-label{margin:0;color:var(--primary);font-size:.82rem;text-transform:uppercase;letter-spacing:.12em}
  pre{margin:10px 0 0;color:#8ae4af;line-height:1.7;white-space:pre-wrap}
  .feature-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
  .feature{padding:18px}
  .feature h2{margin:0 0 8px;font-size:1.1rem}
  .feature p{margin:0;color:var(--muted);line-height:1.65}
  .split{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
  .pane{padding:20px}
  .pane h3{margin:0 0 12px}
  ul{margin:0;padding-left:18px;color:var(--muted);display:grid;gap:8px}
  @media(max-width:980px){.hero{grid-template-columns:1fr}.feature-grid{grid-template-columns:1fr}.split{grid-template-columns:1fr}}
</style>
