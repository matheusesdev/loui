import {getLanguage,t} from './i18n.js';

const words={
 pt:{preferences:'Preferências',windows:'Janelas',close:'Fechar',theme:'Aparência',language:'Idioma',sound:'Sons da interface',motion:'Movimento',reduce:'Reduzir animações',motionHint:'A preferência de movimento reduzido do sistema é sempre respeitada.',empty:'Nenhuma janela aberta ou minimizada.',arrange:'Organizar abertas',open:'Aberta',minimized:'Minimizada',active:'Em foco',commands:[['sobre','Conheça o estúdio'],['servicos','O que podemos construir'],['diagnostico','Organize sua ideia'],['stacks','Tecnologias que usamos'],['projetos','Experimente nossos projetos'],['contato','Vamos conversar']]},
 en:{preferences:'Preferences',windows:'Windows',close:'Close',theme:'Appearance',language:'Language',sound:'Interface sounds',motion:'Motion',reduce:'Reduce animations',motionHint:'Your system’s reduced motion preference is always respected.',empty:'No open or minimized windows.',arrange:'Arrange open windows',open:'Open',minimized:'Minimized',active:'In focus',commands:[['about','Meet the studio'],['services','What we can build'],['diagnosis','Organize your idea'],['stacks','Technologies we use'],['projects','Try our projects'],['contact','Let’s talk']]},
 es:{preferences:'Preferencias',windows:'Ventanas',close:'Cerrar',theme:'Apariencia',language:'Idioma',sound:'Sonidos de la interfaz',motion:'Movimiento',reduce:'Reducir animaciones',motionHint:'Siempre se respeta la preferencia de movimiento reducido del sistema.',empty:'No hay ventanas abiertas o minimizadas.',arrange:'Organizar abiertas',open:'Abierta',minimized:'Minimizada',active:'En foco',commands:[['sobre','Conoce el estudio'],['servicios','Lo que podemos crear'],['diagnostico','Organiza tu idea'],['stacks','Tecnologías que usamos'],['proyectos','Prueba nuestros proyectos'],['contacto','Conversemos']]}
};
const copy=()=>words[getLanguage()];
const node=(tag,className,text)=>{const el=document.createElement(tag);el.className=className;if(text)el.textContent=text;return el;};
const button=(className,action)=>{const el=node('button',className);el.type='button';el.addEventListener('click',action);return el;};
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

export function initCommandSuggestions(input,form){
 const list=node('div','command-predictions');list.id='command-predictions';list.hidden=true;list.setAttribute('role','listbox');form.after(list);
 input.setAttribute('role','combobox');input.setAttribute('aria-autocomplete','list');input.setAttribute('aria-controls',list.id);input.setAttribute('aria-expanded','false');
 let matches=[],selected=-1;
 function close(){list.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');selected=-1;}
 function paint(){[...list.children].forEach((el,index)=>{el.setAttribute('aria-selected',String(index===selected));});if(selected>=0){input.setAttribute('aria-activedescendant',list.children[selected].id);list.children[selected].scrollIntoView({block:'nearest'});}else input.removeAttribute('aria-activedescendant');}
 function choose(index,run=true){input.value=matches[index][0];close();if(run)form.requestSubmit();}
 function update(){const query=normalize(input.value.trim());matches=copy().commands.filter(([command,description])=>normalize(command+' '+description).includes(query));list.replaceChildren();selected=-1;if(!query||!matches.length||input.readOnly){close();return;}
 matches.forEach(([command,description],index)=>{const option=node('div','command-prediction');option.id=`command-option-${index}`;option.setAttribute('role','option');option.setAttribute('aria-selected','false');option.append(node('strong','',command),node('span','',description));option.addEventListener('pointerdown',event=>event.preventDefault());option.addEventListener('click',()=>choose(index));list.append(option);});list.hidden=false;list.setAttribute('aria-label',t('Comando'));input.setAttribute('aria-expanded','true');}
 input.addEventListener('input',update);input.addEventListener('focus',update);
 input.addEventListener('keydown',event=>{if(list.hidden||event.isComposing)return;if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();event.stopImmediatePropagation();selected=selected<0?(event.key==='ArrowDown'?0:matches.length-1):(selected+(event.key==='ArrowDown'?1:matches.length-1))%matches.length;paint();}else if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();close();}else if(event.key==='Enter'&&selected>=0){event.preventDefault();event.stopImmediatePropagation();choose(selected);}else if(event.key==='Tab'){if(selected>=0)choose(selected,false);close();}},true);
 input.addEventListener('blur',close);form.addEventListener('submit',close,true);document.addEventListener('languagechange',update);
}

export function initDesktopControls(){
 const tools=document.querySelector('.workspace-tools');tools.classList.add('desktop-top-controls');tools.dataset.svelteUi='';
 const rows=[];
 function row(key,control){const wrap=node('div','desktop-top-control');const title=node('span','desktop-control-caption');wrap.append(title,control);tools.append(wrap);rows.push({key,title});}
 const language=tools.querySelector('.language-picker'),theme=tools.querySelector('.theme-toggle');
 row('language',language);row('theme',theme);document.dispatchEvent(new Event('themecontrolchange'));
 const sound=document.querySelector('.terminal-sound-toggle');if(sound)row('sound',sound);
 const motion=button('desktop-motion-toggle',()=>{const reduced=motion.getAttribute('aria-checked')!=='true';try{localStorage.setItem('loui-reduce-motion',reduced?'on':'off');}catch{}syncMotion(reduced);pulse(motion);});
 motion.setAttribute('role','switch');
 motion.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path class="motion-trail" d="M3 8h6M2 12h5m-4 4h6"/><circle class="motion-orb" cx="16" cy="12" r="5"/></svg>';
 row('motion',motion);
 function syncMotion(reduced){document.documentElement.dataset.reduceMotion=String(reduced);motion.setAttribute('aria-checked',String(reduced));document.dispatchEvent(new Event('motionpreferencechange'));sync();}
 function pulse(control){control.classList.remove('control-pulse');requestAnimationFrame(()=>control.classList.add('control-pulse'));}
 for(const control of [theme,sound,motion].filter(Boolean)){control.addEventListener('animationend',()=>control.classList.remove('control-pulse'));if(control!==motion)control.addEventListener('click',()=>pulse(control));}
 function sync(){const c=copy();tools.setAttribute('aria-label',c.preferences);rows.forEach(({key,title})=>title.textContent=c[key]);motion.setAttribute('aria-label',c.reduce);motion.title=c.reduce;}
 document.addEventListener('languagechange',sync);
 let reduced=false;try{reduced=localStorage.getItem('loui-reduce-motion')==='on';}catch{}syncMotion(reduced);
}
