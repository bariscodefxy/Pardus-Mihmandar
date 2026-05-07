<script lang="ts">
  import { get } from 'svelte/store';
  import { desktopApi, type ProviderSetting } from './lib/api/client';
  import { sessionStore } from './lib/stores/session';
  import { classifyCommandRisk } from './lib/safety/commandSafety';

  type ViewMessage = {
    role: 'user' | 'assistant';
    content: string;
    source?: 'hosted' | 'local';
  };

  let email = '';
  let password = '';
  let authLoading = false;
  let authError = '';

  let loadingWorkspace = false;
  let workspaceError = '';
  let credits = 0;

  let providerMode: 'hosted' | 'local' = 'hosted';
  let provider: 'hosted' | 'ollama' | 'lm_studio' = 'hosted';
  let baseUrl = '';
  let model = '';
  let providerSaving = false;
  let providerMessage = '';
  let providerTesting = false;
  let providerTestMessage = '';

  let chatInput = '';
  let chatLoading = false;
  let chatError = '';
  let messages: ViewMessage[] = [
    {
      role: 'assistant',
      content: 'Hello. I can explain Linux commands and suggest safer alternatives before you run anything.',
      source: 'hosted'
    }
  ];

  let command = 'sudo apt remove example-package';
  $: risk = classifyCommandRisk(command);

  $: session = get(sessionStore);

  async function login(): Promise<void> {
    authError = '';
    authLoading = true;

    try {
      const response = await desktopApi.login(email, password);
      sessionStore.setSession(response.token, response.user);
      await loadWorkspace();
    } catch (error) {
      authError = error instanceof Error ? error.message : 'Login failed.';
    } finally {
      authLoading = false;
    }
  }

  async function loadWorkspace(): Promise<void> {
    const current = get(sessionStore);
    if (!current.token) {
      return;
    }

    loadingWorkspace = true;
    workspaceError = '';

    try {
      const [me, credit, providerData] = await Promise.all([
        desktopApi.me(current.token),
        desktopApi.credits(current.token),
        desktopApi.providerSettings(current.token)
      ]);

      sessionStore.setUser(me.user);
      credits = credit.credits.balance;

      const active = providerData.settings[0] as ProviderSetting | undefined;
      if (active) {
        providerMode = active.mode;
        provider = active.provider;
        baseUrl = active.base_url ?? '';
        model = active.model ?? '';
      }
    } catch (error) {
      workspaceError = error instanceof Error ? error.message : 'Unable to load workspace.';
      if (workspaceError.toLowerCase().includes('unauth')) {
        sessionStore.clear();
      }
    } finally {
      loadingWorkspace = false;
    }
  }

  async function saveProviderSettings(): Promise<void> {
    const current = get(sessionStore);
    if (!current.token) {
      return;
    }

    providerSaving = true;
    providerMessage = '';

    try {
      await desktopApi.saveProviderSettings(current.token, {
        provider,
        mode: providerMode,
        base_url: baseUrl.trim() || undefined,
        model: model.trim() || undefined
      });
      providerMessage = 'Provider settings saved.';
    } catch (error) {
      providerMessage = error instanceof Error ? error.message : 'Failed to save provider settings.';
    } finally {
      providerSaving = false;
    }
  }

  async function sendMessage(): Promise<void> {
    const current = get(sessionStore);
    if (!current.token || chatLoading || !chatInput.trim()) {
      return;
    }

    chatError = '';
    chatLoading = true;

    const userMessage: ViewMessage = { role: 'user', content: chatInput.trim() };
    const inputSnapshot = chatInput.trim();
    chatInput = '';
    messages = [...messages, userMessage];

    try {
      const answer =
        providerMode === 'hosted'
          ? await sendHostedChat(current.token, inputSnapshot)
          : await sendLocalChat(inputSnapshot);

      messages = [
        ...messages,
        {
          role: 'assistant',
          content: answer,
          source: providerMode === 'hosted' ? 'hosted' : 'local'
        }
      ];

      if (providerMode === 'hosted') {
        const credit = await desktopApi.credits(current.token);
        credits = credit.credits.balance;
      }
    } catch (error) {
      chatError = error instanceof Error ? error.message : 'Failed to send message.';
    } finally {
      chatLoading = false;
    }
  }

  async function sendHostedChat(token: string, userInput: string): Promise<string> {
    const response = await desktopApi.hostedChat(token, userInput, model || undefined);
    return response.reply;
  }

  async function sendLocalChat(userInput: string): Promise<string> {
    if (!baseUrl.trim()) {
      throw new Error('Local mode requires a base URL.');
    }

    const selectedModel = model.trim();
    if (!selectedModel) {
      throw new Error('Local mode requires a model name.');
    }

    if (provider === 'ollama') {
      return sendOllamaChat(baseUrl.trim(), selectedModel, userInput);
    }

    if (provider === 'lm_studio') {
      return sendLmStudioChat(baseUrl.trim(), selectedModel, userInput);
    }

    throw new Error('Choose Ollama or LM Studio for local mode.');
  }

  async function sendOllamaChat(url: string, selectedModel: string, userInput: string): Promise<string> {
    const response = await fetch(`${url.replace(/\/$/, '')}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: selectedModel,
        messages: [{ role: 'user', content: userInput }],
        stream: false
      })
    });

    const payload = (await response.json()) as { message?: { content?: string }; error?: string };

    if (!response.ok) {
      throw new Error(payload.error ?? `Ollama request failed (${response.status}).`);
    }

    const content = payload.message?.content?.trim();
    if (!content) {
      throw new Error('Ollama returned an empty response.');
    }

    return content;
  }

  async function sendLmStudioChat(url: string, selectedModel: string, userInput: string): Promise<string> {
    const response = await fetch(`${url.replace(/\/$/, '')}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: selectedModel,
        messages: [{ role: 'user', content: userInput }]
      })
    });

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      throw new Error(payload.error?.message ?? `LM Studio request failed (${response.status}).`);
    }

    const content = payload.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('LM Studio returned an empty response.');
    }

    return content;
  }

  async function testProviderConnection(): Promise<void> {
    const current = get(sessionStore);
    if (!current.token || providerTesting) {
      return;
    }

    providerTesting = true;
    providerTestMessage = '';

    try {
      if (providerMode === 'hosted') {
        await desktopApi.me(current.token);
        providerTestMessage = 'Hosted connection is valid.';
        return;
      }

      if (!baseUrl.trim()) {
        throw new Error('Enter a base URL to test local provider connection.');
      }

      if (provider === 'ollama') {
        const response = await fetch(`${baseUrl.trim().replace(/\/$/, '')}/api/tags`);
        providerTestMessage = response.ok ? 'Ollama connection successful.' : `Ollama connection failed (${response.status}).`;
        return;
      }

      if (provider === 'lm_studio') {
        const response = await fetch(`${baseUrl.trim().replace(/\/$/, '')}/v1/models`);
        providerTestMessage = response.ok ? 'LM Studio connection successful.' : `LM Studio connection failed (${response.status}).`;
        return;
      }

      throw new Error('Local mode needs Ollama or LM Studio provider.');
    } catch (error) {
      providerTestMessage = error instanceof Error ? error.message : 'Provider test failed.';
    } finally {
      providerTesting = false;
    }
  }

  async function logout(): Promise<void> {
    const current = get(sessionStore);

    try {
      if (current.token) {
        await desktopApi.logout(current.token);
      }
    } finally {
      sessionStore.clear();
      email = '';
      password = '';
      credits = 0;
      messages = [
        {
          role: 'assistant',
          content: 'Hello. I can explain Linux commands and suggest safer alternatives before you run anything.',
          source: 'hosted'
        }
      ];
    }
  }

  if (session?.token) {
    void loadWorkspace();
  }
</script>

{#if !session?.token}
  <main class="auth-shell">
    <section class="auth card">
      <p class="eyebrow">Pardus Mihmandar Desktop</p>
      <h1>Login</h1>
      <p class="muted">Use your website account to access hosted credits and synced settings.</p>

      <form class="auth-form" on:submit|preventDefault={login}>
        <label>Email<input class="input" type="email" bind:value={email} required autocomplete="email" /></label>
        <label>Password<input class="input" type="password" bind:value={password} required autocomplete="current-password" /></label>
        {#if authError}<p class="error">{authError}</p>{/if}
        <button type="submit" disabled={authLoading}>{authLoading ? 'Logging in...' : 'Login'}</button>
      </form>
    </section>
  </main>
{:else}
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
          <p class="muted">Signed in as {session.user?.email} | Credits: {credits}</p>
        </div>
        <button class="secondary" type="button" on:click={logout}>Logout</button>
      </section>

      {#if loadingWorkspace}
        <p class="muted">Loading workspace...</p>
      {:else if workspaceError}
        <p class="error">{workspaceError}</p>
      {/if}

      <section class="grid">
        <div class="chat card">
          <div class="messages">
            {#each messages as message}
              <article class="msg {message.role === 'assistant' ? 'assistant-msg' : 'user-msg'}">
                <p>{message.content}</p>
                {#if message.source}<small>{message.source} mode</small>{/if}
              </article>
            {/each}
          </div>
          <textarea
            bind:value={chatInput}
            placeholder="Ask about a Debian command, package issue, or Linux concept..."
            aria-label="Chat message"
          ></textarea>
          {#if chatError}<p class="error">{chatError}</p>{/if}
          <button on:click={sendMessage} disabled={chatLoading || !chatInput.trim()}>
            {chatLoading ? 'Sending...' : 'Send message'}
          </button>
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

      <section class="card provider">
        <h2>Provider settings</h2>
        <div class="provider-grid">
          <label>
            Mode
            <select bind:value={providerMode}>
              <option value="hosted">Hosted</option>
              <option value="local">Local</option>
            </select>
          </label>
          <label>
            Provider
            <select bind:value={provider}>
              <option value="hosted">Hosted</option>
              <option value="ollama">Ollama</option>
              <option value="lm_studio">LM Studio</option>
            </select>
          </label>
          <label>
            Base URL
            <input bind:value={baseUrl} placeholder="http://localhost:11434" />
          </label>
          <label>
            Model
            <input bind:value={model} placeholder="llama3.1" />
          </label>
        </div>
        <div class="provider-actions">
          <button type="button" on:click={saveProviderSettings} disabled={providerSaving}>
            {providerSaving ? 'Saving...' : 'Save provider settings'}
          </button>
          <button type="button" class="secondary" on:click={testProviderConnection} disabled={providerTesting}>
            {providerTesting ? 'Testing...' : 'Test connection'}
          </button>
          {#if providerMessage}<p class="muted">{providerMessage}</p>{/if}
          {#if providerTestMessage}<p class="muted">{providerTestMessage}</p>{/if}
        </div>
        <p class="muted">Local mode connects directly to Ollama/LM Studio and does not consume hosted credits.</p>
      </section>
    </main>
  </div>
{/if}

<style>
  .auth-shell{min-height:100vh;display:grid;place-items:center;padding:24px}
  .auth{width:min(560px,100%)}
  .auth-form{display:grid;gap:14px;margin-top:18px}
  .auth-form label{display:grid;gap:6px;color:var(--muted)}
  .shell { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
  .sidebar { border-right: 1px solid var(--border); background: #090d12; padding: 22px; }
  .brand { font-weight: 800; letter-spacing: -.03em; margin-bottom: 28px; }
  nav { display: grid; gap: 8px; }
  nav button { color: var(--muted); padding: 11px 12px; border-radius: 12px; background: transparent; border: 0; text-align: left; }
  nav button.active { background: rgba(242,184,75,.12); color: var(--primary); }
  .main { padding: 28px; }
  .topbar { display: flex; justify-content: space-between; gap: 16px; align-items: start; margin-bottom: 24px; }
  .eyebrow { color: var(--primary); text-transform: uppercase; letter-spacing: .14em; font-size: .72rem; }
  h1 { margin: 0; font-size: clamp(2rem, 6vw, 4.5rem); letter-spacing: -.07em; }
  .grid { display: grid; grid-template-columns: 1fr 360px; gap: 18px; }
  .card { border: 1px solid var(--border); border-radius: 22px; background: linear-gradient(180deg, var(--panel-soft), var(--panel)); padding: 20px; }
  .messages{display:grid;gap:10px;max-height:360px;overflow:auto;margin-bottom:12px}
  .msg{border:1px solid var(--border);border-radius:14px;padding:10px 12px}
  .assistant-msg{background:rgba(255,255,255,.02)}
  .user-msg{background:rgba(242,184,75,.08)}
  .msg p{margin:0;white-space:pre-wrap}
  .msg small{color:var(--muted)}
  textarea { width: 100%; min-height: 140px; margin: 12px 0; border: 1px solid var(--border); border-radius: 16px; background: #090d12; color: var(--text); padding: 14px; resize: vertical; }
  input, select { border: 1px solid var(--border); border-radius: 14px; background: #090d12; color: var(--text); padding: 11px 12px; width: 100%; }
  button { border: 0; border-radius: 14px; background: var(--primary); color: #1b1204; font-weight: 800; padding: 12px 16px; }
  .secondary { background: transparent; color: var(--text); border: 1px solid var(--border); }
  .danger { background: transparent; color: var(--danger); border: 1px solid rgba(255,107,107,.45); width: 100%; }
  .risky { color: var(--danger); }
  li { color: var(--muted); margin-bottom: 8px; }
  .provider { margin-top: 18px; }
  .provider-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .provider-actions{display:flex;gap:12px;align-items:center;margin-top:12px;flex-wrap:wrap}
  .muted{color:var(--muted)}
  .error{color:var(--danger);margin:0}
  @media (max-width: 980px) {
    .shell { grid-template-columns: 1fr; }
    .sidebar { border-right: 0; border-bottom: 1px solid var(--border); }
    .grid { grid-template-columns: 1fr; }
    .provider-grid{grid-template-columns:1fr}
  }
</style>
