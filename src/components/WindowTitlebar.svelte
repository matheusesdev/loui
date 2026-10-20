<script>
  let { id, title, onMinimize, onMaximize, onClose } = $props();
</script>

<h2 id={'window-title-' + id} class="window-title">{title}</h2>
<div class="window-controls">
  <button type="button" class="window-close" aria-label="Fechar" onclick={onClose}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
  <button type="button" class="window-minimize" aria-label="Minimizar" onclick={onMinimize}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17h14" /></svg></button>
  <button type="button" class="window-maximize" aria-label="Ampliar" onclick={onMaximize}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></svg></button>
</div>
