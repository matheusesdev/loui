<script>
  import { site } from '../content/site.js';
  let { model, translate }=$props();
  const text=key=>{model.languageRevision;return translate(key);};
</script>
<nav class="social-footer" aria-label={text('Redes')}>
  <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub — matheusesdev"><img src="/public/logos/github.svg" alt="" width="20" height="20" /></a>
  {#if site.socials.linkedin}<a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><img src="/public/logos/linkedin.svg" alt="" width="20" height="20" /></a>{:else}<span class="social-link-pending" title={text('LinkedIn: link em breve')}><img src="/public/logos/linkedin.svg" alt={text('LinkedIn: link em breve')} width="20" height="20" /></span>{/if}
</nav>
