import { t } from './i18n.js';

export function initIntro() {
  const dialog = document.querySelector('#intro');
  const site = document.querySelector('#site');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (location.hash || typeof dialog.showModal !== 'function') return;
  let entering = false;
  let prepared = false;
  const enterButton = document.querySelector('#enter');
  const loading = document.createElement('p');loading.className='intro-loading';loading.setAttribute('role','status');
  const label = document.createElement('span');label.textContent=t('Preparando o ambiente…');loading.append(label);
  enterButton.before(loading);enterButton.hidden=true;
  dialog.classList.add('is-loading');
  document.addEventListener('languagechange',()=>{label.textContent=t('Preparando o ambiente…');});
  const essential = Promise.race([document.fonts.ready.catch(()=>{}),new Promise(resolve=>setTimeout(resolve,2500))]);
  const brand = new Promise(resolve=>setTimeout(resolve,reduced.matches?0:1100));
  Promise.all([essential,brand]).then(()=>{
    prepared=true;loading.hidden=true;enterButton.hidden=false;dialog.classList.remove('is-loading');
    if(dialog.open)enterButton.focus({preventScroll:true});
  });
  const finish = () => {
    if (!dialog.open) return;
    dialog.close();
    site.inert = false;
    document.documentElement.classList.remove('intro-open');
    (document.querySelector('.workspace-home-title')||document.querySelector('#hero-title')).focus({ preventScroll: true });
    dialog.dispatchEvent(new Event('introclosed'));
  };
  const enter = () => {
    if (entering || !prepared) return;
    entering = true;
    if (reduced.matches) return finish();
    dialog.dispatchEvent(new Event('introstarting'));
    dialog.classList.add('leaving');
    dialog.addEventListener('animationend', event => {
      if (event.target === dialog && event.animationName === 'intro-out') finish();
    });
    // Timeout also releases the modal if a CSS animation is interrupted.
    setTimeout(finish, 560);
  };
  document.querySelector('#enter').addEventListener('click', enter);
  dialog.addEventListener('cancel', event => { event.preventDefault(); enter(); });
  dialog.showModal();
  site.inert = true;
  document.documentElement.classList.add('intro-open');
  dialog.focus({ preventScroll: true });
}
