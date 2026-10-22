<script>
  import { site } from '../content/site.js';
  import {mergeBriefing} from '../diagnosis.js';
  import {diagnosisCopy} from '../content/diagnosis.js';
  import {getLanguage} from '../i18n.js';
  let {model,translate}=$props();
  const text=key=>{model.languageRevision;return translate(key);};
  let name=$state(''),message=$state('');
  let attempted=$state(false),continuing=$state(false);
  let nameInput,messageInput;
  let pending=$state(null),briefFeedback=$state(''),pendingHeading=$state();
  const diagnosis=$derived.by(()=>{model.languageRevision;return diagnosisCopy[getLanguage()];});
  export function receiveBriefing(briefing,topic){
    const result=mergeBriefing(message,briefing);briefFeedback='';continuing=false;
    if(result.status==='duplicate'||result.status==='empty'){pending=null;briefFeedback=result.status;return;}
    if(message.trim()||result.status==='overflow'){pending={text:briefing,topic};if(result.status==='overflow')briefFeedback='overflow';}
    else{message=result.message;model.contactService=topic;pending=null;briefFeedback='added';}
    requestAnimationFrame(()=>{if(pending)pendingHeading?.focus();else messageInput?.focus();});
  }
  function appendBriefing(){
    const result=mergeBriefing(message,pending.text);briefFeedback=result.status;
    if(result.status==='added'){message=result.message;model.contactService=pending.topic;}
    if(result.status==='added'||result.status==='duplicate'){pending=null;messageInput?.focus();}
  }
  const nameError=$derived(attempted&&!name.trim()?text('Informe seu nome para continuar.'):'');
  const messageError=$derived(attempted&&!message.trim()?text('Conte brevemente o que você precisa criar ou melhorar.'):'');
  const feedback=$derived(attempted&&(nameError||messageError)?text('Preencha os campos indicados para continuar.'):continuing?text('Revise e envie no WhatsApp. Seu texto continua disponível aqui.'):'');
  const context=$derived(model.contactService?`${text('Quero conversar sobre:')} ${text(model.contactService)}`:'');
  const link=$derived(`https://wa.me/${site.contacts.whatsapp}?text=${encodeURIComponent([name.trim(),context,message.trim()].filter(Boolean).join('\n\n'))}`);
  function validate(){
    if(pending){pendingHeading?.focus();return false;}
    attempted=true;
    if(!name.trim()||!message.trim()){
      continuing=false;const field=!name.trim()?nameInput:messageInput;
      requestAnimationFrame(()=>{field.focus({preventScroll:true});field.scrollIntoView({block:'center',behavior:'instant'});});
      return false;
    }
    continuing=true;return true;
  }
  function submit(event){event.preventDefault();if(validate())window.open(link,'_blank','noopener,noreferrer');}
</script>
<form class="contact-compose" aria-describedby={context?'contact-service-topic':undefined} onsubmit={submit} novalidate>
  <h3>{text('Conte sua ideia.')}</h3>
  {#if context}<div class="contact-service-context"><p id="contact-service-topic">{context}</p><button type="button" onclick={()=>model.contactService=''}>{text('Remover assunto')}</button></div>{/if}
  {#if pending}<section class="diagnosis-contact-pending" aria-labelledby="diagnosis-pending-heading"><h4 id="diagnosis-pending-heading" tabindex="-1" bind:this={pendingHeading}>{diagnosis.pending}</h4><label for="contact-briefing">{diagnosis.brief}</label><textarea id="contact-briefing" name="pending-briefing" rows="3" maxlength="2000" bind:value={pending.text}></textarea><div class="diagnosis-actions"><button type="button" class="diagnosis-append" onclick={appendBriefing}>{diagnosis.append}</button><button type="button" class="diagnosis-keep" onclick={()=>{pending=null;briefFeedback='kept';messageInput?.focus();}}>{diagnosis.keep}</button></div></section>{/if}
  <p class="diagnosis-contact-feedback" role="status">{briefFeedback?diagnosis[briefFeedback]:''}</p>
  <label for="contact-name">{text('Seu nome')}</label><input id="contact-name" name="name" autocomplete="name" maxlength="100" bind:this={nameInput} bind:value={name} aria-invalid={!!nameError} aria-describedby={nameError?'contact-name-error':undefined} />
  {#if nameError}<p class="contact-field-error" id="contact-name-error">{nameError}</p>{/if}
  <label for="contact-message">{text('Sua ideia')}</label><p class="contact-field-hint" id="contact-message-help">{text('O que você quer melhorar? Como funciona hoje? Se já usa alguma ferramenta, conte qual.')}</p><textarea id="contact-message" name="message" rows="3" maxlength="2000" bind:this={messageInput} bind:value={message} aria-invalid={!!messageError} aria-describedby={messageError?'contact-message-help contact-message-error':'contact-message-help'}></textarea>
  {#if messageError}<p class="contact-field-error" id="contact-message-error">{messageError}</p>{/if}
  <a class="compose-send" href={link} target="_blank" rel="noopener noreferrer" onclick={event=>{if(!validate())event.preventDefault();}}>{text('Continuar no WhatsApp')}<img src="/public/logos/whatsapp.svg" alt="" width="20" height="20" /></a>
  <p class="contact-feedback" role="status">{feedback}</p>
  <p>{text('Você revisa a mensagem no WhatsApp antes de enviar.')}</p>
</form>
