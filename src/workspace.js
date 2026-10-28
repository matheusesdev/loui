import { mount, flushSync } from 'svelte';
import { movable, bringToFront } from './floating-window.js';
import { createWindowMotion } from './window-motion.js';
import { playInterfaceSound } from './interface-sounds.js';
import FloatingDock from './components/FloatingDock.svelte';
import {editorWindows,nextDockOrder} from './editor-windows.svelte.js';
import Stacks from './components/Stacks.svelte';
import SocialFooter from './components/SocialFooter.svelte';
import ContactForm from './components/ContactForm.svelte';
import GuidedDiagnosis from './components/GuidedDiagnosis.svelte';
import Radio from './components/Radio.svelte';
import WindowTitlebar from './components/WindowTitlebar.svelte';
import { createWorkspaceModel } from './workspace-state.svelte.js';
import {initCommandSuggestions} from './desktop-controls.js';
import StudioHero from './components/StudioHero.svelte';
import {t,setLanguage} from './i18n.js';

const definitions=[
 {id:'stacks',title:'Stacks',number:'07'},
 {id:'servicos',title:'Serviços',number:'01'},
 {id:'diagnostico',title:'Diagnóstico',number:'08'},
 {id:'sobre',title:'A loui',number:'03'},
 {id:'contato',title:'Contato',number:'04'},
 {id:'projetos',title:'Projetos',number:'06'},
];
const button=(text,className='')=>{const node=document.createElement('button');node.type='button';node.className=className;node.textContent=text;return node;};

export function initWorkspace(){
 const site=document.querySelector('#site');
 const original=document.querySelector('#conteudo');
 const environment=document.createElement('main');environment.id='ambiente';environment.className='workspace';
 const stage=document.createElement('div');stage.className='workspace-stage';
 const home=document.createElement('section');home.className='workspace-home';home.id='inicio-ambiente';
 home.dataset.svelteUi='';
 const ordered=definitions;
 const model=createWorkspaceModel(ordered);
 const heroHost=document.createElement('div');heroHost.className='workspace-introduction';heroHost.dataset.svelteUi='';
 home.append(heroHost);flushSync(()=>mount(StudioHero,{target:heroHost}));
 home.removeAttribute('data-svelte-ui');
 buildTerminal(home,open,goHome);
 const windows=document.createElement('div');windows.className='workspace-windows';
 stage.append(home,windows);
 const appButtons=new Map(),states=new Map();let active=null,contactComposer;
 const desktop=matchMedia('(min-width: 900px)');
 const socialHost=document.createElement('div');socialHost.dataset.svelteUi='';flushSync(()=>mount(SocialFooter,{target:socialHost,props:{model,translate:t}}));environment.append(socialHost);
 environment.append(stage);original.before(environment);
 const radioHost=document.createElement('aside');radioHost.className='ambient-radio';radioHost.dataset.svelteUi='';environment.append(radioHost);
 flushSync(()=>mount(Radio,{target:radioHost,props:{model,translate:t}}));

 for(const definition of ordered){
  const {id,title,number}=definition;
  const panel=document.createElement('section');panel.className=`workspace-window window-${id}`;panel.hidden=true;panel.dataset.app=id;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby',`window-title-${id}`);
  const titlebar=document.createElement('div');titlebar.className='window-titlebar';
  flushSync(()=>mount(WindowTitlebar,{target:titlebar,props:{id,title,onMinimize:()=>hide(id,'minimized'),onClose:()=>hide(id,'closed'),onMaximize:()=>{playInterfaceSound(panel.classList.contains('is-maximized')?'restore':'maximize');windowMotion.resize(panel,()=>panel.classList.toggle('is-maximized'));syncLabels();}}}));
  const content=document.createElement('div');content.className='window-content';content.tabIndex=0;
  if(['stacks'].includes(id)){content.dataset.svelteUi='';flushSync(()=>mount({stacks:Stacks}[id],{target:content,props:{model,translate:t,onOpen:()=>open('radio'),onClose:()=>hide('radio','closed')}}));}
  else if(id==='sobre'){content.append(document.querySelector('#sobre'),document.querySelector('#processo'));}
  else if(id==='terminal')buildTerminal(content,open,goHome);
  else if(id==='diagnostico'){content.dataset.svelteUi='';flushSync(()=>mount(GuidedDiagnosis,{target:content,props:{model,onDemo:openDiagnosisDemo,onContact:openDiagnosisContact}}));}
  else content.append(document.querySelector(`#${id}`));
  if(id==='contato'){const compose=document.createElement('div');compose.dataset.svelteUi='';content.append(compose);flushSync(()=>{contactComposer=mount(ContactForm,{target:compose,props:{model,translate:t}});});}
  panel.append(titlebar,content);windows.append(panel);
  const app=home;panel.id=`window-${id}`;appButtons.set(id,app);
  const ui=model.windows.find(item=>item.id===id);
  const state={panel,titlebar,content,app,title,id,previousFocus:null,get status(){return ui.status;},set status(value){ui.status=value;}};states.set(id,state);
  panel.addEventListener('pointerdown',()=>activate(id,false));
  panel.addEventListener('focusin',()=>{if(active!==id||editorWindows.activeId)activate(id,false);});
  titlebar.addEventListener('pointerdown',event=>{
   if(!desktop.matches||event.button!==0||event.target.closest('button')||panel.classList.contains('is-maximized'))return;
   windowMotion.cancel(panel);
   const rect=panel.getBoundingClientRect(),bounds=stage.getBoundingClientRect();
   const start={x:event.clientX,y:event.clientY,left:rect.left-bounds.left,top:rect.top-bounds.top};
   titlebar.setPointerCapture(event.pointerId);panel.classList.add('is-dragging');
   const move=e=>{panel.style.left=`${Math.max(8,Math.min(bounds.width-rect.width-8,start.left+e.clientX-start.x))}px`;panel.style.top=`${Math.max(8,Math.min(bounds.height-70,start.top+e.clientY-start.y))}px`;};
   const stop=()=>{panel.classList.remove('is-dragging');titlebar.removeEventListener('pointermove',move);titlebar.removeEventListener('pointerup',stop);titlebar.removeEventListener('lostpointercapture',stop);};
   titlebar.addEventListener('pointermove',move);titlebar.addEventListener('pointerup',stop);titlebar.addEventListener('lostpointercapture',stop);
  });
 }
 original.hidden=true;site.classList.add('workspace-mode');
 const settings=site.querySelector('#workspace-settings');
 const tools=document.createElement('div');tools.className='workspace-tools';tools.setAttribute('role','group');tools.setAttribute('aria-label','Controles do ambiente');
 let terminalButton=button('','terminal-return');terminalButton.setAttribute('aria-label',t('Voltar ao terminal'));terminalButton.title=t('Voltar ao terminal');terminalButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 7 5 5-5 5m8 0h6"/></svg>';terminalButton.addEventListener('click',()=>goHome());
 tools.append(terminalButton,settings.querySelector('.theme-toggle'));environment.append(tools);
 const dockHost=document.createElement('div');dockHost.className='floating-dock-host';dockHost.dataset.svelteUi='';environment.append(dockHost);
 flushSync(()=>mount(FloatingDock,{target:dockHost,props:{model,translate:t,onOpen:open,onHome:goHome}}));
 terminalButton.remove();terminalButton=dockHost.querySelector('.terminal-return');
 const windowMotion=createWindowMotion(panel=>dockHost.querySelector(`[data-dock-id="${panel.dataset.app}"]`)||terminalButton,stage);
 const serviceNames=['Desenvolvimento web','Automações & IA','Integrações','Consultoria em tecnologia'];
 function openDiagnosisDemo(index){
  const services=[...site.querySelectorAll('.service')];services.forEach((service,i)=>service.open=i===index);open('servicos');
  const target=services[index]?.querySelector(index===3?'.activity':'.invitation-try');
  target?.scrollIntoView({block:'center',behavior:'instant'});
  if(index!==3){target?.focus({preventScroll:true});target?.click();}
 }
 function openDiagnosisContact(briefing,topic){open('contato');contactComposer.receiveBriefing(briefing,topic);flushSync();site.querySelector('.contact-compose').scrollIntoView({block:'start',behavior:'instant'});}
 site.querySelectorAll('[data-service-contact]').forEach(link=>link.addEventListener('click',event=>{
  if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const service=link.dataset.serviceContact;
  if(!serviceNames.includes(service))return;
  event.preventDefault();model.contactService=service;open('contato');flushSync();
  const form=site.querySelector('.contact-compose');
  form.scrollIntoView({block:'start',behavior:'instant'});
  const field=form.querySelector('input').value.trim()?form.querySelector('textarea'):form.querySelector('input');
  field.focus({preventScroll:true});
 }));
 settings.remove();
 environment.addEventListener('click',event=>{
  const link=event.target.closest('a[data-case-code]');
  if(!link||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const index=Number(link.dataset.caseCode);
  if(!Number.isInteger(index)||index<0||index>2)return;
  event.preventDefault();const services=[...site.querySelectorAll('.service')];services.forEach((service,i)=>service.open=i===index);open('servicos');const start=services[index]?.querySelector('.workbench-start');start?.scrollIntoView({block:'center',behavior:'instant'});start?.click();
 });
 document.addEventListener('languagechange',()=>{terminalButton.setAttribute('aria-label',t('Voltar ao terminal'));terminalButton.title=t('Voltar ao terminal');});
 site.querySelector('.skip').href='#ambiente';


 function route(id,push=true){const hash=id?`#${id}`:'#inicio';if(location.hash!==hash)history[push?'pushState':'replaceState'](null,'',hash);}
 function announce(key){const status=document.querySelector('#workspace-status');if(status)status.textContent=t(key);}
 function activate(id,focus=true){
  const state=states.get(id);if(!state||state.status!=='open')return;
  editorWindows.activeId=null;active=id;model.active=id;bringToFront(state.panel);
  states.forEach(item=>{item.panel.classList.toggle('is-active',item.id===id);item.content.inert=item.id!==id;});
  home.inert=true;environment.classList.add('has-window');
  if(focus)state.panel.querySelector('.window-close').focus({preventScroll:true});
  syncLabels();
 }
 function open(id,{history:withHistory=true}={}){
  if(id==='terminal'){goHome();return;}
  const state=states.get(id);if(!state)return;
  const appearing=state.status!=='open';
  if(withHistory&&!state.panel.contains(document.activeElement))state.previousFocus=document.activeElement;
  windowMotion.cancel(state.panel);state.panel.inert=false;
  if(state.status!=='open'){
   if(!state.previousFocus)state.previousFocus=document.activeElement;if(state.status==='closed')model.windows.find(app=>app.id===id).dockOrder=nextDockOrder();state.status='open';state.panel.hidden=false;
   if(!state.panel.style.left&&desktop.matches){const offset=[...states.values()].filter(item=>item.status==='open').length*14;state.panel.style.left=`${Math.max(16,(stage.clientWidth-Math.min(840,stage.clientWidth-64))/2+offset-14)}px`;state.panel.style.top=`${Math.min(30+offset-14,80)}px`;}
  }
  if(desktop.matches){state.panel.style.left=`${Math.max(8,Math.min(stage.clientWidth-state.panel.offsetWidth-8,parseFloat(state.panel.style.left)||16))}px`;state.panel.style.top=`${Math.max(8,Math.min(stage.clientHeight-state.panel.offsetHeight-8,parseFloat(state.panel.style.top)||16))}px`;}
  activate(id);flushSync();if(appearing){if(withHistory)playInterfaceSound('open');windowMotion.reveal(state.panel);}if(id==='terminal'&&desktop.matches)state.panel.querySelector('input').focus({preventScroll:true});if(withHistory)route(id);syncResume();
 }
 function hide(id,status){
  const state=states.get(id);if(!state||state.status!=='open')return;
  state.status=status;playInterfaceSound(status==='minimized'?'minimize':'close');windowMotion.dismiss(state.panel,status);state.content.inert=false;
  if(active===id){const next=[...states.values()].filter(item=>item.status==='open').sort((a,b)=>Number(b.panel.style.zIndex)-Number(a.panel.style.zIndex))[0];
   if(next){activate(next.id);route(next.id);if(status==='closed')restoreFocus(state,next.panel);}else{active=null;model.active=null;home.inert=false;environment.classList.remove('has-window');route(null);if(status!=='closed'||!restoreFocus(state,home))home.querySelector('input').focus({preventScroll:true});}
  }
  if(!active&&editorWindows.items.some(item=>item.status==='open'))restoreAfterEditor();
  syncResume();syncLabels();announce(status==='minimized'?'Janela minimizada.':'Janela fechada.');
 }
 function restoreAfterEditor(origin){
  const editor=editorWindows.items.filter(item=>item.status==='open').sort((a,b)=>Number(document.querySelector(`#code-editor-${b.index}`)?.style.zIndex||0)-Number(document.querySelector(`#code-editor-${a.index}`)?.style.zIndex||0))[0];
  if(editor){editor.resume();return;}
  const owner=origin?.closest('.workspace-window');const previous=owner&&states.get(owner.dataset.app);
  const next=previous?.status==='open'?previous:[...states.values()].filter(item=>item.status==='open').sort((a,b)=>Number(b.panel.style.zIndex)-Number(a.panel.style.zIndex))[0];
  if(next){activate(next.id,!previous);if(previous)origin.focus({preventScroll:true});route(next.id);}else goHome({history:false});
 }
 document.addEventListener('editorwindowdismissed',event=>restoreAfterEditor(event.detail?.opener));
 function restoreFocus(state,container){
  const origin=state.previousFocus;
  if(!origin?.isConnected||!container.contains(origin)||origin.closest('[hidden],[inert]')||origin.disabled)return false;
  origin.focus({preventScroll:true});origin.scrollIntoView({block:'nearest',behavior:'instant'});return document.activeElement===origin;
 }
 function goHome({history:withHistory=true}={}){
  for(const editor of editorWindows.items.filter(item=>item.status==='open'))editor.minimize(false);
  if(withHistory&&[...states.values()].some(state=>state.status==='open'))playInterfaceSound('minimize');
  states.forEach(state=>{if(state.status==='open'){state.status='minimized';windowMotion.dismiss(state.panel,'minimized');state.content.inert=false;}});
  active=null;model.active=null;home.inert=false;environment.classList.remove('has-window');home.querySelector('input').focus({preventScroll:true});if(withHistory)route(null);syncResume();syncLabels();
 }
 function syncResume(){flushSync();document.dispatchEvent(new Event('windowstatechange'));}
 function syncLabels(){
  environment.classList.toggle('has-maximized-window',[...states.values()].some(state=>state.status==='open'&&state.panel.classList.contains('is-maximized')));
  states.forEach(state=>{
   state.panel.querySelector('.window-minimize').setAttribute('aria-label',`${t('Minimizar')}: ${t(state.title)}`);
   state.panel.querySelector('.window-close').setAttribute('aria-label',`${t('Fechar')}: ${t(state.title)}`);
   state.panel.querySelector('.window-maximize').setAttribute('aria-label',t(state.panel.classList.contains('is-maximized')?'Restaurar tamanho':'Ampliar'));
  });
 }
 document.addEventListener('languagechange',()=>{model.languageRevision++;syncLabels();syncResume();});
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!document.querySelector('#intro').open&&!event.defaultPrevented){const editor=editorWindows.items.find(item=>item.id===editorWindows.activeId&&item.status==='open');if(editor){event.preventDefault();editor.close();}else if(active){event.preventDefault();hide(active,'closed');}}
 });
 function restoreRoute(){const legacy=location.hash.slice(1);const id=['lab','laboratorio','laboratory'].includes(legacy)?'servicos':legacy;if(states.has(id)){open(id,{history:false});if(id!==legacy)route(id,false);}else if(id==='processo')open('sobre',{history:false});else goHome({history:false});}
 window.addEventListener('popstate',restoreRoute);
 window.addEventListener('resize',()=>{if(!desktop.matches)return;states.forEach(state=>{if(state.panel.hidden)return;const maxLeft=Math.max(8,stage.clientWidth-state.panel.offsetWidth-8);state.panel.style.left=`${Math.max(8,Math.min(maxLeft,parseFloat(state.panel.style.left)||8))}px`;state.panel.style.top=`${Math.max(8,Math.min(stage.clientHeight-70,parseFloat(state.panel.style.top)||8))}px`;});});

 const status=document.createElement('p');status.id='workspace-status';status.className='sr-only';status.setAttribute('role','status');environment.append(status);
 syncLabels();syncResume();if(location.hash)restoreRoute();
 document.dispatchEvent(new Event('workspacecreated'));
 return {open,goHome,states,stage,arrange(){const visible=[...states.values()].filter(state=>state.status==='open');visible.forEach((state,index)=>{windowMotion.cancel(state.panel);state.panel.classList.remove('is-maximized');state.panel.style.left=`${Math.max(8,Math.min(stage.clientWidth-state.panel.offsetWidth-8,24+index*24))}px`;state.panel.style.top=`${Math.max(8,Math.min(stage.clientHeight-state.panel.offsetHeight-8,16+index*20))}px`;});syncLabels();}};
}

function buildTerminal(container,open,goHome){
 const terminal=document.createElement('div');terminal.className='workspace-terminal';
 const intro=document.createElement('p');intro.id='terminal-help';intro.textContent='Digite ou escolha. Comandos: help.';
 const suggestions=document.createElement('div');suggestions.className='terminal-suggestions';suggestions.setAttribute('aria-label','Caminho sugerido para explorar');
 const output=document.createElement('div');output.className='terminal-output';output.tabIndex=-1;output.setAttribute('role','log');output.setAttribute('aria-live','polite');output.setAttribute('aria-label','Histórico de comandos');
 const form=document.createElement('form');form.className='terminal-form';
 const label=document.createElement('label');label.htmlFor='terminal-command';label.textContent='Comando';label.className='sr-only';
 const prompt=document.createElement('span');prompt.className='terminal-prompt';prompt.textContent='loui /';prompt.setAttribute('aria-hidden','true');
 const input=document.createElement('input');input.id='terminal-command';input.autocomplete='off';input.spellcheck=false;input.name='command';input.maxLength=200;input.setAttribute('aria-describedby','terminal-help');
 const submit=button('');submit.type='submit';submit.setAttribute('aria-label','Executar comando');submit.title='Enter';submit.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5v8H5m5-5-5 5 5 5"/></svg>';
 const history=[];let cursor=0;
 function write(value,echo=false){const line=document.createElement('p');line.textContent=(echo?'› ':'')+value;line.className=echo?'command-echo':'';output.append(line);output.tabIndex=0;while(output.children.length>40)output.firstChild.remove();output.scrollTop=output.scrollHeight;}
 const apps={diagnostico:'diagnostico',diagnosis:'diagnostico',diagnostic:'diagnostico',servicos:'servicos',services:'servicos',servicios:'servicos',lab:'servicos',laboratorio:'servicos',laboratory:'servicos',sobre:'sobre',about:'sobre',contato:'contato',contact:'contato',contacto:'contato',projetos:'projetos',projects:'projetos',proyectos:'projetos',stacks:'stacks'};
 const execute=raw=>{
  const command=raw.trim();if(!command)return;history.push(command);if(history.length>50)history.shift();cursor=history.length;write(command,true);input.value='';
  const [name,arg]=command.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(/\s+/);
  if(['clear','limpar','limpiar'].includes(name)){output.replaceChildren();output.tabIndex=-1;return;}
  if(['help','ajuda','ayuda'].includes(name)){write('sobre · servicos · diagnostico · stacks · projetos · contato · inicio · idioma pt/en/es · tema claro/escuro · clear');return;}
  if(apps[name]){open(apps[name]);return;}
  if(['home','inicio'].includes(name)){goHome();return;}
  if(['idioma','language'].includes(name)&&['pt','en','es'].includes(arg)){setLanguage(arg);write(t('Preferência de idioma atualizada.'));return;}
  if(['tema','theme'].includes(name)&&['claro','light','escuro','dark','oscuro'].includes(arg)){
   const theme=['claro','light'].includes(arg)?'light':'dark';if(document.documentElement.dataset.theme!==theme)document.querySelector('.workspace-tools .theme-toggle').click();write(t('Tema atualizado.'));return;
  }
  write(t('Comando não reconhecido. Digite help para explorar.'));
 };
 let typingRevision=0;let typingTimer;
 function cancelTyping(){typingRevision++;clearTimeout(typingTimer);input.readOnly=false;terminal.removeAttribute('aria-busy');}
 function typeCommand(command){
  cancelTyping();const revision=typingRevision;input.value='';
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.reduceMotion==='true'){execute(command);return;}
  input.readOnly=true;terminal.setAttribute('aria-busy','true');
  let index=0;const step=()=>{if(revision!==typingRevision)return;input.value=command.slice(0,++index);if(index<command.length)typingTimer=setTimeout(step,65+(index%3)*28);else typingTimer=setTimeout(()=>{cancelTyping();execute(command);},240);};step();
 }
 input.addEventListener('pointerdown',cancelTyping);input.addEventListener('keydown',event=>{if(event.key==='Escape'&&input.readOnly){event.preventDefault();cancelTyping();}});
 for(const command of ['sobre','servicos','diagnostico','stacks','projetos','contato']){const chip=button(command);chip.dataset.command=command;chip.addEventListener('click',()=>typeCommand(t(command)));suggestions.append(chip);}
 input.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();cursor=Math.max(0,Math.min(history.length,cursor+(event.key==='ArrowUp'?-1:1)));input.value=history[cursor]||'';}});
 form.addEventListener('submit',event=>{event.preventDefault();cancelTyping();execute(input.value);});form.append(label,prompt,input,submit);
 const chrome=document.createElement('div');chrome.className='terminal-chrome';
 const lights=document.createElement('span');lights.className='terminal-lights';lights.setAttribute('aria-hidden','true');lights.innerHTML='<i></i><i></i><i></i>';
 const title=document.createElement('button');title.type='button';title.className='terminal-caption terminal-move';title.textContent='loui — Terminal';title.setAttribute('aria-label',t('Mover terminal com as setas'));title.title=t('Arraste para mover. Setas movem; Home restaura.');
 chrome.append(lights,title);
 const body=document.createElement('div');body.className='terminal-body';body.append(intro,output,form);
 terminal.append(chrome,body,suggestions);container.append(terminal);initCommandSuggestions(input,form);
 const position=movable(terminal,title);const reset=button('','terminal-position-reset');reset.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/></svg>';reset.setAttribute('aria-label',t('Restaurar posição'));reset.addEventListener('click',()=>position.reset());chrome.append(reset);
 document.addEventListener('languagechange',()=>{title.setAttribute('aria-label',t('Mover terminal com as setas'));title.title=t('Arraste para mover. Setas movem; Home restaura.');reset.setAttribute('aria-label',t('Restaurar posição'));});
}
