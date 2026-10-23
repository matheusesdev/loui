<script>
 import AppIcon from './AppIcon.svelte';
 import {editorWindows} from '../editor-windows.svelte.js';
 import {getLanguage} from '../i18n.js';
 let {model,translate,onOpen,onHome}=$props();
 let focused=$state('home');
 $effect(()=>{if(focused!=='home'&&!items.some(item=>item.id===focused))focused='home';});
 function trackFocus(event){const button=event.target.closest('button');if(!button)return;focused=button.dataset.dockId||'home';event.currentTarget.querySelectorAll('button').forEach(item=>item.tabIndex=item===button?0:-1);}
 const c=$derived.by(()=>{model.languageRevision;return ({pt:{name:'Janelas da loui',open:'Aberta',minimized:'Minimizada',active:'Em foco',code:'Código',home:'Voltar ao terminal'},en:{name:'loui windows',open:'Open',minimized:'Minimized',active:'In focus',code:'Code',home:'Back to terminal'},es:{name:'Ventanas de loui',open:'Abierta',minimized:'Minimizada',active:'En foco',code:'Código',home:'Volver a la terminal'}})[getLanguage()];});
 const items=$derived([...model.windows.filter(app=>app.status!=='closed').map(app=>({...app,type:'window'})),...editorWindows.items.filter(app=>app.status!=='closed').map(app=>({...app,type:'editor'}))].sort((a,b)=>a.dockOrder-b.dockOrder));
 const name=app=>{model.languageRevision;return app.type==='editor'?`${app.title} — ${c.code}`:translate(app.title);};
 const active=app=>app.type==='editor'?editorWindows.activeId===app.id:!editorWindows.activeId&&model.active===app.id;
 const status=app=>active(app)?c.active:app.status==='minimized'?c.minimized:c.open;
 function keyboard(event){if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const buttons=[...event.currentTarget.querySelectorAll('button')];const index=buttons.indexOf(document.activeElement);if(index<0)return;event.preventDefault();buttons[event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:buttons.length-1))%buttons.length]?.focus();}
</script>
<div role="toolbar" tabindex="-1" class="floating-dock" aria-label={c.name} onkeydown={keyboard} onfocusin={trackFocus}>
 <button class="floating-dock-item dock-home terminal-return" type="button" tabindex={focused==='home'?0:-1} aria-label={c.home} onclick={onHome}><span class="floating-dock-icon dock-art-terminal"><AppIcon name="terminal"/></span><span class="floating-dock-tooltip">{c.home}</span><span class:visible={!model.active&&!editorWindows.activeId} class="floating-dock-dot" aria-hidden="true"></span></button>
 <div class="floating-dock-windows">
 {#each items as app (app.id)}<button class="floating-dock-item" class:is-active={active(app)} class:is-minimized={app.status==='minimized'} type="button" tabindex={focused===app.id?0:-1} data-dock-id={app.id} data-dock-status={app.status} aria-label={`${name(app)} — ${status(app)}`} aria-controls={app.type==='editor'?`code-editor-${app.index}`:`window-${app.id}`} aria-expanded={app.status==='open'} onclick={()=>app.type==='editor'?app.resume():onOpen(app.id)}><span class={`floating-dock-icon dock-art-${app.type==='editor'?`editor-${app.index}`:app.id}`}><AppIcon name={app.type==='editor'?(app.index===0?'servicos':app.index===1?'workflow':'integracao'):app.id}/>{#if app.status==='minimized'}<span class="floating-dock-minimized" aria-hidden="true"></span>{/if}</span><span class="floating-dock-tooltip">{name(app)}<small>{status(app)}</small></span><span class="floating-dock-dot visible" aria-hidden="true"></span></button>{/each}
 </div>
</div>
