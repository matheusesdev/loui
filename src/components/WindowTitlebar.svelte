<script>
  import { onMount } from 'svelte';
  import { getLanguage } from '../i18n.js';
  let { id, title, onMinimize, onMaximize, onClose } = $props();
  let language = $state(getLanguage());
  const labels = $derived(({pt:['Fechar','Minimizar','Restaurar tamanho'],en:['Close','Minimize','Restore size'],es:['Cerrar','Minimizar','Restaurar tamaño']})[language]);
  onMount(() => {
    const update = () => language = getLanguage();
    document.addEventListener('languagechange', update);
    return () => document.removeEventListener('languagechange', update);
  });
</script>

<h2 id={'window-title-' + id} class="window-title">{title}</h2>
<div class="window-controls">
  <button type="button" class="window-close" aria-label="Fechar" onclick={onClose}><span class="window-control-label">{labels[0]}</span></button>
  <button type="button" class="window-minimize" aria-label="Minimizar" onclick={onMinimize}><span class="window-control-label">{labels[1]}</span></button>
  <button type="button" class="window-maximize" aria-label="Ampliar" onclick={onMaximize}><span class="window-control-label">{labels[2]}</span></button>
</div>
