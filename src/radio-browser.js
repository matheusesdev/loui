const servers=['https://de1.api.radio-browser.info','https://de2.api.radio-browser.info'];
const cache=new Map();
export async function findStations(genre,{signal}={}){
 const tag=genre.trim().toLowerCase().slice(0,40);if(!tag)return [];
 if(cache.has(tag))return cache.get(tag);
 let lastError;
 for(const server of servers){
  try{
   const params=new URLSearchParams({tag,hidebroken:'true',is_https:'true',codec:'MP3',order:'votes',reverse:'true',limit:'16'});
   const response=await fetch(`${server}/json/stations/search?${params}`,{signal:AbortSignal.any([signal||new AbortController().signal,AbortSignal.timeout(8000)]),headers:{Accept:'application/json'}});
   if(!response.ok)throw Error('catalog');const data=await response.json();if(!Array.isArray(data))throw Error('catalog');
   const seen=new Set();const result=data.filter(item=>{try{const url=new URL(item.url_resolved);if(url.protocol!=='https:'||item.hls||!item.stationuuid||seen.has(url.href))return false;seen.add(url.href);return true;}catch{return false;}}).map(item=>({id:item.stationuuid,name:String(item.name).trim().slice(0,100),url:item.url_resolved,country:String(item.countrycode||''),homepage:safeUrl(item.homepage)}));
   cache.set(tag,result);return result;
  }catch(error){if(signal?.aborted)throw error;lastError=error;}
 }
 throw lastError;
}
export function safeUrl(value){try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}}
