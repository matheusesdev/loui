import {getLanguage} from './i18n.js';

const copy={
 pt:{name:'Animações',on:'Animações ativadas. Pausar animações.',off:'Animações pausadas. Ativar animações.',system:'Animações pausadas pela preferência do sistema.'},
 en:{name:'Animations',on:'Animations on. Pause animations.',off:'Animations paused. Enable animations.',system:'Animations paused by your system preference.'},
 es:{name:'Animaciones',on:'Animaciones activadas. Pausar animaciones.',off:'Animaciones pausadas. Activar animaciones.',system:'Animaciones pausadas por la preferencia del sistema.'}
};

const motionStatus=new WeakMap();

export function createMotionControl(){
 const control=document.createElement('button');control.type='button';control.className='desktop-motion-toggle';control.setAttribute('role','switch');
 const system=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=false;try{paused=localStorage.getItem('loui-reduce-motion')==='on';}catch{}
 const status=document.createElement('span');status.className='sr-only';status.setAttribute('role','status');motionStatus.set(control,status);
 function sync(announce=false){
  const c=copy[getLanguage()],reduced=system.matches||paused;
  document.documentElement.dataset.reduceMotion=String(reduced);
  control.setAttribute('aria-label',c.name);control.setAttribute('aria-checked',String(!reduced));control.setAttribute('aria-disabled',String(system.matches));
  control.title=system.matches?c.system:reduced?c.off:c.on;
  control.innerHTML=`<svg viewBox="0 0 32 24" aria-hidden="true"><rect class="motion-track" x="1" y="3" width="30" height="18" rx="9"/><circle class="motion-thumb" cx="${reduced?10:22}" cy="12" r="6"/>${reduced?'<path class="motion-symbol" d="M8.5 9.5v5m3-5v5"/>':'<path class="motion-symbol motion-play" d="m20.5 9 4 3-4 3Z"/>'}</svg>`;
  if(announce)status.textContent=control.title;
  document.dispatchEvent(new Event('motionpreferencechange'));
 }
 control.addEventListener('click',()=>{if(!system.matches){paused=!paused;try{localStorage.setItem('loui-reduce-motion',paused?'on':'off');}catch{}}sync(true);});
 system.addEventListener('change',()=>sync(true));
 document.addEventListener('languagechange',()=>sync());
 window.addEventListener('storage',event=>{if(event.key==='loui-reduce-motion'){paused=event.newValue==='on';sync();}});
 sync();return control;
}

let nextHint=0;
export function withControlHint(control){
 const wrap=document.createElement('div');wrap.className='header-control';
 const hint=document.createElement('span');hint.className='header-control-hint';hint.id=`header-hint-${++nextHint}`;hint.setAttribute('role','tooltip');
 control.setAttribute('aria-describedby',[control.getAttribute('aria-describedby'),hint.id].filter(Boolean).join(' '));
 const update=()=>{hint.textContent=control.classList.contains('desktop-motion-toggle')?control.title:control.getAttribute('aria-label')||control.title;};
 update();new MutationObserver(update).observe(control,{attributes:true,attributeFilter:['aria-label','title']});
 wrap.append(control,hint);if(motionStatus.has(control))wrap.append(motionStatus.get(control));
 wrap.addEventListener('keydown',event=>{if(event.key==='Escape')wrap.classList.add('hint-dismissed');});
 wrap.addEventListener('pointerenter',()=>wrap.classList.remove('hint-dismissed'));
 wrap.addEventListener('focusin',()=>wrap.classList.remove('hint-dismissed'));
 return wrap;
}
