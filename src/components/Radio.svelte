<script>
  import { onMount, onDestroy } from 'svelte';
  import { site } from '../content/site.js';
  let { model, translate, onOpen, onClose } = $props();
  const text = key => { model.languageRevision; return translate(key); };
  const tracks = site.radio.tracks;
  const playback = $state({ index:0, playing:false, started:false, volume:35, status:'idle', elapsed:0, duration:0 });
  let audio, disposed=false, revision=0;
  let expanded=$state(false);
  let expandButton, details, muted=$state(false), timeout;
  const busy=$derived(playback.status==='loading');
  const compactStatus=$derived(text(playback.status==='error'?'Falha ao tocar. Tente novamente.':busy?'Carregando…':playback.playing?'Tocando':'Pausado'));
  const track=$derived(tracks[playback.index]);
  const time=value=>Number.isFinite(value)?`${Math.floor(value/60)}:${String(Math.floor(value%60)).padStart(2,'0')}`:'0:00';
  async function play() {
    if(!audio)return;
    const current=++revision;playback.status='loading';playback.started=true;
    clearTimeout(timeout);timeout=setTimeout(()=>{if(current===revision){revision++;audio.pause();playback.status='error';}},12000);
    if(!audio.src)audio.src=tracks[playback.index].file;
    try{await audio.play();if(!disposed&&current===revision){clearTimeout(timeout);playback.status='ready';}}
    catch{if(!disposed&&current===revision){clearTimeout(timeout);playback.status='error';playback.playing=false;}}
  }
  function toggle(){if(playback.playing||busy){revision++;clearTimeout(timeout);audio.pause();playback.playing=false;playback.status='idle';}else play();}
  function collapse(){if(details?.contains(document.activeElement))expandButton?.focus();expanded=false;}
  function keydown(event){if(event.key==='Escape'&&expanded){event.preventDefault();event.stopPropagation();collapse();}}
  function mute(){muted=!muted;audio.muted=muted;}
  function select(index){revision++;audio.pause();playback.index=(index+tracks.length)%tracks.length;playback.elapsed=0;playback.duration=0;audio.src=tracks[playback.index].file;play();}
  function volume(event){playback.volume=Number(event.currentTarget.value);audio.volume=playback.volume/100;}
  onMount(()=>{
    audio=new Audio();audio.className='radio-audio';audio.hidden=true;audio.preload='none';audio.volume=playback.volume/100;document.body.append(audio);
    audio.onplaying=()=>{clearTimeout(timeout);playback.playing=true;playback.status='ready';};
    audio.onpause=()=>{playback.playing=false;};
    audio.onwaiting=()=>{playback.status='loading';};
    audio.onloadedmetadata=()=>{playback.duration=audio.duration;};
    audio.ontimeupdate=()=>{playback.elapsed=audio.currentTime;};
    audio.onended=()=>select(playback.index+1);
    audio.onerror=()=>{playback.status='error';playback.playing=false;};

  });
  onDestroy(()=>{disposed=true;revision++;clearTimeout(timeout);if(audio){audio.onended=null;audio.pause();audio.removeAttribute('src');audio.load();audio.remove();}});
</script>
<svelte:document onkeydown={keydown}/>
<section class="radio-surface" class:is-expanded={expanded}>
  <div class="ambient-radio-bar"><button type="button" class="ambient-toggle" onclick={toggle} aria-label={text(busy?'Cancelar carregamento':playback.playing?'Pausar':'Ouvir agora')}><svg viewBox="0 0 24 24" aria-hidden="true">{#if playback.playing}<path d="M8 5v14M16 5v14"/>{:else}<path d="m8 4 13 8-13 8V4Z"/>{/if}</svg></button><button type="button" class="radio-expand" bind:this={expandButton} aria-expanded={expanded} aria-controls="radio-details" onclick={()=>expanded?collapse():expanded=true}><strong>loui radio <svg class="radio-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 14 5-5 5 5"/></svg></strong><span>{playback.started?track.title:text('Lofi para suas ideias')}</span></button><label class="sr-only" for="ambient-volume">{text('Volume')}</label><button type="button" class="radio-mute" aria-label={text(muted?'Ativar som':'Silenciar')} aria-pressed={muted} onclick={mute}><svg class="volume-symbol" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3V9Zm13 0a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12"/></svg></button><input id="ambient-volume" type="range" min="0" max="100" value={playback.volume} oninput={volume} /></div>
  <p class="radio-compact-status" role="status">{compactStatus}</p>
  <div id="radio-details" bind:this={details} hidden={!expanded}>
  <p class="surface-eyebrow">{text('Uma pausa no ritmo.')}</p>
  <h2>loui <em>radio.</em></h2>
  <p>{text('Lofi para acompanhar suas ideias.')}</p>
  <div class="radio-art" class:is-playing={playback.playing} aria-hidden="true"><div class="record"><span></span></div><span class="record-label">loui</span></div>
  <div class="now-playing"><strong>{track.title}</strong><span>{track.artist}</span></div>
  <div class="radio-transport">
    <button type="button" class="radio-skip" aria-label={text('Faixa anterior')} onclick={()=>select(playback.index-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5v14m14-1-10-6 10-6v12Z"/></svg></button>
    <button type="button" class="surface-primary radio-play" onclick={toggle} aria-label={text(playback.playing?'Pausar':'Ouvir agora')}><svg viewBox="0 0 24 24" aria-hidden="true">{#if playback.playing}<path d="M8 5v14M16 5v14"/>{:else}<path d="m8 4 13 8-13 8V4Z"/>{/if}</svg>{text(playback.playing?'Pausar':'Ouvir agora')}</button>
    <button type="button" class="radio-skip" aria-label={text('Próxima faixa')} onclick={()=>select(playback.index+1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5v14M5 18l10-6-10-6v12Z"/></svg></button>
  </div>
  <div class="radio-progress"><span>{time(playback.elapsed)}</span><progress value={playback.elapsed} max={playback.duration||1} aria-label={text('Progresso da faixa')}></progress><span>{time(playback.duration)}</span></div>
  <div class="radio-volume"><label for="radio-volume">{text('Volume')}</label><input id="radio-volume" type="range" min="0" max="100" value={playback.volume} oninput={volume} /><span>{playback.volume}%</span></div>
  <p class="radio-status" role="status">{text(playback.status==='error'?'Não foi possível tocar. Tente novamente.':playback.status==='loading'?'Preparando a música…':playback.playing?'Tocando agora.':'O som começa quando você escolher.')}</p>
  <ol class="radio-playlist">{#each tracks as item,index}<li><button type="button" class:track-selected={index===playback.index} aria-pressed={index===playback.index} onclick={()=>select(index)}><span>{String(index+1).padStart(2,'0')}</span><span><strong>{item.title}</strong><small>{item.artist}</small></span></button></li>{/each}</ol>
  <p class="radio-note">{text('Seleção lofi em repetição. Continua tocando enquanto você explora.')}</p>
  <details class="radio-credits"><summary>{text('Créditos das músicas')}</summary>{#each tracks as item}<p><a href={item.source} target="_blank" rel="noopener noreferrer">{item.title} — {item.artist}</a> · <a href={item.licenseUrl} target="_blank" rel="noopener noreferrer">{item.license}</a></p>{/each}<p>{text('Faixas sem edição musical. Créditos e licenças preservados.')}</p></details>
</div></section>
