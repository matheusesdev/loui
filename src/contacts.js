import { site } from './content/site.js';
import { t } from './i18n.js';

export function renderContacts() {
  const channels = document.querySelector('#contact-channels');
  channels.replaceChildren();
  const whatsapp = document.createElement('a');
  whatsapp.className = 'contact-channel whatsapp-channel';
  whatsapp.href = `https://wa.me/${site.contacts.whatsapp}`;
  whatsapp.target = '_blank'; whatsapp.rel = 'noopener noreferrer';
  const title = document.createElement('strong'); title.textContent = t('Conversar pelo WhatsApp');
  const number = document.createElement('span'); number.textContent = '+55 (77) 99163-9190';
  const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrow.setAttribute('viewBox', '0 0 24 24'); arrow.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');path.setAttribute('d','M5 19 19 5M5 5h14v14');arrow.append(path);
  const logo=document.createElement('img');logo.src='/public/logos/whatsapp.svg';logo.alt='';logo.width=32;logo.height=32;whatsapp.append(logo,title,number,arrow);
  const email = document.createElement('div'); email.className = 'email-channel';
  const link = document.createElement('a');link.href=`mailto:${site.contacts.email}`;link.textContent=site.contacts.email;
  const copy = document.createElement('button');copy.type='button';copy.className='copy-email';copy.textContent=t('Copiar e-mail');
  const status = document.createElement('p');status.className='copy-status';status.setAttribute('role','status');
  copy.addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText(site.contacts.email);status.textContent=t('E-mail copiado.');}
    catch {status.textContent=t('Não foi possível copiar. Selecione o e-mail acima.');}
  });
  const mailIcon=document.createElementNS('http://www.w3.org/2000/svg','svg');mailIcon.setAttribute('viewBox','0 0 24 24');mailIcon.setAttribute('aria-hidden','true');mailIcon.innerHTML='<path d="M3 5h18v14H3V5Zm0 1 9 7 9-7"/>';email.append(mailIcon,link,copy,status);channels.append(whatsapp,email);
  document.querySelector('#contact-status').textContent=t('Vamos conversar sobre sua ideia.');
}
