import { messages } from './locales.js';
let language = 'pt';
let revision = 0;
const languages = ['pt','en','es'];
const languageTags = {pt:'pt-BR',en:'en',es:'es'};
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const textBindings = [];
const attributeBindings = [];
export const t = key => messages[key]?.[language] || key;
export const getLanguage = () => language;

function bindText(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes=[];
  while (walker.nextNode()) {
    const node=walker.currentNode;
    if (!node.parentElement.closest('[data-svelte-ui],script,style,.language-picker,.theme-toggle,.intro-logo,.wordmark,.footer-logo,.about-mark,.demo-visual,.demo-controls,.demo-status,#contact-status,#contact-channels,#project-list')) nodes.push(node);
  }
  for (const node of nodes) {
    const key=node.textContent.trim();
    if (!messages[key]) continue;
    const span=document.createElement('span'); span.className='localized';
    const leading=node.textContent.match(/^\s*/)[0], trailing=node.textContent.match(/\s*$/)[0];
    node.replaceWith(span);
    textBindings.push({span,key,leading,trailing});
  }
  root.querySelectorAll('[aria-label],[placeholder]').forEach(element=>{
    if (element.closest('.language-picker,.theme-toggle')) return;
    for (const attr of ['aria-label','placeholder']) {
      const key=element.getAttribute(attr);
      if (messages[key]) attributeBindings.push({element,attr,key});
    }
  });
}
function apply(next, announce=false) {
  language=next;
  document.documentElement.lang=languageTags[next];
  for (const {span,key,leading,trailing} of textBindings) span.textContent=leading+t(key)+trailing;
  for (const {element,attr,key} of attributeBindings) element.setAttribute(attr,t(key));
  document.title=t('loui — Desenvolvimento e automação');
  document.querySelector('meta[name="description"]').content=t('loui: desenvolvimento web, automações, agentes de IA, integrações e consultoria em tecnologia.');
  document.querySelectorAll('.language-picker').forEach(picker=>{
    picker.querySelector('.language-code').textContent=next.toUpperCase();
    picker.querySelector('.language-trigger').setAttribute('aria-label',`${t('Idioma')}: ${{pt:'Português',en:'English',es:'Español'}[next]}`);
    picker.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===next)));
  });
  if (announce) document.querySelectorAll('.language-status').forEach(status=>status.textContent=t('Idioma alterado para português.'));
  document.dispatchEvent(new CustomEvent('languagechange',{detail:{language:next}}));
}
export function setLanguage(next, animate=true) {
  if (!languages.includes(next)) return;
  const current=++revision;
  try {localStorage.setItem('loui-language',next);} catch {/* Language remains usable without persistence. */}
  if (!animate || reduced.matches) {document.documentElement.classList.remove('language-changing');apply(next,true);return;}
  document.documentElement.classList.add('language-changing');
  setTimeout(()=>{
    if(current!==revision)return;
    // Preserve scroll offset; text changes may alter wrapping but must not jump to the top.
    const position=scrollY;
    apply(next,true);
    scrollTo({top:position,behavior:'instant'});
    setTimeout(()=>{if(current===revision)document.documentElement.classList.remove('language-changing');},220);
  },520);
}
export function initI18n() {
  try {const saved=localStorage.getItem('loui-language'); if(languages.includes(saved))language=saved;}catch{}
  // Portuguese is the authored default; only a deliberate selection overrides it.
  document.querySelectorAll('.theme-toggle').forEach(theme=>{
    const wrap=document.createElement('div');wrap.className='language-picker';
    const trigger=document.createElement('button');trigger.type='button';trigger.className='language-trigger';trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML='<svg class="language-globe" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="3.5" ry="8"/><path d="M4 12h16"/></svg><span class="language-code localized">PT</span><svg class="language-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>';
    const options=document.createElement('div');options.className='language-options';options.hidden=true;options.id=`languages-${theme.closest('.intro-top')?'intro':'header'}`;trigger.setAttribute('aria-controls',options.id);
    const close=(focus=false)=>{options.hidden=true;trigger.setAttribute('aria-expanded','false');if(focus)trigger.focus();};
    const open=()=>{document.querySelectorAll('.language-options').forEach(panel=>{if(panel!==options){panel.hidden=true;panel.previousElementSibling?.setAttribute('aria-expanded','false');}});options.hidden=false;trigger.setAttribute('aria-expanded','true');};
    for(const [value,name] of [['pt','Português'],['en','English'],['es','Español']]){
      const button=document.createElement('button');button.type='button';button.dataset.language=value;button.lang=languageTags[value];button.innerHTML=`<span>${name}</span><span class="language-abbr">${value.toUpperCase()}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>`;
      button.addEventListener('click',()=>{close(true);if(value!==language)setLanguage(value);});options.append(button);
    }
    trigger.addEventListener('click',()=>options.hidden?open():close());
    trigger.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();open();options.querySelector(`[data-language="${language}"]`).focus();}});
    wrap.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!options.hidden){event.preventDefault();event.stopPropagation();close(true);}
      if(options.contains(document.activeElement)&&['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
        event.preventDefault();const buttons=[...options.children];const index=buttons.indexOf(document.activeElement);const next=event.key==='Home'?0:event.key==='End'?2:(index+(event.key==='ArrowDown'?1:2))%3;buttons[next].focus();
      }
    });
    wrap.addEventListener('focusout',event=>{if(!wrap.contains(event.relatedTarget))close();});
    document.addEventListener('pointerdown',event=>{if(!wrap.contains(event.target))close();});
    wrap.append(trigger,options);
    if(theme.closest('.intro-top')){const controls=document.createElement('div');controls.className='intro-controls';theme.before(controls);controls.append(wrap,theme);}else theme.before(wrap);
  });
  for(const parent of [document.querySelector('#intro'),document.querySelector('#site')]){const status=document.createElement('p');status.className='sr-only language-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');parent.append(status);}
  bindText(document.body);apply(language);
  reduced.addEventListener('change',()=>{if(reduced.matches)document.documentElement.classList.remove('language-changing');});
}
