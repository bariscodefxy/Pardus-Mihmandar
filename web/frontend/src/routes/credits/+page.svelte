<script lang="ts">
  import PageCard from '$lib/components/PageCard.svelte';
</script>

<PageCard title="Credits" description="Hosted AI requests consume credits. Local Ollama and LM Studio do not.">
  <p class="balance">25 daily credits available</p>
</PageCard>

<style>.balance{padding:18px;border:1px solid var(--border);border-radius:16px;color:var(--primary)}</style>
