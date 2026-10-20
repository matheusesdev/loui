<script>
 import LabIcon from './LabIcon.svelte';
 let {index,language,c,onstart}=$props();
 const t=(pt,en,es)=>language==='en'?en:language==='es'?es:pt;
 const detail=$derived([
 t('Um estúdio fotográfico. Escolha a sessão, encontre um horário e veja seu código calcular a reserva.','A photography studio. Choose a session, find a time and see your code calculate the booking.','Un estudio fotográfico. Elige una sesión, un horario y ve tu código calcular la reserva.'),
 t('Uma mensagem recebida. Uma regra que você define. Acompanhe o próximo passo da conversa.','An incoming message. A rule you define. Watch the conversation reach its next step.','Un mensaje recibido. Una regla que defines. Observa el siguiente paso de la conversación.'),
 t('Um pedido e um CRM. Mapeie os campos e acompanhe os dados até o destino.','An order and a CRM. Map the fields and follow the data to its destination.','Un pedido y un CRM. Relaciona los campos y sigue los datos hasta su destino.')][index]);
 const journey=$derived(language==='en'?['Complete the code','Run in the terminal','Explore your result']:language==='es'?['Completa el código','Ejecuta en la terminal','Explora el resultado']:['Complete o código','Execute no terminal','Explore o resultado']);
</script>
<section class="lab-invitation">
 <div class="invitation-project"><span class="project-emblem"><LabIcon name={index===0?'code':index===1?'flow':'link'} size={20}/></span><strong>{['luz / studio','atende / workflow','sincronia / crm'][index]}</strong><span>{index===0?'Vue 3':index===1?'JSON / workflow':'JSON / mapping'}</span></div>
 <div class="invitation-body"><div class="invitation-copy"><h3>{c.title[index]}</h3><p>{detail}</p><ol class="invitation-journey">{#each journey as step,i}<li><span>{i+1}</span>{step}</li>{/each}</ol><div class="invitation-actions"><button class="workbench-start" type="button" onclick={onstart}>{c.start}<LabIcon name="arrow" size={17}/></button><p class="workbench-disclaimer">{t('Do início ao fim, com orientação. Sem instalar nada.','Guided from start to finish. No installation.','Guiado de principio a fin. Sin instalar nada.')}</p></div></div>
 <div class="invitation-preview" aria-hidden="true"><div class="mini-window-bar"><i></i><i></i><i></i><span>{['luz / studio','atende','sincronia'][index]}</span></div>
 {#if index===0}<div class="mini-booking"><div class="mini-studio"><span>luz /</span><img src="/public/images/studio-set.svg" width="200" height="163" alt=""/></div><div class="mini-agenda"><b>{t('Sua próxima sessão','Your next session','Tu próxima sesión')}</b><div class="mini-dates">{#each [9,10,11,12] as day}<span class:chosen={day===10}>{day}</span>{/each}</div><div class="mini-times"><span>09:00</span><span>14:00</span></div><div class="mini-total"><span>2h</span><strong>R$ 360</strong></div><div class="mini-confirm"><LabIcon name="check" size={13}/></div></div></div>
 {:else if index===1}<div class="mini-flow"><div class="mini-message">{t('Podemos conversar?','Can we talk?','¿Podemos hablar?')}</div><div class="mini-flow-line"></div><div class="mini-rule"><LabIcon name="flow"/>{t('Aplicar sua regra','Apply your rule','Aplica tu regla')}</div><div class="mini-flow-line"></div><div class="mini-reply"><LabIcon name="check"/>{t('Próximo passo, pronto.','Next step, ready.','Siguiente paso, listo.')}</div></div>
 {:else}<div class="mini-mapping"><div class="mini-source"><small>order #1042</small><strong>Ana Costa</strong><span>nome</span></div><div class="mini-map-link"><LabIcon name="link" size={24}/><span>name</span></div><div class="mini-record"><span class="mini-avatar">A</span><strong>Ana Costa</strong><small>CRM</small><LabIcon name="check" size={14}/></div></div>{/if}</div></div>

</section>
