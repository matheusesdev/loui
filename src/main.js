import { renderContacts } from './contacts.js';
import { renderProjects } from './projects.js';
import { initTheme } from './theme.js';
import { initIntro } from './intro.js';
import { initMotion } from './motion.js';
import { site } from './content/site.js';
import { initI18n } from './i18n.js';
import { initExperiences, initLivingType } from './experiences.js';
import { initWorkspace } from './workspace.js';
import {initDesktopControls} from './desktop-controls.js';
import './styles/desktop-discovery.css';
import './styles/fullscreen-windows.css';
import './styles/floating-dock.css';
import { initInterfaceSounds } from './interface-sounds.js';

const phone=matchMedia('(max-width:767px), (max-width:1000px) and (max-height:500px) and (pointer:coarse)').matches;
if(phone){
 const {initMobile}=await import('./mobile.js');initMobile();
}else{
initExperiences();
const workspace=initWorkspace();
initI18n();
initTheme();
initInterfaceSounds();
initDesktopControls();
renderProjects(site.projects);
matchMedia('(max-width:700px), (max-height:500px)').addEventListener('change',()=>renderProjects(site.projects));
renderContacts();
document.addEventListener('languagechange',()=>{renderContacts();renderProjects(site.projects);});
initLivingType();
initIntro();
try { initMotion(); } catch { document.querySelectorAll('.waiting').forEach(el => el.classList.remove('waiting')); }
document.documentElement.dataset.ready='true';
}
