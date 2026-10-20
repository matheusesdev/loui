import {t} from './i18n.js';
export function initNavigation(){
 const header=document.querySelector('.header'),nav=header.querySelector('nav');
 nav.id='primary-navigation';
 const toggle=document.createElement('button');toggle.type='button';toggle.className='menu-toggle';toggle.setAttribute('aria-controls',nav.id);toggle.setAttribute('aria-expanded','false');toggle.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>';
 header.querySelector('.header-actions').append(toggle);
 const close=(focus=false)=>{header.classList.remove('mobile-open');toggle.setAttribute('aria-expanded','false');if(focus)toggle.focus();};
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));header.classList.toggle('mobile-open',open);});
 header.addEventListener('keydown',event=>{if(event.key==='Escape'&&header.classList.contains('mobile-open')){close(true);event.stopPropagation();}});
 nav.addEventListener('click',event=>{if(event.target.closest('a'))close();});
 document.addEventListener('pointerdown',event=>{if(!header.contains(event.target))close();});
 header.addEventListener('focusout',event=>{if(!header.contains(event.relatedTarget))close();});
 const sync=()=>toggle.setAttribute('aria-label',t('Menu'));document.addEventListener('languagechange',sync);sync();
 matchMedia('(min-width: 1101px)').addEventListener('change',event=>{if(event.matches)close();});
 if('IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){if(!entry.isIntersecting)continue;nav.querySelectorAll('a').forEach(link=>{const active=link.hash===`#${entry.target.id}`;link.classList.toggle('is-current',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
  },{rootMargin:'-15% 0px -55% 0px',threshold:0});
  document.querySelectorAll('main>section').forEach(section=>observer.observe(section));
 }
}
