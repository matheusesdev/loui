<script>
 import {onMount} from 'svelte';
 import VueExperience from './VueExperience.svelte';
 import ProcessSimulation from './ProcessSimulation.svelte';
 import {compileLabCode} from '../lab-code.js';
 const {payload,output}=(()=>{let payload,output;
 try{
  if(location.hash.length>6000)throw Error('payload');
  payload=JSON.parse(decodeURIComponent(location.hash.slice(1)));
  if(![0,1,2].includes(payload.index)||!['pt','en','es'].includes(payload.language)||typeof payload.code!=='string')throw Error('payload');
  output=compileLabCode(payload.index,payload.code,payload.language);
 }catch{output={error:'Prévia indisponível. Volte ao laboratório e execute o projeto novamente.'};}
 return {payload,output};})();
 const language=['pt','en','es'].includes(payload?.language)?payload.language:'pt';
 const c=({pt:{back:'Voltar à loui',title:'Sabe o que você fez?',label:'Prévia da sua experiência',note:'O editor continua na aba anterior.'},en:{back:'Back to loui',title:'Do you know what you just did?',label:'Your experience preview',note:'Your editor is still open in the previous tab.'},es:{back:'Volver a loui',title:'¿Sabes lo que acabas de hacer?',label:'Vista previa de tu experiencia',note:'El editor sigue abierto en la pestaña anterior.'}})[language];
 document.documentElement.lang=language;
 try{document.documentElement.dataset.theme=localStorage.getItem('loui-theme')==='dark'?'dark':'light';}catch{document.documentElement.dataset.theme='light';}
 let reveal=$state(),previewBody=$state();
 let revealed=$state(false);
 const revealText=language==='en'?'Let me explore what I built':language==='es'?'Quiero explorar lo que creé':'Quero explorar o que criei';
 function showResult(){revealed=true;reveal.close();previewBody?.querySelector('button')?.focus({preventScroll:true});}
 onMount(()=>{if(!output.error){if(payload.mobile)revealed=true;else reveal.showModal();}});
</script>
<main class="standalone-preview">
 <header class="standalone-toolbar"><a href="/" class="preview-brand">loui<span>.</span></a><span>{payload?.mobile?(language==='en'?'Local demonstration':language==='es'?'Demostración local':'Demonstração local'):c.label}</span><a href={payload?.mobile?'/#projetos':'/#laboratorio'}>{c.back} ↗</a></header>
 {#if output.error}<section class="preview-error"><h1>{output.error}</h1><a href="/#laboratorio">{c.back}</a></section>
 {:else}<div class="preview-result-body" bind:this={previewBody}>
 {#if payload.index===0}<VueExperience config={output.config} {language}/>{:else}<ProcessSimulation index={payload.index} code={payload.code} {language} active={revealed}/>{/if}</div>
 <dialog aria-labelledby="reveal-title" aria-describedby="reveal-explanation" class="preview-reveal" bind:this={reveal} oncancel={event=>{event.preventDefault();showResult();}}><span class="reveal-kicker">loui lab / {payload.index===0?'Vue 3':payload.index===1?'automation':'integration'}</span><span class="reveal-symbol" aria-hidden="true">✓</span><h2 id="reveal-title">{c.title}</h2><p id="reveal-explanation">{output.explanation}</p><small>{c.note}</small><button class="reveal-continue" type="button" onclick={showResult}>{revealText}<span aria-hidden="true">↗</span></button></dialog>{/if}
</main>
