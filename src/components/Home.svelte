<script>
  let { model, translate, onExplore, onLab } = $props();
  const text = key => { model.languageRevision; return translate(key); };
</script>

<div class="home-overline"><span>{text('Um estúdio de tecnologia independente.')}</span><span class="home-coordinate" aria-hidden="true">l /</span></div>
<h1 class="workspace-home-title" tabindex="-1">{text('Um espaço')}<br />{text('para')} <em>{text('criar.')}</em></h1>
<p class="workspace-home-copy">{text('Desenvolvimento, automação e novas possibilidades.')}</p>
<div class="home-actions">
  <button type="button" class="home-explore" onclick={onExplore}>{text('Explorar serviços')}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></button>
  <button type="button" class="home-lab" onclick={onLab}>{text('Abrir o laboratório')}</button>
</div>
<div class="home-thread" aria-hidden="true"><span></span></div>
<p class="workspace-hint">{text('Escolha um caminho. Explore no seu ritmo.')}</p>
