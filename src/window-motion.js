// Animate the real window, retaining form/editor state and avoiding DOM snapshots.
export function createWindowMotion(target, stage) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pending = new Map();
  const cancel = panel => pending.get(panel)?.();
  const finishAll = () => [...pending.values()].forEach(finish => finish());
  reduced.addEventListener('change', () => { if (reduced.matches) finishAll(); });
  document.addEventListener('motionpreferencechange',finishAll);
  window.addEventListener('resize', finishAll);

  function funnel(panel) {
    const rect = panel.getBoundingClientRect();
    const anchor = (typeof target==='function'?target(panel):target).getBoundingClientRect();
    const x = anchor.left + anchor.width / 2 - rect.left - rect.width / 2;
    const y = anchor.top + anchor.height / 2 - rect.top - rect.height / 2;
    const tilt = Math.sign(x) * -24;
    const transform = (progress, sx, sy, rx, ry) =>
      `translate(${x * progress}px, ${y * progress}px) perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${sx}, ${sy})`;
    return [
      {offset:0, transform:transform(0,1,1,0,0), opacity:1},
      {offset:.28, transform:transform(.12,.64,.93,24,tilt), opacity:1},
      {offset:.62, transform:transform(.58,.24,.52,48,tilt*.7), opacity:1},
      {offset:.86, transform:transform(.91,.07,.13,30,tilt*.3), opacity:.85},
      {offset:1, transform:transform(1,.015,.015,0,0), opacity:0},
    ];
  }

  function run(panel, kind, frames, duration, hide = false) {
    if (reduced.matches || document.documentElement.dataset.reduceMotion==='true' || typeof panel.animate !== 'function') {
      panel.hidden = hide;
      panel.classList.remove('is-window-animating');
      return;
    }
    panel.classList.add('is-window-animating');
    panel.classList.toggle('is-exiting', hide);
    panel.dataset.windowMotion = kind;
    if (hide) panel.dataset.windowExit = kind;
    stage.classList.add('has-window-motion');
    let animation;
    const finish = () => {
      if (pending.get(panel) !== finish) return;
      pending.delete(panel);
      // Hide exits before cancelling their fill; reveals/resizes retain the live window.
      panel.hidden = hide;
      animation?.cancel();
      panel.classList.remove('is-exiting', 'is-window-animating');
      delete panel.dataset.windowExit;
      delete panel.dataset.windowMotion;
      if (!pending.size) stage.classList.remove('has-window-motion');
    };
    pending.set(panel, finish);
    try {
      animation = panel.animate(frames, {
        duration,
        easing:'cubic-bezier(.4, 0, .2, 1)', fill:'both',
      });
      animation.finished.then(finish, finish);
    } catch {
      finish();
    }
  }

  function dismiss(panel, kind) {
    cancel(panel);
    panel.inert = true;
    panel.classList.add('is-window-animating');
    const frames = kind === 'minimized' ? funnel(panel) : [
      {transform:'translateY(0) perspective(1200px) rotateX(0deg) scale(1, 1)', opacity:1},
      {transform:'translateY(10px) perspective(1200px) rotateX(18deg) scale(.62, .78)', opacity:1, offset:.45},
      {transform:'translateY(20px) perspective(1200px) rotateX(28deg) scale(.2, .3)', opacity:.9, offset:.8},
      {transform:'translateY(24px) perspective(1200px) rotateX(0deg) scale(.025, .04)', opacity:0},
    ];
    run(panel, kind, frames, kind === 'minimized' ? duration() : 360, true);
  }
  function duration() { return matchMedia('(max-width: 899px)').matches ? 420 : 520; }
  function reveal(panel) {
    cancel(panel);
    panel.classList.add('is-window-animating');
    const frames = funnel(panel).reverse().map(frame => ({...frame, offset:1-frame.offset}));
    run(panel, 'opening', frames, duration());
  }
  function resize(panel, change) {
    const before = panel.getBoundingClientRect();
    cancel(panel);
    panel.classList.add('is-window-animating');
    change();
    const after = panel.getBoundingClientRect();
    const from = `translate(${before.left-after.left}px, ${before.top-after.top}px) scale(${before.width/after.width}, ${before.height/after.height})`;
    run(panel, 'resizing', [
      {transform:from, transformOrigin:'0 0'},
      {transform:'translate(0px, 0px) scale(1, 1)', transformOrigin:'0 0'},
    ], 340);
  }
  return {dismiss, reveal, resize, cancel};
}
