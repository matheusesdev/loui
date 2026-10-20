import {createApp,h,ref,computed,nextTick} from 'vue';
export function mountVueDemo(target,initial,language='pt') {
 const t=(pt,en,es)=>language==='en'?en:language==='es'?es:pt;
 const money=n=>new Intl.NumberFormat(language==='pt'?'pt-BR':language==='es'?'es-ES':'en-US',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(n);
 const app=createApp({setup(){
  // The guided exercise supplies these validated values. No visitor code is evaluated.
  const hours=ref(initial.hours),hourlyRate=ref(initial.hourlyRate);
  const total=computed(()=>hours.value*hourlyRate.value);
  const service=ref(0),day=ref(0),slot=ref(''),name=ref(''),confirmed=ref(false),error=ref('');
  const services=[t('Retrato','Portrait','Retrato'),t('Produto','Product','Producto'),t('Editorial','Editorial','Editorial')];
  const captions=[t('Um novo olhar sobre você.','A new way to see yourself.','Una nueva mirada sobre ti.'),t('Os detalhes merecem a luz certa.','Details deserve the right light.','Los detalles merecen la luz adecuada.'),t('Espaço para a sua próxima história.','Room for your next story.','Espacio para tu próxima historia.')];
  const dates=[9,10,11,12,13].map(n=>new Date(2026,10,n));
  const locale=language==='pt'?'pt-BR':language==='es'?'es-ES':'en-US';
  const dateLabel=i=>dates[i].toLocaleDateString(locale,{day:'numeric',month:'long'});
  const slots=computed(()=>day.value%2===0?['09:00','11:00','14:00','16:00']:['10:00','13:00','15:00','17:00']);
  const btn=(label,action,selected=false,extra={})=>h('button',{type:'button',onClick:action,'aria-pressed':selected,...extra},label);
  function reset(){confirmed.value=false;slot.value='';nextTick(()=>target.querySelector('.booking-slots button')?.focus());}
  function confirm(event){event.preventDefault();if(!slot.value){error.value=t('Escolha um horário para continuar.','Choose a time to continue.','Elige un horario para continuar.');target.querySelector('.booking-slots button')?.focus();return;}if(!name.value.trim())return;error.value='';confirmed.value=true;nextTick(()=>target.querySelector('.booking-confirmation')?.focus());}
  return()=>h('div',{class:'booking-app'},[
   h('header',{class:'booking-nav'},[h('span',{class:'studio-wordmark'},['luz',h('i','/'),h('small',t('estúdio fotográfico','photography studio','estudio fotográfico'))]),h('span',{class:'demo-badge'},t('Projeto demonstrativo','Demo project','Proyecto de demostración'))]),
   h('div',{class:'booking-layout'},[
    h('section',{class:`studio-story studio-scene-${service.value}`},[
     h('div',{class:'studio-heading'},[h('p',t('Seu tempo. Sua perspectiva.','Your time. Your perspective.','Tu tiempo. Tu perspectiva.')),h('h1',t('Boas histórias\ncomeçam com luz.','Good stories\nstart with light.','Las buenas historias\nempiezan con luz.'))]),
     h('div',{class:'studio-visual'},[h('img',{src:'/public/images/studio-set.svg',alt:t('Estúdio ilustrado com fundo fotográfico, banco e iluminação','Illustrated studio with backdrop, stool and lighting','Estudio ilustrado con fondo, taburete e iluminación'),width:700,height:570}),h('span',{class:'studio-caption'},`${services[service.value]} / ${captions[service.value]}`)]),
     h('div',{class:'studio-details'},[h('div',[h('strong',t('Um espaço para criar.','A space to create.','Un espacio para crear.')),h('p',t('Luz natural, fundo infinito e tempo para experimentar. Escolha a sessão e encontre seu horário.','Natural light, a seamless backdrop and time to experiment. Choose your session and find your time.','Luz natural, fondo infinito y tiempo para experimentar. Elige tu sesión y encuentra tu horario.'))]),h('span','luz / studio')])
    ]),
    h('section',{class:'booking-desk','aria-label':t('Reserva de sessão','Session booking','Reserva de sesión')},confirmed.value?[
     h('div',{class:'booking-confirmation',tabindex:-1},[h('span',{class:'confirmation-seal','aria-hidden':'true'},h('svg',{viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':1.5},[h('path',{d:'m5 12 4 4L19 6'})])),h('p',t('Tudo pronto para o próximo passo.','Ready for the next step.','Todo listo para el próximo paso.')),h('h2',t('Sua ideia\ntem hora marcada.','Your idea\nhas a time slot.','Tu idea\nya tiene hora.')),h('p',`${name.value}, ${t('este é o resumo da sua sessão de exemplo.','here is your sample session summary.','este es el resumen de tu sesión de ejemplo.')}`),h('dl',{class:'booking-receipt'},[
      ...[[t('Sessão','Session','Sesión'),services[service.value]],[t('Quando','When','Cuándo'),`${dateLabel(day.value)} · ${slot.value}`],[t('Duração','Duration','Duración'),`${hours.value}h`],[t('Total','Total','Total'),money(total.value)]].map(([label,value])=>h('div',[h('dt',label),h('dd',value)]))]),h('p',{class:'booking-local-note'},t('Reserva simulada. Nenhum horário foi bloqueado e nenhum pagamento foi realizado.','Simulated booking. No time was reserved and no payment was made.','Reserva simulada. No se reservó ningún horario ni se realizó un pago.')),btn(t('Experimentar outra reserva','Try another booking','Probar otra reserva'),reset,false,{class:'booking-submit'})])
    ]:[
     h('div',{class:'booking-section-title'},[h('span',t('Reserve seu momento','Book your moment','Reserva tu momento')),h('h2',t('Vamos criar?','Shall we create?','¿Creamos algo?')),h('p',t('Uma sessão que começa do seu jeito.','A session that starts your way.','Una sesión que empieza a tu manera.'))]),
     h('form',{class:'booking-form',onSubmit:confirm},[
      h('fieldset',[h('legend',t('Escolha a sessão','Choose your session','Elige la sesión')),h('div',{class:'booking-services'},services.map((label,i)=>btn(label,()=>service.value=i,service.value===i)))]),
      h('fieldset',[h('legend',t('Escolha um dia','Choose a day','Elige un día')),h('span',{class:'booking-month'},t('Novembro 2026 · agenda de exemplo','November 2026 · sample availability','Noviembre 2026 · agenda de ejemplo')),h('div',{class:'booking-days'},dates.map((date,i)=>btn([h('small',date.toLocaleDateString(locale,{weekday:'short'})),h('strong',date.getDate())],()=>{day.value=i;slot.value='';},day.value===i,{'aria-label':dateLabel(i)})))]),
      h('fieldset',[h('legend',t('Qual horário funciona para você?','What time works for you?','¿Qué horario te viene bien?')),h('div',{class:'booking-slots'},slots.value.map(time=>btn(time,()=>{slot.value=time;error.value='';},slot.value===time)))]),
      h('div',{class:'booking-duration'},[h('label',{for:'booking-hours'},[t('Tempo de estúdio','Studio time','Tiempo de estudio'),h('strong',`${hours.value}h`)]),h('input',{id:'booking-hours',name:'session-hours',type:'range',min:1,max:8,value:hours.value,onInput:event=>hours.value=Number(event.target.value)}),h('small',t('Experimente: o seu computed() recalcula o valor.','Try it: your computed() recalculates the price.','Pruébalo: tu computed() recalcula el precio.'))]),
      h('div',{class:'booking-name'},[h('label',{for:'booking-name'},t('Como podemos chamar você?','What should we call you?','¿Cómo te llamamos?')),h('input',{id:'booking-name',name:'sample-name',required:true,maxLength:60,value:name.value,autocomplete:'off',placeholder:t('Use um nome de exemplo','Use a sample name','Usa un nombre de ejemplo'),onInput:event=>name.value=event.target.value})]),
      h('div',{class:'booking-total','aria-live':'polite'},[h('div',[h('small',`${hours.value}h × ${money(hourlyRate.value)}`),h('span',t('Total da sessão','Session total','Total de la sesión'))]),h('strong',money(total.value))]),
      h('button',{type:'submit',class:'booking-submit'},t('Confirmar sessão de exemplo','Confirm sample session','Confirmar sesión de ejemplo')),
      h('p',{class:'booking-error',role:'status'},error.value),
      h('p',{class:'booking-local-note'},t('Demonstração local. Sem cadastro, cobrança ou reserva real.','Local demo. No registration, charges or real booking.','Demo local. Sin registro, cobros ni reserva real.'))
     ])
    ])
   ])
  ]);
 }});
 app.mount(target);return()=>app.unmount();
}
