<script>
  import { site } from '../content/site.js';
  import AppIcon from './AppIcon.svelte';
  let { model, translate } = $props();
  const text = key => { model.languageRevision; return translate(key); };
</script>
<section class="socials-surface">
  <p class="surface-eyebrow">{text('Outros pontos de encontro')}</p>
  <h2>{text('Além deste espaço.')}</h2>
  <a class="social-row" href={site.socials.github} target="_blank" rel="noopener noreferrer"><span class="social-monogram">git</span><span><strong>GitHub</strong><small>@matheusesdev</small></span><AppIcon name="redes" /><span class="sr-only">{text('Abre em nova aba')}</span></a>
  {#if site.socials.linkedin}
    <a class="social-row" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer"><span class="social-monogram">in</span><strong>LinkedIn</strong><AppIcon name="redes" /><span class="sr-only">{text('Abre em nova aba')}</span></a>
  {:else}
    <div class="social-row social-pending"><span class="social-monogram">in</span><span><strong>LinkedIn</strong><small>{text('Link em breve')}</small></span></div>
  {/if}
</section>
