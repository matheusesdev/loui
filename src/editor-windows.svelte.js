// The dock and editors share state; DOM and callbacks stay with each window owner.
export const editorWindows=$state({items:[],activeId:null});
let sequence=0;
export const nextDockOrder=()=>++sequence;
export function registerEditor(index,actions){
 const id=`editor-${index}`;
 const item={id,index,title:['Luz','Atende','Sincronia'][index],status:'closed',dockOrder:0,...actions};
 editorWindows.items.push(item);
 return ()=>{editorWindows.items=editorWindows.items.filter(entry=>entry.id!==id);if(editorWindows.activeId===id)editorWindows.activeId=null;};
}
export function setEditorState(index,status){
 const item=editorWindows.items.find(entry=>entry.index===index);if(!item)return;
 if(status==='open'&&item.status==='closed')item.dockOrder=nextDockOrder();
 item.status=status;
 if(status==='open')editorWindows.activeId=item.id;else if(editorWindows.activeId===item.id)editorWindows.activeId=null;
 document.dispatchEvent(new Event('editorwindowchange'));
}
