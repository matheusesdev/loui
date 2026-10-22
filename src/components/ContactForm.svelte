<script>
  import { site } from '../content/site.js';
  let {model,translate}=$props();
  const text=key=>{model.languageRevision;return translate(key);};
  let name=$state(''),message=$state('');
  const context=$derived(model.contactService?`${text('Quero conversar sobre:')} ${text(model.contactService)}`:'');
  const link=$derived(`https://wa.me/${site.contacts.whatsapp}?text=${encodeURIComponent([name.trim(),context,message.trim()].filter(Boolean).join('\n\n'))}`);
</script>
<form class="contact-compose" aria-describedby={context?'contact-service-topic':undefined} onsubmit={event=>event.preventDefault()}>
  <h3>{text('Conte sua ideia.')}</h3>
  {#if context}<div class="contact-service-context"><p id="contact-service-topic">{context}</p><button type="button" onclick={()=>model.contactService=''}>{text('Remover assunto')}</button></div>{/if}
  <label for="contact-name">{text('Seu nome')}</label><input id="contact-name" name="name" autocomplete="name" maxlength="100" bind:value={name} />
  <label for="contact-message">{text('Sua ideia')}</label><textarea id="contact-message" name="message" rows="3" maxlength="2000" bind:value={message}></textarea>
  <a class="compose-send" href={link} target="_blank" rel="noopener noreferrer" aria-disabled={!name.trim()||!message.trim()} onclick={event=>{if(!name.trim()||!message.trim())event.preventDefault();}}>{text('Continuar no WhatsApp')}<img src="/public/logos/whatsapp.svg" alt="" width="20" height="20" /></a>
  <p>{text('Você revisa a mensagem no WhatsApp antes de enviar.')}</p>
</form>
