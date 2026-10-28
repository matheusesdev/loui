<script>
  let { model, translate, onExplore, onLab } = $props();
  const text = key => { model.languageRevision; return translate(key); };
</script>

<h1 class="workspace-home-title" tabindex="-1">{text('Sites, sistemas e automações.')}</h1>
<p class="workspace-home-copy">{text('Desenvolvemos sites e sistemas, conectamos ferramentas e automatizamos processos.')}</p>
<div class="home-actions"><button type="button" class="home-explore" onclick={onExplore}>{text('Explorar serviços')}</button><button type="button" class="home-lab" onclick={onLab}>{text('Ver as demonstrações')}</button></div>
