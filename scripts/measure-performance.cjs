const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs');
const {gzipSync}=require('node:zlib');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const runs=[];
 try{for(let run=0;run<3;run++){
  const context=await browser.newContext({viewport:{width:1348,height:591},reducedMotion:'reduce'});
  const page=await context.newPage();const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await page.goto(process.env.SITE_URL||'http://127.0.0.1:4174');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.evaluate(()=>document.fonts.ready);await page.waitForLoadState('networkidle');
  runs.push(await page.evaluate(()=>{
   const resources=performance.getEntriesByType('resource').map(({name,decodedBodySize,encodedBodySize,initiatorType})=>({path:new URL(name).pathname,decodedBodySize,encodedBodySize,initiatorType}));
   return {resources,scriptBytes:resources.filter(r=>r.path.endsWith('.js')).reduce((n,r)=>n+r.decodedBodySize,0),fontBytes:resources.filter(r=>/\.(ttf|woff2)$/.test(r.path)).reduce((n,r)=>n+r.decodedBodySize,0),elements:document.querySelectorAll('*').length,editors:document.querySelectorAll('.lab-workbench').length};
  }));await context.close();
 }
 const artifacts=fs.readdirSync('dist/assets').filter(name=>/\.(js|css|ttf|woff2)$/.test(name)).map(name=>{const data=fs.readFileSync('dist/assets/'+name);return {name,bytes:data.length,gzipBytes:gzipSync(data).length};});
 const label=process.env.MEASURE_LABEL||'after';fs.mkdirSync('docs/validation/performance',{recursive:true});fs.writeFileSync(`docs/validation/performance/${label}.json`,JSON.stringify({label,method:'3 cold Chrome contexts, cache disabled, local production build, no network or CPU throttling. Resource bytes and DOM counts; not field Core Web Vitals.',runs,artifacts},null,2)+'\n');console.log(JSON.stringify({label,runs:runs.map(({resources,...totals})=>totals)},null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
