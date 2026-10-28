const names=['Luz','Atende','Sincronia'];
const labels={pt:['Escolher sessão e horário','Acompanhar atendimento','Mapear dados do pedido'],en:['Choose a session and time','Follow a conversation','Map the order fields'],es:['Elegir sesión y horario','Seguir una conversación','Relacionar datos del pedido']};
const paths=['M4 5h16v16H4ZM4 10h16M8 3v4M16 3v4M8 14h2m4 0h2m-8 3h2','M4 4h16v12H9l-5 5ZM8 8h8m-8 4h5','M3 5h6v6H3ZM15 13h6v6h-6ZM9 8h8v5M6 11v6h9'];
export function projectPreview(id,language='pt'){
 return `/public/images/studies/${id}${language==='en'||language==='es'?'-'+language:''}.png`;
}
export function demoActionLabel(index,language='pt'){return (labels[language]||labels.pt)[index];}
// All markup comes from the fixed dictionaries above, never from user content or editable code.
export function demoActionMarkup(index,language='pt'){
 const newTab=language==='en'?'Opens in another tab':language==='es'?'Abre en otra pestaña':'Abre em outra aba';
 return `<span class="demo-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${paths[index]}"/></svg></span><span class="demo-action-copy"><strong class="localized">${demoActionLabel(index,language)}</strong><small translate="no">${names[index]}</small></span><svg class="demo-action-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg><span class="sr-only">. ${newTab}</span>`;
}
