<script lang="ts">
  import PageCard from '$lib/components/PageCard.svelte';
</script>

<PageCard title="Dashboard" description="Your Linux learning workspace, credit status, provider mode, and recent assistant activity.">
  <div class="grid">
    <div class="mini">Credits<br><strong>25</strong></div>
    <div class="mini">Provider<br><strong>Hosted</strong></div>
    <div class="mini">Risk reviews<br><strong>0</strong></div>
  </div>
</PageCard>

<style>.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.mini{border:1px solid var(--border);border-radius:16px;padding:16px;color:var(--muted)}strong{color:var(--text);font-size:1.8rem}@media(max-width:700px){.grid{grid-template-columns:1fr}}</style>
