import {mount,flushSync} from 'svelte';
import MobileApp from './components/MobileApp.svelte';
import {initI18n} from './i18n.js';
import {initTheme} from './theme.js';
import {initIntro} from './intro.js';
import {initLivingType} from './experiences.js';
import './styles/mobile.css';

export function initMobile(){
 const services=[...document.querySelectorAll('.service')].map(service=>({title:service.querySelector('h3').textContent,question:service.querySelector('.service-question').textContent,description:service.querySelector('.service-question + p').textContent,items:[...service.querySelectorAll('li')].map(item=>item.textContent),scope:service.querySelector('.service-scope').textContent}));
 const about=[...document.querySelectorAll('.about-copy p')].map(p=>p.textContent);
 const root=document.querySelector('#site');root.replaceChildren();root.dataset.svelteUi='';
 document.documentElement.classList.add('mobile-experience');
 flushSync(()=>mount(MobileApp,{target:root,props:{services,about}}));
 initI18n();root.querySelector('.language-picker')?.remove();initTheme();
 initLivingType();initIntro();document.documentElement.dataset.ready='true';
}
