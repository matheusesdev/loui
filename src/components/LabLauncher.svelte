<script>
 import {onMount,tick} from 'svelte';
 import LabInvitation from './LabInvitation.svelte';
 import {getLanguage} from '../i18n.js';
 import {workbenchCopy} from '../workbench-copy.js';
 import {loadWorkbench} from '../load-workbench.js';
 let {index}=$props();
 let language=$state(getLanguage()),Editor=$state(),instance=$state(),busy=$state(false),failed=$state(false);
 let revision=0,observer;
 const c=$derived({...workbenchCopy[language],start:busy?label('Carregando editor…','Loading editor…','Cargando editor…'):failed?label('Tentar novamente','Try again','Reintentar'):workbenchCopy[language].start});
 const label=(pt,en,es)=>language==='en'?en:language==='es'?es:pt;
 async function start(event){
  if(busy)return;
  const trigger=event.currentTarget,service=trigger.closest('.service'),panel=trigger.closest('.workspace-window');
  const visible=()=>trigger.isConnected&&service.open&&!panel.hidden&&!panel.inert;
  const token=++revision;busy=true;failed=false;
  observer?.disconnect();
  observer=new MutationObserver(()=>{if(!visible()){revision++;busy=false;observer.disconnect();}});
  observer.observe(service,{attributes:true,attributeFilter:['open']});
  observer.observe(panel,{attributes:true,attributeFilter:['hidden','inert']});
  try{
   Editor=(await loadWorkbench()).default;
   await tick();
   if(token===revision&&visible())instance.start(trigger);
  }catch{if(token===revision&&visible())failed=true;}
  finally{if(token===revision){busy=false;observer.disconnect();}}
 }
 onMount(()=>{const sync=()=>language=getLanguage();document.addEventListener('languagechange',sync);return()=>{revision++;observer?.disconnect();document.removeEventListener('languagechange',sync);};});
</script>
<LabInvitation {index} {language} {c} onstart={start} {busy}/>
<p class="editor-load-status" role="status">{failed?label('Não foi possível carregar. Confira a conexão e tente novamente.','Could not load. Check your connection and retry.','No se pudo cargar. Revisa tu conexión y reintenta.'):''}</p>
{#if Editor}<Editor {index} bind:this={instance}/>{/if}
