<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<section class="card page-card container">
  <header>
    <p class="kicker">Pardus Mihmandar</p>
    <h1>{title}</h1>
    <p class="desc">{description}</p>
  </header>
  <div class="content">
    <slot />
  </div>
</section>

<style>
  .page-card{padding:26px;margin:10px auto 24px;max-width:920px}
  .kicker{margin:0;color:var(--primary);text-transform:uppercase;letter-spacing:.12em;font-size:.73rem}
  h1{margin:8px 0 0;font-size:clamp(1.8rem,4vw,3rem);letter-spacing:-.04em}
  .desc{margin:8px 0 0;color:var(--muted);line-height:1.65;max-width:74ch}
  .content{margin-top:18px}
</style>
