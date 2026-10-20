<script>
  import { site } from '../content/site.js';
  let { model, translate } = $props();
  const text = key => { model.languageRevision; return translate(key); };
  const groups = [...new Set(site.stacks.map(stack => stack.group))];
</script>
<section class="stacks-surface">
  <p class="surface-eyebrow">{text('Ferramentas de trabalho')}</p>
  <h2>{text('Uma boa ideia.')}<br />{text('As ferramentas certas.')}</h2>
  <p class="surface-description">{text('Tecnologias que usamos para desenvolver, conectar e automatizar.')}</p>
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
