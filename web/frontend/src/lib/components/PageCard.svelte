<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<section class="card page-card">
  <p class="kicker">Pardus Mihmandar</p>
  <h1>{title}</h1>
  <p>{description}</p>
  <slot />
</section>

<style>
  .page-card { padding: 28px; max-width: 720px; margin: 48px auto; }
  .kicker { color: var(--primary); text-transform: uppercase; letter-spacing: .14em; font-size: .75rem; }
  h1 { margin: 0; font-size: clamp(2rem, 5vw, 3.8rem); letter-spacing: -.06em; }
  p { color: var(--muted); line-height: 1.7; }
</style>
