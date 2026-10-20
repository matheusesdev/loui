<script>
 import {onMount,onDestroy} from 'svelte';
 import {site} from '../content/site.js';
 import {getLanguage} from '../i18n.js';
 import {findStations} from '../radio-browser.js';
 import {movable} from '../floating-window.js';
 import LabIcon from './LabIcon.svelte';
 let {model,translate}=$props();
 const text=key=>{model.languageRevision;return translate(key);};
 const label=(pt,en,es)=>{model.languageRevision;return getLanguage()==='en'?en:getLanguage()==='es'?es:pt;};
 const tracks=site.radio.tracks;
 let expanded=$state(false),mode=$state('local'),genre=$state('lofi'),query=$state('');
 let stations=$state([]),catalog=$state('idle'),station=$state(null);
 const playback=$state({index:0,playing:false,status:'idle',volume:35});
 let audio,surface,handle,expandButton,details,position,timeout,controller,request=0,revision=0,disposed=false;
 let muted=$state(false);
 const track=$derived(tracks[playback.index]);
 const busy=$derived(playback.status==='loading');
 const title=$derived(station?station.name:track.title);
 const subtitle=$derived(station?label('Rádio online','Online radio','Radio online')+' / '+station.country:track.artist);
 const status=$derived(playback.status==='error'?label('Não foi possível tocar. Tente outra estação ou a seleção loui.','Playback failed. Try another station or the loui selection.','No se pudo reproducir. Prueba otra emisora o la selección loui.'):busy?text('Carregando…'):playback.playing?station?label('Ao vivo','Live','En vivo'):text('Tocando'):text('Pausado'));
 function stop(){revision++;clearTimeout(timeout);if(audio)audio.pause();playback.playing=false;playback.status='idle';}
 async function play(){if(!audio)return;const token=++revision;playback.status='loading';const source=station?station.url:track.file;if(audio.getAttribute('src')!==source)audio.src=source;clearTimeout(timeout);timeout=setTimeout(()=>{if(token===revision){audio.pause();playback.status='error';playback.playing=false;}},12000);try{await audio.play();if(!disposed&&token===revision){clearTimeout(timeout);playback.status='ready';}}catch{if(!disposed&&token===revision){clearTimeout(timeout);playback.status='error';playback.playing=false;}}}
 function toggle(){if(playback.playing||busy)stop();else play();}
 function local(index,autoplay=true){stop();station=null;playback.index=(index+tracks.length)%tracks.length;audio.removeAttribute('src');if(autoplay)play();}
 function tune(item){stop();station=item;audio.removeAttribute('src');play();}
 async function search(value){const term=value.trim().slice(0,40);if(!term)return;genre=term.toLowerCase();query=term;controller?.abort();controller=new AbortController();const token=++request;catalog='loading';stations=[];try{const found=await findStations(term,{signal:controller.signal});if(token!==request||disposed)return;stations=found;catalog=found.length?'ready':'empty';}catch{if(token===request&&!disposed)catalog='error';}}
 function changeMode(next){mode=next;if(next==='online'&&catalog==='idle')search(genre);}
 function collapse(){if(details?.contains(document.activeElement))expandButton?.focus();expanded=false;}
 function keydown(event){if(event.key==='Escape'&&expanded){event.preventDefault();event.stopPropagation();collapse();}}
 onMount(()=>{audio=new Audio();audio.preload='none';audio.volume=playback.volume/100;audio.onplaying=()=>{clearTimeout(timeout);playback.playing=true;playback.status='ready';};audio.onpause=()=>playback.playing=false;audio.onwaiting=()=>{playback.status='loading';clearTimeout(timeout);const token=revision;timeout=setTimeout(()=>{if(token===revision){audio.pause();playback.playing=false;playback.status='error';}},12000);};audio.onerror=()=>{clearTimeout(timeout);playback.status='error';playback.playing=false;};audio.onended=()=>{if(station){playback.status='error';playback.playing=false;}else local(playback.index+1);};position=movable(surface.closest('.ambient-radio'),handle,{minWidth:0});return()=>position?.destroy();});
 onDestroy(()=>{disposed=true;request++;revision++;clearTimeout(timeout);controller?.abort();if(audio){audio.onplaying=audio.onpause=audio.onerror=audio.onwaiting=audio.onended=null;audio.pause();audio.removeAttribute('src');audio.load();}});
</script>
<svelte:document onkeydown={keydown}/>
<section class="radio-surface radio-deck" bind:this={surface} class:is-expanded={expanded} aria-label="loui radio">
 <header class="radio-deck-header"><button class="radio-move" type="button" bind:this={handle} aria-label={label('Mover rádio com as setas','Move radio with arrow keys','Mover radio con las flechas')} title={text('Arraste para mover. Setas movem; Home restaura.')}><span class="radio-grip" aria-hidden="true"></span><strong>loui radio</strong></button><button class="radio-reset-position" type="button" onclick={()=>position?.reset()} aria-label={text('Restaurar posição')}><LabIcon name="reset" size={14}/></button><span class="radio-source-badge">{station?'FM / WEB':'LOUI / MIX'}</span></header>
 <div class="radio-now"><button type="button" class="ambient-toggle" onclick={toggle} aria-label={text(busy?'Cancelar carregamento':playback.playing?'Pausar':'Ouvir agora')}><LabIcon name={playback.playing?'pause':'play'} size={19}/></button><button type="button" class="radio-expand" bind:this={expandButton} aria-expanded={expanded} aria-controls="radio-details" onclick={()=>expanded?collapse():expanded=true}><strong>{title}</strong><span>{subtitle}</span></button><div class="radio-meter" class:playing={playback.playing} aria-hidden="true"><i></i><i></i><i></i><i></i></div></div>
 <div class="radio-deck-bottom"><p class="radio-compact-status" role="status">{status}</p><button type="button" class="radio-mute" aria-label={text(muted?'Ativar som':'Silenciar')} aria-pressed={muted} onclick={()=>{muted=!muted;audio.muted=muted;}}><LabIcon name={muted?'mute':'sound'} size={16}/></button><label class="sr-only" for="ambient-volume">{text('Volume')}</label><input id="ambient-volume" type="range" min="0" max="100" value={playback.volume} oninput={event=>{playback.volume=Number(event.currentTarget.value);audio.volume=playback.volume/100;}}/></div>
 <div id="radio-details" bind:this={details} hidden={!expanded}>
  <div class="radio-mode" role="group" aria-label={label('Fonte de áudio','Audio source','Fuente de audio')}><button type="button" aria-pressed={mode==='local'} onclick={()=>changeMode('local')}>{label('Seleção loui','loui selection','Selección loui')}</button><button type="button" aria-pressed={mode==='online'} onclick={()=>changeMode('online')}>{label('Rádio online','Online radio','Radio online')}</button></div>
  {#if mode==='online'}
   <p class="radio-section-label">{label('Qual é o seu ritmo?','What is your mood?','¿Cuál es tu ritmo?')}</p>
   <div class="radio-genres">{#each ['lofi','jazz','ambient','classical','rock'] as tag}<button type="button" aria-pressed={genre===tag} onclick={()=>search(tag)}>{tag==='classical'?label('Clássica','Classical','Clásica'):tag==='lofi'?'Lofi':tag.charAt(0).toUpperCase()+tag.slice(1)}</button>{/each}</div>
   <form class="radio-search" onsubmit={event=>{event.preventDefault();search(query);}}><label class="sr-only" for="radio-genre">{label('Buscar gênero musical','Search music genre','Buscar género musical')}</label><input id="radio-genre" name="genre" autocomplete="off" maxlength="40" bind:value={query} placeholder={label('Outro gênero…','Another genre…','Otro género…')}/><button type="submit" aria-label={label('Buscar emissoras','Search stations','Buscar emisoras')}><LabIcon name="arrow" size={17}/></button></form>
   <div class="radio-catalog-message" role="status">{catalog==='loading'?label('Buscando emissoras…','Finding stations…','Buscando emisoras…'):catalog==='empty'?label('Nenhuma emissora encontrada. Experimente outro gênero.','No stations found. Try another genre.','No se encontraron emisoras. Prueba otro género.'):catalog==='error'?label('O catálogo está indisponível. Tente novamente ou ouça a seleção loui.','The catalog is unavailable. Retry or listen to the loui selection.','El catálogo no está disponible. Reintenta o escucha la selección loui.'):''}</div>
   {#if catalog==='error'}<button class="radio-retry" type="button" onclick={()=>search(genre)}>{label('Tentar novamente','Retry','Reintentar')}</button>{/if}
   <ul class="radio-stations">{#each stations as item}<li><button type="button" class:selected={station?.id===item.id} aria-pressed={station?.id===item.id} onclick={()=>tune(item)}><span class="station-emblem">{item.name.slice(0,1)}</span><span><strong>{item.name}</strong><small>{item.country} / MP3</small></span><LabIcon name={station?.id===item.id?'check':'play'} size={14}/></button></li>{/each}</ul>
   <p class="radio-provider"><a href="https://www.radio-browser.info/" target="_blank" rel="noopener noreferrer">Radio Browser</a> · {label('Emissoras independentes. A disponibilidade pode variar.','Independent stations. Availability may vary.','Emisoras independientes. La disponibilidad puede variar.')}</p>{#if station?.homepage}<a class="radio-station-site" href={station.homepage} target="_blank" rel="noopener noreferrer">{label('Visitar emissora','Visit station','Visitar emisora')}</a>{/if}
  {:else}
   <p class="radio-section-label">{label('Lofi para suas ideias','Lofi for your ideas','Lofi para tus ideas')}</p><ol class="radio-stations">{#each tracks as item,index}<li><button type="button" class:selected={!station&&index===playback.index} aria-pressed={!station&&index===playback.index} onclick={()=>local(index)}><span class="station-emblem">{String(index+1).padStart(2,'0')}</span><span><strong>{item.title}</strong><small>{item.artist}</small></span><LabIcon name={!station&&index===playback.index?'check':'play'} size={14}/></button></li>{/each}</ol>
   <details class="radio-credits"><summary>{text('Créditos das músicas')}</summary>{#each tracks as item}<p><a href={item.source} target="_blank" rel="noopener noreferrer">{item.title} — {item.artist}</a> / <a href={item.licenseUrl} target="_blank" rel="noopener noreferrer">{item.license}</a></p>{/each}</details>
  {/if}
 </div>
</section>
