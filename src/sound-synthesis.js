// Original two-note game-like chimes. No sampled game or system audio.
export const interfaceSoundGain = .18;
export const soundPresets = {
  open: {from:659.25,to:880,duration:.24},
  close: {from:659.25,to:523.25,duration:.22},
  minimize: {from:587.33,to:440,duration:.24},
  maximize: {from:783.99,to:1046.5,duration:.25},
  restore: {from:783.99,to:659.25,duration:.23},
};
export function synthesizeSound(context,destination,kind){
 const preset=soundPresets[kind];if(!preset)return null;
 const start=context.currentTime+.004,nodes=[],sources=[],gains=[];
 function bell(frequency,offset,level){
  const at=start+offset,end=start+preset.duration;
  const envelope=context.createGain();gains.push(envelope);nodes.push(envelope);
  envelope.gain.setValueAtTime(0,at);envelope.gain.linearRampToValueAtTime(level,at+.008);envelope.gain.exponentialRampToValueAtTime(.00001,end);envelope.connect(destination);
  for(const [ratio,amount] of [[1,1],[2.01,.10]]){
   const tone=context.createOscillator(),mix=context.createGain();tone.type='sine';tone.frequency.setValueAtTime(frequency*ratio,at);mix.gain.value=amount;tone.connect(mix).connect(envelope);nodes.push(tone,mix);sources.push(tone);tone.start(at);tone.stop(end+.015);
  }
 }
 bell(preset.from,0,.034);bell(preset.to,.065,.042);
 let ended=0;for(const source of sources)source.onended=()=>{if(++ended===sources.length)nodes.forEach(node=>node.disconnect());};
 return {stop(){const now=context.currentTime;for(const envelope of gains){if(typeof envelope.gain.cancelAndHoldAtTime==='function')envelope.gain.cancelAndHoldAtTime(now);else{const value=envelope.gain.value;envelope.gain.cancelScheduledValues(now);envelope.gain.setValueAtTime(value,now);}envelope.gain.linearRampToValueAtTime(0,now+.02);}for(const source of sources){try{source.stop(now+.025);}catch{/* Already ended. */}}}};
}
