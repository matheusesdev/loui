import { t, getLanguage } from './i18n.js';

export function renderProjects(projects) {
  const list = document.querySelector('#project-list');
  list.replaceChildren();
  const valid = projects.filter(project => typeof project.title === 'string' && project.title.trim() && typeof project.summary === 'string' && project.summary.trim());
  document.querySelector('#projetos').hidden = false;
  document.querySelector('[data-project-nav]').hidden = false;
  document.dispatchEvent(new Event('projectschanged'));
  const heading=document.querySelector('#projetos h2');
  heading.hidden=valid.length>0;
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
    article.append(category, title, summary);
    if (project.image && /^\.\/?public\/[\w/.-]+$/.test(project.image)) {
      const image = document.createElement('img'); image.src = project.image; image.alt = project.imageAlt || project.title; image.loading = 'lazy';
      image.width = Number(project.imageWidth) > 0 ? Number(project.imageWidth) : 1200;
      image.height = Number(project.imageHeight) > 0 ? Number(project.imageHeight) : 800;
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
