const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
const artifacts=process.env.RADIO_VALIDATION_DIR||'docs/validation/radio-refined';
const station={stationuuid:'example-1',name:'Uma emissora com um nome muito longo para testar o espaço disponível sem esconder o conteúdo',url_resolved:'https://example.com/test.mp3',countrycode:'BR',homepage:'https://example.com/'};
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});const errors=[];fs.mkdirSync(artifacts,{recursive:true});try{
 for(const [width,height]of [[1440,900],[768,1024],[320,568],[844,390]]){
  const p=await b.newPage({viewport:{width,height},hasTouch:width<900,reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(()=>{const Original=window.Audio;window.Audio=class extends Original{constructor(...args){super(...args);window.__radioAudio=this;}};});
  await p.route('**/json/stations/search?**',r=>r.fulfill({json:[station]}));
  await p.goto(base+'/#inicio');await p.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  for(const theme of ['light','dark'])for(const lang of ['pt','en','es']){
   await chooseLanguage(p,'.header',lang);if(await p.locator('html').getAttribute('data-theme')!==theme)await p.locator('.header .theme-toggle').click();
   if(lang==='pt')await p.locator('.radio-surface').screenshot({path:`${artifacts}/compact-${width}-${theme}.png`});
   await p.locator('.radio-expand').click();await p.locator('#radio-details').waitFor({state:'visible'});
   const rect=await p.locator('.ambient-radio').boundingBox();assert.ok(rect.x>=0&&rect.y>=0&&rect.x+rect.width<=width+1&&rect.y+rect.height<=height+1,JSON.stringify({width,height,rect}));
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.equal(await p.locator('.radio-stations').evaluate(el=>getComputedStyle(el).overflowY),'visible');assert.equal(await p.locator('.radio-stations button').count(),5);
   if(lang==='pt')await p.locator('.radio-surface').screenshot({path:`${artifacts}/expanded-${width}-${theme}.png`});
   if(!await p.locator('.radio-credits').evaluate(el=>el.open))await p.locator('.radio-credits summary').click();assert.ok(await p.locator('.radio-credits').evaluate(el=>el.open));await p.locator('.radio-credits a').first().focus();await p.keyboard.press('Escape');assert.equal(await p.locator('#radio-details').isVisible(),false);assert.ok(await p.locator('.radio-expand').evaluate(el=>el===document.activeElement));await p.locator('.radio-credits').evaluate(el=>el.open=false);
   await p.locator('.radio-expand').click();await p.locator('.radio-collapse').click();assert.ok(await p.locator('.radio-expand').evaluate(el=>el===document.activeElement));
  }
  await p.locator('.ambient-toggle').click();await p.waitForFunction(()=>window.__radioAudio&&!window.__radioAudio.paused&&window.__radioAudio.currentTime>0);await p.locator('.radio-mute').click();assert.ok(await p.evaluate(()=>window.__radioAudio.muted));await p.locator('#ambient-volume').fill('62');assert.equal(await p.evaluate(()=>window.__radioAudio.volume),.62);await p.locator('.radio-mute').click();await p.locator('.ambient-toggle').click();assert.ok(await p.evaluate(()=>window.__radioAudio.paused));
  await p.locator('.radio-expand').click();await p.locator('.radio-mode button').last().click();await p.locator('.radio-stations button').first().waitFor();const long=p.locator('.radio-stations strong').first();assert.ok(await long.evaluate(el=>el.scrollWidth<=el.clientWidth+1));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.locator('.radio-surface').screenshot({path:`${artifacts}/online-${width}.png`});
  await p.locator('.radio-search input').fill('empty');await p.route('**/json/stations/search?**',r=>r.fulfill({json:[]}));await p.locator('.radio-search button').click();await p.waitForFunction(()=>document.querySelector('.radio-catalog-message').textContent.includes('No se encontraron'));
  await p.route('**/json/stations/search?**',r=>r.fulfill({status:503,body:'unavailable'}));await p.locator('.radio-search input').fill('failure');await p.locator('.radio-search button').click();await p.locator('.radio-retry').waitFor();await p.locator('.radio-surface').screenshot({path:`${artifacts}/error-${width}.png`});
  await p.locator('.radio-collapse').click();await p.locator('.radio-move').focus();await p.keyboard.press('ArrowUp');assert.equal(await p.locator('.ambient-radio').getAttribute('data-floating'),'true');await p.locator('.radio-reset-position').click();assert.equal(await p.locator('.ambient-radio').getAttribute('data-floating'),null);
  console.log(`PASS ${width}x${height}: PT/EN/ES, themes, bounds, single scroll, credits, collapse/focus, local audio, mute/volume, catalog fixtures, keyboard move/reset`);await p.close();
 }
 assert.deepEqual(errors,[]);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});
