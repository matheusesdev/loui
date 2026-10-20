<script>
  import AppIcon from './AppIcon.svelte';
  let { model, translate, onOpen, onHome } = $props();
  const text = key => { model.languageRevision; return translate(key); };
</script>

<nav class="workspace-apps" aria-label={text('Explorar a loui')}>
  <button type="button" class="workspace-home-button" onclick={onHome}><span class="dock-icon"><AppIcon name="inicio" /></span><span class="dock-label">{text('Início')}</span></button>
  {#each model.windows as app (app.id)}
    <button type="button" class="app-launcher" class:is-running={app.status !== 'closed'} class:is-current={model.active === app.id} data-open={app.id} hidden={!app.available} aria-controls={'window-' + app.id} aria-expanded={app.status === 'open'} onclick={() => onOpen(app.id)}><span class="dock-icon"><AppIcon name={app.id} /></span><span class="dock-label">{text(app.title)}</span></button>
  {/each}
</nav>
<div class="workspace-resume" aria-label={text('Retomar janelas')} hidden={!model.windows.some(app => app.status === 'minimized')}>
  {#each model.windows.filter(app => app.status === 'minimized') as app (app.id)}
    <button type="button" onclick={() => onOpen(app.id)}>{text('Retomar')}: {text(app.title)}</button>
  {/each}
</div>
