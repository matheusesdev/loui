<script>
  import { site } from '../content/site.js';
  let { model, translate } = $props();
  const text = key => { model.languageRevision; return translate(key); };
  const groups = [...new Set(site.stacks.map(stack => stack.group))];
</script>
<section class="stacks-surface">
  <h2>{text('Ferramentas de trabalho')}</h2>
  <p class="surface-description">{text('Vue na agenda Luz; Svelte no site e nas simulações. Outras ferramentas são escolhidas conforme o escopo.')}</p>
  {#each groups as group}
    <section class="stack-group" aria-label={text(group)}>
      <h3>{text(group)}</h3>
      <ul class="stack-list">
        {#each site.stacks.filter(stack => stack.group === group) as stack}
          <li><span class={'stack-logo logo-' + stack.logo}><img src={'/public/logos/' + stack.logo + '.svg'} alt="" width="36" height="36" /></span><div><strong>{stack.name}</strong><span>{text(stack.detail)}</span></div></li>
        {/each}
      </ul>
    </section>
  {/each}
</section>
