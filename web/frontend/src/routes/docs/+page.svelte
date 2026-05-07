<script lang="ts">
  import PageCard from '$lib/components/PageCard.svelte';
</script>

<PageCard title="Help docs" description="Everything beginners need to understand hosted credits, local mode, and command safety.">
  <div class="docs-grid">
    <article class="doc-item">
      <h2>Hosted mode</h2>
      <p>Sign in with your web account, consume daily credits, and track usage history from one dashboard.</p>
    </article>
    <article class="doc-item">
      <h2>Local mode</h2>
      <p>Connect Ollama or LM Studio directly in desktop settings. Local requests never consume hosted credits.</p>
    </article>
    <article class="doc-item">
      <h2>Safe command flow</h2>
      <p>Risky commands are reviewed with explanations and alternatives, then require explicit manual approval.</p>
    </article>
  </div>
</PageCard>

<style>
  .docs-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
  .doc-item{border:1px solid var(--border);border-radius:12px;padding:14px;background:rgba(255,255,255,.02)}
  .doc-item h2{margin:0 0 8px;font-size:1rem}
  .doc-item p{margin:0;color:var(--muted);line-height:1.6}
  @media(max-width:900px){.docs-grid{grid-template-columns:1fr}}
</style>
