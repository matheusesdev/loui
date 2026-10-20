<script>
 import ProcessSimulation from './ProcessSimulation.svelte';
 import {compileLabCode} from '../lab-code.js';
 let payload,output;
 try{
  if(location.hash.length>6000)throw Error('payload');
  payload=JSON.parse(decodeURIComponent(location.hash.slice(1)));
  if(![0,1,2].includes(payload.index)||!['pt','en','es'].includes(payload.language)||typeof payload.code!=='string')throw Error('payload');
  output=compileLabCode(payload.index,payload.code,payload.language);
 }catch{output={error:'Prévia indisponível. Volte ao laboratório e execute o projeto novamente.'};}
 const language=payload?.language||'pt';
 const c=({pt:{back:'Voltar à loui',title:'Sabe o que você fez?',label:'Prévia da sua experiência',note:'O editor continua na aba anterior.'},en:{back:'Back to loui',title:'Do you know what you just did?',label:'Your experience preview',note:'Your editor is still open in the previous tab.'},es:{back:'Volver a loui',title:'¿Sabes lo que acabas de hacer?',label:'Vista previa de tu experiencia',note:'El editor sigue abierto en la pestaña anterior.'}})[language];
 document.documentElement.lang=language;
</script>
<main class="standalone-preview">
 <header class="standalone-toolbar"><a href="/" class="preview-brand">loui<span>.</span></a><span>{c.label}</span><a href="/#laboratorio">{c.back} ↗</a></header>
 {#if output.error}<section class="preview-error"><h1>{output.error}</h1><a href="/#laboratorio">{c.back}</a></section>
 {:else}<details class="preview-explanation" open><summary>{c.title}</summary><p>{output.explanation}</p><small>{c.note}</small></details>
 {#if payload.index===0}<iframe class="standalone-web" title={c.label} sandbox="" srcdoc={output.html}></iframe>{:else}<ProcessSimulation index={payload.index} code={payload.code} {language}/>{/if}{/if}
</main>
