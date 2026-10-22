let pending, attempts=0;
async function retryWorkbench() {
  if(import.meta.env.DEV)return import(/* @vite-ignore */ `/src/components/LabWorkbench.svelte?retry=${attempts}`);
  // Resolve the current build's hashed entry without caching a rejected import URL.
  const response=await fetch(`${import.meta.env.BASE_URL}.vite/manifest.json`,{cache:'no-store'});
  if(!response.ok)throw new Error('Editor unavailable');
  const manifest=await response.json();
  const entry=manifest['src/components/LabWorkbench.svelte'];
  if(!entry?.isDynamicEntry||!entry.file?.startsWith('assets/'))throw new Error('Editor unavailable');
  const url=new URL(import.meta.env.BASE_URL+entry.file,location.origin);
  url.searchParams.set('retry',String(attempts));
  return import(/* @vite-ignore */ url.href);
}
export function loadWorkbench() {
  if(pending)return pending;
  const load=attempts++===0?import('./components/LabWorkbench.svelte'):retryWorkbench();
  return pending = load.catch(error => {
    pending = undefined;
    throw error;
  });
}
