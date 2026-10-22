const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {chooseLanguage}=require('./browser-helpers.cjs');
const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));
const headers=Object.fromEntries(config.headers[0].headers.map(({key,value})=>[key,value]));
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf','.mp3':'audio/mpeg'};
const directory=process.env.SECURITY_VALIDATION_DIR||'docs/validation/security';fs.mkdirSync(directory,{recursive:true});
// Serve the production artifact with the actual configured response headers.
const root=path.resolve('dist');
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html'));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end();}
 res.writeHead(200,{...headers,'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH,args:['--autoplay-policy=no-user-gesture-required']});
 const errors=[],violations=[],requests=[],results=[];
 try{
  const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1348,height:591}});
  await context.addInitScript(()=>document.addEventListener('securitypolicyviolation',event=>console.info('CSP_TEST:'+event.effectiveDirective)));
  context.on('page',page=>{page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.text().startsWith('CSP_TEST:'))violations.push(m.text().slice(9));});});
  context.on('request',req=>{if(!req.url().startsWith(base))requests.push(req.url());});
  await context.route('https://*.api.radio-browser.info/**',route=>{
   if(route.request().url().includes('de1.'))return route.fulfill({status:503,headers:{'Access-Control-Allow-Origin':'*'},body:'offline'});
   return route.fulfill({headers:{'Access-Control-Allow-Origin':'*'},json:[{stationuuid:'fixture',name:'Emissora <teste>',url_resolved:'https://stream.example.test/audio.mp3',countrycode:'BR',homepage:'https://example.test/'}]});
  });
  await context.route('https://stream.example.test/**',route=>route.fulfill({path:'public/audio/petrovenus-lofi.mp3',contentType:'audio/mpeg',headers:{'Access-Control-Allow-Origin':'*'}}));
  const page=await context.newPage();const response=await page.goto(base+'/#contato');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  for(const [key,value]of Object.entries(headers))assert.equal(response.headers()[key.toLowerCase()],value);
  assert.deepEqual(requests,[],'opening must not contact external services');
  for(const theme of ['light','dark']){
   await page.evaluate(theme=>localStorage.setItem('loui-theme',theme),theme);await page.goto('about:blank');await page.goto(base+'/#contato');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
   await page.locator('#window-contato .window-close').click();
   assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
   for(const language of ['pt','en','es']){
    await chooseLanguage(page,'.workspace-tools',language);
    await page.locator('[data-command="contato"]').click();await page.locator('.compose-send').click();await page.waitForFunction(()=>document.activeElement.id==='contact-name');
    assert.equal(await page.locator('.contact-field-error').count(),2);
    await page.locator('#window-contato .window-close').click();
    for(const [width,height]of [[1348,591],[320,480],[844,390]]){
     await page.setViewportSize({width,height});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    }
    results.push({theme,language,contact:true,viewports:3});
   }
   await page.setViewportSize({width:1348,height:591});await page.screenshot({path:`${directory}/home-${theme}.png`});
  }
  await page.locator('.radio-expand').click();await page.locator('.radio-mode button').nth(1).click();
  await page.locator('.radio-stations strong').filter({hasText:'Emissora <teste>'}).waitFor();
  assert.equal(await page.locator('.radio-stations strong script').count(),0);
  await page.locator('.radio-stations button').first().click();await page.locator('.radio-meter.playing').waitFor();
  assert.ok(requests.some(url=>url.includes('de1.'))&&requests.some(url=>url.includes('de2.')),'fallback catalog');
  assert.ok(requests.some(url=>url.startsWith('https://stream.example.test/')),'HTTPS media permitted');
  await page.locator('.ambient-toggle').click();
  await page.locator('.radio-mode button').first().click();await page.locator('.radio-stations button').first().click();await page.locator('.radio-meter.playing').waitFor();await page.locator('.ambient-toggle').click();
  const {snippets}=await import('../src/lab-code.js');
  for(const theme of ['light','dark'])for(const language of ['pt','en','es'])for(let index=0;index<3;index++){
   await page.evaluate(theme=>localStorage.setItem('loui-theme',theme),theme);
   const preview=await context.newPage();await preview.goto(base+'/lab-preview.html#'+encodeURIComponent(JSON.stringify({index,language,code:snippets[index]})));
   await preview.locator('.reveal-continue').click();
   if(index===0){await preview.locator('#booking-hours').fill('4');assert.ok(await preview.locator('.booking-total>strong').textContent());}
   else{for(let step=0;step<4;step++)await preview.locator('.simulation-next').click();assert.equal(await preview.locator('.process-simulation').getAttribute('data-step'),'4');}
   if(language==='pt')await preview.screenshot({path:`${directory}/preview-${index}-${theme}.png`});
   await preview.close();
  }
  const intro=await context.newPage();await intro.goto(base);await intro.locator('#intro[open]').waitFor();await intro.keyboard.press('Escape');await intro.waitForFunction(()=>!document.querySelector('#intro').open);await intro.close();
  const literal=await context.newPage();await literal.goto(base+'/lab-preview.html#'+encodeURIComponent(JSON.stringify({index:1,language:'pt',code:JSON.stringify({request:'<script>window.__payload=true</script>',priority:'alta',action:'responder'})})));await literal.locator('.reveal-continue').click();assert.equal(await literal.locator('.process-simulation script').count(),0);assert.equal(await literal.evaluate(()=>window.__payload),undefined);await literal.close();
  assert.deepEqual(errors,[]);assert.deepEqual(violations,[],'legitimate flows must not violate CSP');
  await page.evaluate(()=>{const script=document.createElement('script');script.textContent='window.__injected=true';document.body.append(script);});
  await page.waitForFunction(()=>!window.__injected);assert.equal(await page.evaluate(()=>window.__injected),undefined);
  assert.equal(await page.evaluate(async()=>{try{await fetch('https://unapproved.example.test/');return false;}catch{return true;}}),true);
  await page.waitForFunction(()=>true);assert.ok(violations.includes('script-src-elem'));assert.ok(violations.includes('connect-src'));
  const invalid=await context.newPage();await invalid.goto(base+'/lab-preview.html#'+encodeURIComponent(JSON.stringify({index:0,language:'pt',code:'alert(document.cookie)'})));await invalid.locator('.preview-error').waitFor();await invalid.close();
  fs.writeFileSync(`${directory}/results.json`,JSON.stringify({contact:results,previewScenarios:18,headers,unexpectedRuntimeErrors:errors,expectedBlockedDirectives:violations,externalRequests:requests,realMessagesSent:false,radioFixtures:true},null,2)+'\n');
  console.log('PASS security: enforced headers, 6 contact combinations, 18 previews, themes, layouts, catalog fallback, actual local/fixture media playback, inline script and unapproved fetch blocked.');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
