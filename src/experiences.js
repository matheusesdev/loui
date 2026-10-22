import { mount, flushSync } from 'svelte';
import LabActivity from './components/LabActivity.svelte';
import LabLauncher from './components/LabLauncher.svelte';
import {t} from './i18n.js';
export function initExperiences(){
 document.querySelectorAll('.service-body').forEach((body,index)=>{
  body.querySelector('.service-symbol')?.remove();
  const demo=document.createElement('div');demo.className='demo interactive-demo';demo.dataset.svelteUi='';
  flushSync(()=>mount(index===3?LabActivity:LabLauncher,{target:demo,props:{index}}));body.append(demo);
 });
 document.querySelectorAll('.service').forEach(service=>{
  service.querySelector('summary').addEventListener('click',event=>{
   event.preventDefault();if(service.open){service.open=false;return;}
   document.querySelectorAll('.service').forEach(other=>{other.open=other===service;});
   const body=service.querySelector('.service-body');
   if(!matchMedia('(prefers-reduced-motion: reduce)').matches)body.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
  });
 });
}

export function initLivingType(){
  const dialog=document.querySelector('#intro');
  const scene=document.querySelector('.intro-scene');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const letters=[...document.querySelectorAll('.intro-logo>span:not(.logo-dot)')];
  letters.forEach((letter,i)=>{const shape=document.createElement('span');shape.className='letter-shape';shape.textContent=letter.textContent;letter.replaceChildren(shape);letter.style.setProperty('--letter-index',i-1.5);});
  const reset=()=>{scene.style.setProperty('--type-x','0px');scene.style.setProperty('--type-y','0px');scene.style.setProperty('--type-turn','0deg');};
  scene.addEventListener('pointermove',event=>{
    if(reduced.matches||dialog.classList.contains('leaving'))return;
    const bounds=scene.getBoundingClientRect();
    const x=(event.clientX-bounds.left)/bounds.width-.5;
    const y=(event.clientY-bounds.top)/bounds.height-.5;
    scene.style.setProperty('--type-x',`${x*18}px`);scene.style.setProperty('--type-y',`${y*12}px`);scene.style.setProperty('--type-turn',`${x*3}deg`);
  });
  scene.addEventListener('pointerleave',reset);
  scene.addEventListener('pointerup',event=>{if(event.pointerType!=='mouse')reset();});
  reduced.addEventListener('change',reset);
  dialog.addEventListener('introstarting',()=>{reset();scene.classList.add('converging');});
  dialog.addEventListener('introclosed',()=>{document.querySelector('.hero').classList.add('arrived');document.querySelector('.workspace-home')?.classList.add('arrived');});
}
