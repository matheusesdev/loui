<script>
  import { onMount } from 'svelte';
  import { getLanguage } from '../i18n.js';
  let { index }=$props();
  let language=$state(getLanguage()),value=$state(''),done=$state(false),error=$state(false),choice=$state(0);
  const copy={
    pt:{title:['Dê vida a uma página.','Monte uma pequena automação.','Leve uma informação de um sistema a outro.','Antes de construir, entender.'],label:['Qual é o nome da sua ideia?','Que pedido acabou de chegar?','Qual contato você quer conectar?'],hint:['Digite um nome e veja sua página ganhar forma.','Escolha uma regra, escreva um pedido e execute o fluxo.','Digite um nome. Vamos levar esse contato do site até um CRM de demonstração.'],go:['Criar página','Executar fluxo','Conectar contato'],placeholder:['Ex.: Café da Praça','Ex.: Preciso de um orçamento','Ex.: Ana'],reset:'Recomeçar',empty:'Escreva algo para experimentar.',safe:'Experiência local. Nenhum dado é enviado ou armazenado.',rule:'O que deve acontecer?',rules:['Organizar pedido','Preparar resposta'],received:'Recebido',organized:'Organizado',reply:'Resposta preparada',from:'Site',to:'CRM de demonstração',status:'Contato conectado',web:'Sua ideia ganhou uma primeira forma.',cta:'Vamos conversar',consult:'Uma consultoria começa pela sua realidade: entender o desafio, organizar prioridades e definir um caminho viável.',steps:['Entender o contexto','Definir prioridades','Planejar os próximos passos'],result:'Resultado da sua experiência'},
    en:{title:['Bring a page to life.','Build a small automation.','Move information between systems.','Understand before building.'],label:['What is your idea called?','What request just arrived?','Which contact do you want to connect?'],hint:['Type a name and watch your page take shape.','Choose a rule, write a request and run the workflow.','Type a name. Move that contact from a website to a demo CRM.'],go:['Create page','Run workflow','Connect contact'],placeholder:['E.g. Corner Café','E.g. I need a quote','E.g. Anna'],reset:'Start over',empty:'Write something to try it.',safe:'Local experience. No data is sent or stored.',rule:'What should happen?',rules:['Organize request','Prepare reply'],received:'Received',organized:'Organized',reply:'Reply prepared',from:'Website',to:'Demo CRM',status:'Contact connected',web:'Your idea has taken its first shape.',cta:'Let’s talk',consult:'Consulting starts with your reality: understand the challenge, organize priorities and define a viable path.',steps:['Understand the context','Set priorities','Plan the next steps'],result:'Your experience result'},
    es:{title:['Dale vida a una página.','Crea una pequeña automatización.','Conecta información entre sistemas.','Entender antes de construir.'],label:['¿Cómo se llama tu idea?','¿Qué solicitud acaba de llegar?','¿Qué contacto quieres conectar?'],hint:['Escribe un nombre y mira cómo toma forma tu página.','Elige una regla, escribe una solicitud y ejecuta el flujo.','Escribe un nombre. Lo llevaremos del sitio a un CRM de demostración.'],go:['Crear página','Ejecutar flujo','Conectar contacto'],placeholder:['Ej.: Café de la Plaza','Ej.: Necesito un presupuesto','Ej.: Ana'],reset:'Reiniciar',empty:'Escribe algo para probar.',safe:'Experiencia local. No se envían ni guardan datos.',rule:'¿Qué debe pasar?',rules:['Organizar solicitud','Preparar respuesta'],received:'Recibido',organized:'Organizado',reply:'Respuesta preparada',from:'Sitio web',to:'CRM de demostración',status:'Contacto conectado',web:'Tu idea ha tomado su primera forma.',cta:'Hablemos',consult:'La consultoría comienza por tu realidad: entender el desafío, ordenar prioridades y definir un camino viable.',steps:['Entender el contexto','Definir prioridades','Planear los próximos pasos'],result:'Resultado de tu experiencia'}
  };
  const c=$derived(copy[language]||copy.pt);
  function run(){if(!value.trim()){error=true;return;}error=false;done=true;}
  function reset(){value='';done=false;error=false;choice=0;}
  onMount(()=>{const sync=()=>language=getLanguage();sync();document.addEventListener('languagechange',sync);return()=>document.removeEventListener('languagechange',sync);});
</script>
<section class="activity" data-state={done?'complete':'idle'}>
  <h3>{c.title[index]}</h3>
  {#if index===3}
    <p>{c.consult}</p><ol class="consult-steps">{#each c.steps as step}<li>{step}</li>{/each}</ol>
  {:else}
    <p>{c.hint[index]}</p>
    <form class="activity-form" onsubmit={event=>{event.preventDefault();run();}}>
      {#if index===1}<fieldset><legend>{c.rule}</legend><div class="activity-rules">{#each c.rules as rule,i}<button type="button" aria-pressed={choice===i} onclick={()=>{choice=i;done=false;}}>{rule}</button>{/each}</div></fieldset>{/if}
      <label for={'activity-input-'+index}>{c.label[index]}</label>
      <input id={'activity-input-'+index} name="experiment" maxlength="80" autocomplete="off" placeholder={c.placeholder[index]} bind:value oninput={()=>{done=false;error=false;}} aria-invalid={error} aria-describedby={'activity-note-'+index}/>
      <div class="activity-actions"><button class="activity-run" type="submit">{c.go[index]}</button><button class="activity-reset" type="button" onclick={reset}>{c.reset}</button></div>
      <p class="activity-error" role="status">{error?c.empty:''}</p>
    </form>
    {#if done}
      <div class="activity-result" aria-label={c.result} role="status">
        {#if index===0}<div class="made-page"><div class="made-nav"><span>{value.trim()}</span><span aria-hidden="true">● ● ●</span></div><div class="made-hero"><h4>{value.trim()}</h4><p>{c.web}</p><span class="made-cta">{c.cta}</span></div></div>
        {:else if index===1}<ol class="made-flow"><li><small>{c.received}</small><strong>{value.trim()}</strong></li><li><small>{choice===0?c.organized:c.reply}</small><strong>{choice===0?c.rules[0]:c.rules[1]}</strong>{#if choice===1}<p>{language==='pt'?'Olá! Recebemos seu pedido:':language==='es'?'¡Hola! Recibimos tu solicitud:':'Hi! We received your request:'} {value.trim()}</p>{/if}</li></ol>
        {:else}<div class="made-connection"><span>{c.from}</span><span aria-hidden="true">→</span><span>{c.to}</span></div><div class="made-contact"><strong>{value.trim()}</strong><span>{c.status}</span></div>{/if}
      </div>
    {/if}
    <p class="activity-note" id={'activity-note-'+index}>{c.safe}</p>
  {/if}
</section>
