<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import PageCard from '$lib/components/PageCard.svelte';
  import { creditTransactionsRequest, creditsRequest, type CreditTransaction } from '$lib/api/client';
  import { authStore } from '$lib/stores/auth';

  let loading = true;
  let errorMessage = '';
  let balance = 0;
  let dailyAllowance = 0;
  let transactions: CreditTransaction[] = [];

  onMount(async () => {
    const snapshot = get(authStore);
    if (!snapshot.token) {
      await goto('/login');
      return;
    }

    loading = true;
    errorMessage = '';

    try {
      const [credit, tx] = await Promise.all([
        creditsRequest(snapshot.token),
        creditTransactionsRequest(snapshot.token)
      ]);
      balance = credit.credits.balance;
      dailyAllowance = credit.credits.daily_allowance;
      transactions = tx.transactions.data;
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load credits.';
      if (errorMessage.toLowerCase().includes('unauth')) {
        authStore.clear();
        await goto('/login');
      }
    } finally {
      loading = false;
    }
  });
</script>

<PageCard title="Credits" description="Hosted AI requests consume credits. Local Ollama and LM Studio do not.">
  {#if loading}
    <p>Loading credits...</p>
  {:else if errorMessage}
    <p class="error">{errorMessage}</p>
  {:else}
    <p class="balance">{balance} credits available</p>
    <p class="meta">Daily allowance: {dailyAllowance}</p>

    {#if transactions.length === 0}
      <p class="meta">No credit transactions yet.</p>
    {:else}
      <div class="list">
        {#each transactions as item}
          <article class="row">
            <div>
              <p class="title">{item.description ?? item.type}</p>
              <p class="meta">Balance after: {item.balance_after}</p>
            </div>
            <div class:itemPos={item.amount > 0} class:itemNeg={item.amount < 0}>
              {item.amount > 0 ? '+' : ''}{item.amount}
            </div>
          </article>
        {/each}
      </div>
    {/if}
  {/if}
</PageCard>

<style>
  .balance{padding:18px;border:1px solid var(--border);border-radius:16px;color:var(--primary);margin:0}
  .error{margin:0;color:var(--danger)}
  .meta{color:var(--muted)}
  .list{display:grid;gap:10px;margin-top:12px}
  .row{display:flex;justify-content:space-between;gap:10px;align-items:center;border:1px solid var(--border);border-radius:12px;padding:12px}
  .title{margin:0;color:var(--text)}
  .itemPos{color:var(--terminal);font-weight:700}
  .itemNeg{color:var(--danger);font-weight:700}
</style>
