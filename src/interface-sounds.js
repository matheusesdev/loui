import {t} from './i18n.js';
import {synthesizeSound, soundPresets} from './sound-synthesis.js';

const preference = 'loui-interface-sounds';
let enabled = true, initialized = false, unlocked = false, failed = false;
let context, output, activeVoice, control, revision = 0;
try { enabled = localStorage.getItem(preference) !== 'off'; } catch { /* In-memory preference. */ }
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
function silence() { revision++; activeVoice?.stop(); activeVoice = null; }
function syncControl() {
  if (!control) return;
  control.disabled = !AudioContextClass || failed;
  const label = t(control.disabled ? 'Sons indisponíveis neste navegador' : enabled ? 'Desativar sons da interface' : 'Ativar sons da interface');
  control.setAttribute('aria-label', label); control.title = label;
  control.setAttribute('aria-pressed', String(enabled && !control.disabled));
  control.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3V9Z"/><path d="${enabled ? 'M16 9a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12' : 'm16 9 5 6m0-6-5 6'}"/></svg>`;
}
function unlock(event) {
  if (!event.isTrusted || !enabled || !AudioContextClass || failed || document.hidden) return;
  try {
    if (!context) {
      context = new AudioContextClass({latencyHint:'interactive'});
      output = context.createGain(); output.gain.value = .26; output.connect(context.destination);
    }
    unlocked = true;
    if (context.state === 'suspended') context.resume().catch(() => {});
  } catch { failed = true; syncControl(); }
}
export function playInterfaceSound(kind) {
  if (!enabled || !unlocked || failed || document.hidden || !soundPresets[kind] || !context) return;
  silence();
  const current = revision;
  const play = () => {
    if (current !== revision || !enabled || document.hidden || context.state !== 'running') return;
    try { activeVoice = synthesizeSound(context, output, kind); } catch { /* Navigation always continues. */ }
  };
  if (context.state === 'running') play();
  else context.resume().then(play).catch(() => {});
}
export function initInterfaceSounds() {
  if (initialized) return;
  initialized = true;
  document.addEventListener('pointerdown', unlock, {capture:true});
  document.addEventListener('keydown', unlock, {capture:true});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { silence(); context?.suspend().catch(() => {}); }
  });
  document.addEventListener('languagechange', syncControl);
  window.addEventListener('storage', event => {
    if (event.key !== preference && event.key !== null) return;
    enabled = event.newValue !== 'off'; if (!enabled) silence(); syncControl();
  });
  const chrome = document.querySelector('.workspace-terminal .terminal-chrome');
  if (!chrome) return;
  control = document.createElement('button'); control.type = 'button'; control.className = 'terminal-sound-toggle';
  control.addEventListener('click', event => {
    enabled = !enabled;
    try { localStorage.setItem(preference, enabled ? 'on' : 'off'); } catch { /* In-memory preference. */ }
    syncControl();
    if (enabled) { unlock(event); playInterfaceSound('maximize'); } else silence();
  });
  chrome.append(control); syncControl();
}
