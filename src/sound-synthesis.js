// Original loui cues. No sampled system audio or external assets.
export const soundPresets = {
  open: {from:320, to:620, duration:.24, air:1800},
  close: {from:460, to:145, duration:.23, air:1100},
  minimize: {from:780, to:240, duration:.32, air:2300},
  maximize: {from:440, to:680, duration:.19, air:2000},
  restore: {from:660, to:420, duration:.19, air:1500},
};
const noiseBuffers = new WeakMap();
function noise(context) {
  if (noiseBuffers.has(context)) return noiseBuffers.get(context);
  const buffer = context.createBuffer(1, context.sampleRate, context.sampleRate);
  const samples = buffer.getChannelData(0);
  let seed = 173;
  for (let i=0; i<samples.length; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    samples[i] = seed / 2147483648 - 1;
  }
  noiseBuffers.set(context, buffer);
  return buffer;
}
export function synthesizeSound(context, destination, kind) {
  const preset = soundPresets[kind];
  if (!preset) return null;
  const start = context.currentTime + .004;
  const end = start + preset.duration;
  const envelope = context.createGain();
  envelope.gain.setValueAtTime(0, start);
  envelope.gain.linearRampToValueAtTime(.6, start + .018);
  envelope.gain.exponentialRampToValueAtTime(.0001, end);
  envelope.connect(destination);
  const tone = context.createOscillator();
  tone.type = 'sine';
  tone.frequency.setValueAtTime(preset.from, start);
  tone.frequency.exponentialRampToValueAtTime(preset.to, end);
  const toneLevel = context.createGain(); toneLevel.gain.value = .22;
  tone.connect(toneLevel).connect(envelope);
  const air = context.createBufferSource(); air.buffer = noise(context);
  const filter = context.createBiquadFilter(); filter.type = 'bandpass'; filter.Q.value = .7;
  filter.frequency.setValueAtTime(preset.air, start);
  filter.frequency.exponentialRampToValueAtTime(preset.air * preset.to / preset.from, end);
  const airLevel = context.createGain(); airLevel.gain.value = .28;
  air.connect(filter).connect(airLevel).connect(envelope);
  const nodes = [tone, toneLevel, air, filter, airLevel, envelope];
  tone.onended = () => nodes.forEach(node => node.disconnect());
  tone.start(start); air.start(start);
  tone.stop(end + .02); air.stop(end + .02);
  return {stop() {
    const now = context.currentTime;
    if (typeof envelope.gain.cancelAndHoldAtTime === 'function') envelope.gain.cancelAndHoldAtTime(now);
    else { const value = envelope.gain.value; envelope.gain.cancelScheduledValues(now); envelope.gain.setValueAtTime(value, now); }
    envelope.gain.linearRampToValueAtTime(0, now + .02);
    for (const source of [tone, air]) { try { source.stop(now + .03); } catch { /* Already ended. */ } }
  }};
}
