import { renderContacts } from './contacts.js';
import { renderProjects } from './projects.js';
import { initTheme } from './theme.js';
import { initIntro } from './intro.js';
import { initMotion } from './motion.js';
import { site } from './content/site.js';
import { initI18n } from './i18n.js';
import { initExperiences, initLivingType } from './experiences.js';
import { initWorkspace } from './workspace.js';
import { initInterfaceSounds } from './interface-sounds.js';

initExperiences();
initWorkspace();
initI18n();
initTheme();
initInterfaceSounds();
renderProjects(site.projects);
renderContacts();
document.addEventListener('languagechange',()=>{renderContacts();renderProjects(site.projects);});
initLivingType();
initIntro();
try { initMotion(); } catch { document.querySelectorAll('.waiting').forEach(el => el.classList.remove('waiting')); }
document.documentElement.dataset.ready='true';
