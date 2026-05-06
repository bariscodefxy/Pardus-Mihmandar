<script lang="ts">
  import { classifyCommandRisk } from './lib/safety/commandSafety';

  let providerMode: 'hosted' | 'local' = 'hosted';
  let localProvider: 'ollama' | 'lm_studio' = 'ollama';
  let command = 'sudo apt remove example-package';
  $: risk = classifyCommandRisk(command);
</script>

<div class="shell">
  <aside class="sidebar">
    <div class="brand">Pardus Mihmandar</div>
    <nav>
      <button class="active" type="button">Chat</button>
      <button type="button">Workspace</button>
      <button type="button">Notes</button>
      <button type="button">Tasks</button>
      <button type="button">Snippets</button>
      <button type="button">Diagnostics</button>
      <button type="button">Providers</button>
      <button type="button">Settings</button>
    </nav>
  </aside>

  <main class="main">
    <section class="topbar">
      <div>
        <p class="eyebrow">Linux-safe assistant</p>
        <h1>Ask before you run.</h1>
      </div>
      <select bind:value={providerMode} aria-label="Provider mode">
        <option value="hosted">Hosted credits</option>
        <option value="local">Local AI</option>
      </select>
    </section>

    <section class="grid">
      <div class="chat card">
        <p class="assistant">I can explain Linux commands and help you choose a safer path before touching your system.</p>
        <textarea placeholder="Ask about a Debian command, package issue, or Linux concept..."></textarea>
        <button>Send message</button>
      </div>

      <aside class="card safety">
        <h2>Command safety review</h2>
        <input bind:value={command} aria-label="Command to review" />
        <p class:risky={risk.level === 'high'}>Risk level: {risk.level}</p>
        <ul>
          {#each risk.reasons as reason}
            <li>{reason}</li>
          {/each}
        </ul>
        <button class="danger">Require explicit confirmation</button>
      </aside>
    </section>

    {#if providerMode === 'local'}
      <section class="card provider">
        <h2>Local provider</h2>
        <select bind:value={localProvider} aria-label="Local provider">
          <option value="ollama">Ollama</option>
          <option value="lm_studio">LM Studio</option>
        </select>
        <p>Local mode connects from the desktop app and does not consume hosted credits.</p>
      </section>
    {/if}
  </main>
</div>

<style>
  .shell { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
  .sidebar { border-right: 1px solid var(--border); background: #090d12; padding: 22px; }
  .brand { font-weight: 800; letter-spacing: -.03em; margin-bottom: 28px; }
  nav { display: grid; gap: 8px; }
  nav button { color: var(--muted); padding: 11px 12px; border-radius: 12px; background: transparent; border: 0; text-align: left; }
  nav button.active { background: rgba(242,184,75,.12); color: var(--primary); }
  .main { padding: 28px; }
  .topbar { display: flex; justify-content: space-between; gap: 16px; align-items: start; margin-bottom: 24px; }
  .eyebrow { color: var(--primary); text-transform: uppercase; letter-spacing: .14em; font-size: .72rem; }
  h1 { margin: 0; font-size: clamp(2.4rem, 6vw, 5rem); letter-spacing: -.07em; }
  .grid { display: grid; grid-template-columns: 1fr 360px; gap: 18px; }
  .card { border: 1px solid var(--border); border-radius: 22px; background: linear-gradient(180deg, var(--panel-soft), var(--panel)); padding: 20px; }
  .assistant { color: var(--muted); line-height: 1.7; }
  textarea { width: 100%; min-height: 220px; margin: 18px 0; border: 1px solid var(--border); border-radius: 16px; background: #090d12; color: var(--text); padding: 14px; resize: vertical; }
  input, select { border: 1px solid var(--border); border-radius: 14px; background: #090d12; color: var(--text); padding: 11px 12px; width: 100%; }
  button { border: 0; border-radius: 14px; background: var(--primary); color: #1b1204; font-weight: 800; padding: 12px 16px; }
  .danger { background: transparent; color: var(--danger); border: 1px solid rgba(255,107,107,.45); width: 100%; }
  .risky { color: var(--danger); }
  li { color: var(--muted); margin-bottom: 8px; }
  .provider { margin-top: 18px; max-width: 520px; }
  @media (max-width: 900px) { .shell { grid-template-columns: 1fr; } .sidebar { border-right: 0; border-bottom: 1px solid var(--border); } .grid { grid-template-columns: 1fr; } }
</style>
