let layer=150;
let layersInstalled=false;
export function bringToFront(node){node.style.zIndex=String(++layer);}
export function movable(node,handle,{minWidth=900,topInset=()=>8}={}){
 const desktop=matchMedia(`(min-width:${minWidth}px)`);
 const original=node.getAttribute('style');let placeholder,drag;
 if(!layersInstalled){document.addEventListener('pointerdown',event=>{const surface=event.target.closest('.workspace-window,.workspace-terminal,.ambient-radio');if(surface)bringToFront(surface);});layersInstalled=true;}
 function bounds(left,top){const rect=node.getBoundingClientRect();const bottom=innerHeight-rect.height-8;const topLimit=Math.max(8,Math.min(bottom,topInset()));node.style.left=Math.max(8,Math.min(innerWidth-rect.width-8,left))+'px';node.style.top=Math.max(topLimit,Math.min(bottom,top))+'px';}
 function float(){if(node.dataset.floating)return;const rect=node.getBoundingClientRect();if(node.classList.contains('workspace-terminal')){placeholder=document.createElement('div');placeholder.className='terminal-placeholder';placeholder.style.height=rect.height+'px';node.before(placeholder);}node.dataset.floating='true';Object.assign(node.style,{position:'fixed',width:rect.width+'px',left:rect.left+'px',top:rect.top+'px',right:'auto',bottom:'auto',margin:'0',zIndex:String(++layer)});}
 function reset(){stop();placeholder?.remove();placeholder=null;delete node.dataset.floating;if(original===null)node.removeAttribute('style');else node.setAttribute('style',original);}
 function down(event){if(!desktop.matches||event.button!==0)return;event.preventDefault();float();const rect=node.getBoundingClientRect();drag={id:event.pointerId,x:event.clientX,y:event.clientY,left:rect.left,top:rect.top};handle.setPointerCapture(event.pointerId);node.classList.add('is-moving');}
 function move(event){if(drag&&event.pointerId===drag.id)bounds(drag.left+event.clientX-drag.x,drag.top+event.clientY-drag.y);}
 function stop(){drag=null;node.classList.remove('is-moving');}
 function key(event){if(!desktop.matches)return;const directions={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(event.key==='Home'){event.preventDefault();reset();}else if(directions[event.key]){event.preventDefault();float();const r=node.getBoundingClientRect(),[x,y]=directions[event.key];bounds(r.left+x*(event.shiftKey?40:10),r.top+y*(event.shiftKey?40:10));}}
 function resize(){if(!desktop.matches)reset();else if(node.dataset.floating){const r=node.getBoundingClientRect();bounds(r.left,r.top);}}
 handle.addEventListener('pointerdown',down);handle.addEventListener('pointermove',move);handle.addEventListener('pointerup',stop);handle.addEventListener('pointercancel',stop);handle.addEventListener('lostpointercapture',stop);handle.addEventListener('keydown',key);window.addEventListener('resize',resize);
 const observer=new ResizeObserver(resize);observer.observe(node);
 return {reset,destroy(){reset();observer.disconnect();window.removeEventListener('resize',resize);handle.removeEventListener('pointerdown',down);handle.removeEventListener('pointermove',move);handle.removeEventListener('pointerup',stop);handle.removeEventListener('pointercancel',stop);handle.removeEventListener('lostpointercapture',stop);handle.removeEventListener('keydown',key);}};
}
