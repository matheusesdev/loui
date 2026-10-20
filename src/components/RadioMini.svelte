<script>
  let {model,playback,tracks,translate,onOpen,onClose,onToggle}=$props();
  const text=key=>{model.languageRevision;return translate(key);};
  let raised=$state(false);
  const visible=$derived(playback.started&&model.active!=='radio'&&model.windows.find(app=>app.id==='radio').status!=='closed');
  let panel;
  function reveal(event){
    if(!visible||panel?.contains(event.target)||!(event.target instanceof HTMLElement))return;
    const target=event.target.getBoundingClientRect(),bounds=panel.getBoundingClientRect();
    if(target.right>bounds.left&&target.left<bounds.right&&target.bottom>bounds.top&&target.top<bounds.bottom)raised=target.top>innerHeight/2;
  }
</script>
<svelte:document onfocusin={reveal}/>
<aside class="radio-floating-player audio-mini" class:is-raised={raised} hidden={!visible} bind:this={panel} aria-label="loui radio">
  <div class="radio-floating-header"><button type="button" class="radio-return" onclick={onOpen}>loui radio · {text('Abrir')}</button><button type="button" class="radio-stop" onclick={onClose}>{text('Fechar rádio')}</button></div>
  <div class="audio-mini-body"><button type="button" class="mini-toggle" onclick={onToggle} aria-label={text(playback.playing?'Pausar':'Ouvir agora')}><svg viewBox="0 0 24 24" aria-hidden="true">{#if playback.playing}<path d="M8 5v14M16 5v14"/>{:else}<path d="m8 4 13 8-13 8V4Z"/>{/if}</svg></button><div><strong>{tracks[playback.index].title}</strong><span>{tracks[playback.index].artist}</span></div></div>
</aside>
