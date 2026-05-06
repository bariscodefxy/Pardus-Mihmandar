<script lang="ts">
  import PageCard from '$lib/components/PageCard.svelte';
</script>

<PageCard title="Providers" description="Choose hosted credits or connect local Ollama/LM Studio from the desktop app.">
  <div class="providers"><span>Hosted</span><span>Ollama</span><span>LM Studio</span></div>
</PageCard>

<style>.providers{display:flex;gap:10px;flex-wrap:wrap}.providers span{border:1px solid var(--border);border-radius:999px;padding:10px 14px;color:var(--muted)}</style>
