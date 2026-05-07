<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import PageCard from '$lib/components/PageCard.svelte';
  import {
    providerSettingsRequest,
    providersRequest,
    providerTestRequest,
    upsertProviderSettingsRequest,
    type ProviderCatalogItem,
    type ProviderSetting
  } from '$lib/api/client';
  import { authStore } from '$lib/stores/auth';

  let loading = true;
  let saving = false;
  let testing = false;
  let errorMessage = '';
  let successMessage = '';
  let testMessage = '';

  let providers: ProviderCatalogItem[] = [];
  let settings: ProviderSetting[] = [];

  let provider: 'hosted' | 'ollama' | 'lm_studio' = 'hosted';
  let mode: 'hosted' | 'local' = 'hosted';
  let baseUrl = '';
  let model = '';

  function applySetting(setting: ProviderSetting | undefined): void {
    if (!setting) return;
    provider = setting.provider;
    mode = setting.mode;
    baseUrl = setting.base_url ?? '';
    model = setting.model ?? '';
  }

  onMount(async () => {
    const snapshot = get(authStore);

    if (!snapshot.token) {
      await goto('/login');
      return;
    }

    loading = true;
    errorMessage = '';

    try {
      const [catalog, userSettings] = await Promise.all([
        providersRequest(snapshot.token),
        providerSettingsRequest(snapshot.token)
      ]);
      providers = catalog.providers;
      settings = userSettings.settings;
      applySetting(settings[0]);
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load provider settings.';
    } finally {
      loading = false;
    }
  });

  async function saveSettings(): Promise<void> {
    const snapshot = get(authStore);
    if (!snapshot.token) {
      await goto('/login');
      return;
    }

    saving = true;
    errorMessage = '';
    successMessage = '';

    try {
      const response = await upsertProviderSettingsRequest(snapshot.token, {
        provider,
        mode,
        base_url: baseUrl.trim() || undefined,
        model: model.trim() || undefined
      });

      const existingIndex = settings.findIndex((item) => item.id === response.settings.id);
      if (existingIndex >= 0) {
        settings[existingIndex] = response.settings;
        settings = [...settings];
      } else {
        settings = [response.settings, ...settings];
      }

      successMessage = 'Provider settings saved.';
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to save settings.';
    } finally {
      saving = false;
    }
  }

  async function testProvider(): Promise<void> {
    const snapshot = get(authStore);
    if (!snapshot.token) {
      await goto('/login');
      return;
    }

    if (provider === 'hosted') {
      testMessage = 'Hosted provider test is managed by backend infrastructure.';
      return;
    }

    testing = true;
    testMessage = '';

    try {
      const response = await providerTestRequest(snapshot.token, {
        provider,
        base_url: baseUrl.trim()
      });

      testMessage = response.ok ? 'Connection successful.' : `Connection failed (${response.status ?? 'unknown'}).`;
    } catch (error) {
      testMessage = error instanceof Error ? error.message : 'Connection test failed.';
    } finally {
      testing = false;
    }
  }
</script>

<PageCard title="Providers" description="Choose hosted credits or connect local Ollama/LM Studio from the desktop app.">
  {#if loading}
    <p class="status" role="status" aria-live="polite">Loading provider settings...</p>
  {:else}
    {#if errorMessage}<p class="status error" role="alert" aria-live="assertive">{errorMessage}</p>{/if}
    {#if successMessage}<p class="status success" role="status" aria-live="polite">{successMessage}</p>{/if}

    <form class="form" on:submit|preventDefault={saveSettings}>
      <label>
        Provider
        <select class="input" bind:value={provider}>
          {#each providers as item}
            <option value={item.slug}>{item.name}</option>
          {/each}
        </select>
      </label>

      <label>
        Mode
        <select class="input" bind:value={mode}>
          <option value="hosted">Hosted</option>
          <option value="local">Local</option>
        </select>
      </label>

      <label>
        Base URL
        <input class="input" bind:value={baseUrl} placeholder="http://localhost:11434" />
      </label>

      <label>
        Model
        <input class="input" bind:value={model} placeholder="llama3.1" />
      </label>

      <div class="actions">
        <button class="button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save settings'}</button>
        <button class="button secondary" type="button" on:click={testProvider} disabled={testing}>{testing ? 'Testing...' : 'Test connection'}</button>
      </div>
    </form>

    {#if testMessage}<p class="status" role="status" aria-live="polite">{testMessage}</p>{/if}
  {/if}
</PageCard>

<style>
  .form{display:grid;gap:14px;margin-top:12px}
  .actions{display:flex;gap:10px;flex-wrap:wrap}
  .status{margin:0 0 8px}
</style>
