<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import PageCard from '$lib/components/PageCard.svelte';
  import { usageRequest, type UsageItem } from '$lib/api/client';
  import { authStore } from '$lib/stores/auth';

  let loading = true;
  let errorMessage = '';
  let usage: UsageItem[] = [];

  onMount(async () => {
    const snapshot = get(authStore);

    if (!snapshot.token) {
      await goto('/login');
      return;
    }

    loading = true;
    errorMessage = '';

    try {
      const response = await usageRequest(snapshot.token);
      usage = response.usage.data;
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load usage history.';
      if (errorMessage.toLowerCase().includes('unauth')) {
        authStore.clear();
        await goto('/login');
      }
    } finally {
      loading = false;
    }
  });
</script>

<PageCard title="Usage history" description="Track hosted AI requests, credit cost, provider, model, and status.">
  {#if loading}
    <p>Loading usage history...</p>
  {:else if errorMessage}
    <p class="error">{errorMessage}</p>
  {:else if usage.length === 0}
    <p>No hosted AI requests yet.</p>
  {:else}
    <div class="list">
      {#each usage as item}
        <article class="row">
          <div>
            <p class="title">{item.provider} ({item.mode})</p>
            <p class="meta">Model: {item.model ?? 'default'} | Status: {item.status}</p>
          </div>
          <div class="cost">-{item.credits_used}</div>
        </article>
      {/each}
    </div>
  {/if}
</PageCard>

<style>
  .error{margin:0;color:var(--danger)}
  .list{display:grid;gap:10px}
  .row{display:flex;justify-content:space-between;gap:12px;align-items:center;border:1px solid var(--border);border-radius:12px;padding:12px}
  .title{margin:0;color:var(--text)}
  .meta{margin:4px 0 0;color:var(--muted);font-size:.9rem}
  .cost{color:var(--primary);font-weight:700}
</style>
