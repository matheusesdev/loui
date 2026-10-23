export function initMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const isReduced=()=>reduced.matches||document.documentElement.dataset.reduceMotion==='true';
  const hero = document.querySelector('.hero');
  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse' && !isReduced()) hero.style.setProperty('--trace-shift', `${(event.clientX / innerWidth - .5) * 10}px`);
  });
  hero.addEventListener('pointerleave', () => hero.style.setProperty('--trace-shift', '0px'));
  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('waiting'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    if (!isReduced()) {
      document.documentElement.classList.add('motion-ready');
      reveals.forEach(el => { el.classList.add('waiting'); observer.observe(el); });
    }
    reduced.addEventListener('change', () => { reveals.forEach(el => el.classList.remove('waiting')); observer.disconnect(); });
  }
  const canvas = document.querySelector('.field-canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dialog = document.querySelector('#intro');
  let width = 0, height = 0, frame = 0, active = false, startedAt = null;
  let pointer = { x: .5, y: .5 };
  let color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const paletteObserver = new MutationObserver(() => { color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(); if (isReduced()) draw(0); });
  paletteObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  function resize() {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * dpr; canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (isReduced()) draw(0);
  }
  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color; ctx.lineWidth = .7;
    const shift = isReduced() ? 0 : (pointer.x - .5) * 18 + Math.sin(time*.0003)*3;
    const y=height*.5+shift,corner=Math.min(65,width*.09);
    ctx.globalAlpha=.42;
    ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width*.89-corner,y);
    ctx.quadraticCurveTo(width*.89,y,width*.89,y+corner);
    ctx.lineTo(width*.89,height*.88);ctx.stroke();
    ctx.fillStyle=color;ctx.fillRect(width*.89-2,height*.88-2,4,4);
    ctx.globalAlpha = 1;
  }
  function tick(time) {
    startedAt ??= time;
    draw(time);
    if (active && time - startedAt < 4500) frame = requestAnimationFrame(tick);
    else active = false;
  }
  function update() {
    cancelAnimationFrame(frame);
    active = dialog.open && !document.hidden && !isReduced();
    if (active) frame = requestAnimationFrame(tick); else draw(0);
  }
  dialog.addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse' && !isReduced()) {
      pointer = { x: event.clientX / innerWidth, y: event.clientY / innerHeight };
      if (!active) draw(pointer.x * 5000);
    }
  });
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  dialog.addEventListener('introclosed', () => { active = false; cancelAnimationFrame(frame); paletteObserver.disconnect(); resizeObserver.disconnect(); });
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', update);
  resize(); update();
}
