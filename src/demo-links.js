import {snippets} from './lab-code.js';
export function demoUrl(index,language='pt'){
 const url=new URL('/lab-preview.html',location.origin);
 url.hash=encodeURIComponent(JSON.stringify({index,language,code:snippets[index],direct:true}));
 return url.href;
}
