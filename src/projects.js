import {demoUrl} from './demo-links.js';
import {projectPreview,demoActionMarkup} from './demo-presentation.js';
import { t, getLanguage } from './i18n.js';

export function renderProjects(projects) {
  const list = document.querySelector('#project-list');
  const expanded = new Set([...list.querySelectorAll('.project-study[open]')].map(item => item.dataset.projectId));
  list.replaceChildren();
  const valid = projects.filter(project => typeof project.title === 'string' && project.title.trim() && typeof project.summary === 'string' && project.summary.trim());
  document.querySelector('#projetos').hidden = false;
  document.dispatchEvent(new Event('projectschanged'));
  const heading=document.querySelector('#projetos h2');
  heading.hidden=false;
  if(!valid.length){
    const empty=document.createElement('div');empty.className='projects-empty';
    empty.innerHTML='<svg viewBox="0 0 100 80" fill="none" aria-hidden="true"><path d="M8 20h32l9 10h43v43H8V20Z"/><path d="M8 20V8h30l9 12h40v10"/></svg>';
    const text=document.createElement('p');text.textContent=t('Nossos primeiros projetos estão por vir. Este espaço vai acompanhar cada entrega.');empty.append(text);list.append(empty);
  }
  for (const source of valid) {
    const project={...source,...source.translations?.[getLanguage()]};
    const article = document.createElement('article'); article.className = 'project';
    const category = document.createElement('p'); category.textContent = project.category || t('Projeto');
    const title = document.createElement('h3'); title.textContent = project.title;
    const summary = document.createElement('p'); summary.textContent = project.summary;
    if(project.study){
      article.dataset.projectId=source.id;
      const heading=document.createElement('header');heading.className='project-heading';heading.append(category,title);article.append(heading,summary);
    }else article.append(category,title,summary);
    if (project.study) {
      article.classList.add('project-case');
      const authorship=document.createElement('p');authorship.className='project-authorship';authorship.textContent=t('Projeto autoral / demonstração local');
      const details=document.createElement('details');details.className='project-study';details.dataset.projectId=source.id;details.open=expanded.has(source.id);
      const toggle=document.createElement('summary');toggle.textContent=t('Por dentro do projeto');toggle.setAttribute('aria-label',`${t('Por dentro do projeto')}: ${project.title}`);
      const evidence=document.createElement('dl');
      for(const [key,label] of [['problem','Desafio'],['decision','Decisão'],['result','O que você pode observar'],['limits','Limites da demonstração']]) {
        const term=document.createElement('dt');term.textContent=t(label);
        const description=document.createElement('dd');description.textContent=project.study[key];evidence.append(term,description);
      }
      details.append(toggle,evidence);article.append(authorship);
      if (Number.isInteger(source.demoIndex) && source.demoIndex>=0 && source.demoIndex<3) {
        const demo=document.createElement('a');demo.className='project-demo demo-action';demo.href=demoUrl(source.demoIndex,getLanguage());demo.target='_blank';demo.rel='noopener noreferrer';demo.innerHTML=demoActionMarkup(source.demoIndex,getLanguage());article.append(demo);const code=document.createElement('a');code.className='project-code';code.href='#servicos';code.dataset.caseCode=String(source.demoIndex);code.textContent=({pt:'Explorar o código',en:'Explore the code',es:'Explorar el código'})[getLanguage()];article.append(code);
      }
      article.append(details);
    }
    if (project.study)project.image=projectPreview(source.id,getLanguage());
    if (project.image && /^(?:\.\/|\/)?public\/[\w/.-]+$/.test(project.image)) {
      const image = document.createElement('img'); image.src = project.image; image.alt = project.imageAlt || project.title; image.loading = 'lazy';
      image.width = Number(project.imageWidth) > 0 ? Number(project.imageWidth) : 1100;
      image.height = Number(project.imageHeight) > 0 ? Number(project.imageHeight) : 700;
      image.addEventListener('error', () => image.remove()); article.prepend(image);
    }
    try {
      const url = new URL(project.url);
      if (['https:', 'http:'].includes(url.protocol)) {
        const link = document.createElement('a'); link.href = url.href; link.textContent = `${t('Conhecer')} ${project.title}`; article.append(link);
      }
    } catch { /* A project can be published without an external link. */ }
    list.append(article);
  }
}
