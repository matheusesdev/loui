const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});const errors=[];fs.mkdirSync('docs/validation/radio-apple',{recursive:true});try{
 for(const [width,height]of [[1440,900],[320,568]])for(const theme of ['light','dark']){
  const p=await b.newPage({viewport:{width,height},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(t=>{localStorage.setItem('loui-theme',t);const Original=window.Audio;window.Audio=class extends Original{constructor(...args){super(...args);window.__radioAudio=this;}};},theme);
  await p.route('**/json/stations/search?**',r=>r.fulfill({json:[{stationuuid:'fixture',name:'Test station',url_resolved:'https://example.com/test.mp3',countrycode:'BR',homepage:'https://example.com/'}]}));
  await p.route('https://example.com/test.mp3',r=>r.fulfill({body:fs.readFileSync('public/audio/petrovenus-lofi.mp3'),contentType:'audio/mpeg'}));
  await p.goto(base+'/#inicio');await p.waitForFunction(()=>document.documentElement.dataset.ready==='true');await p.mouse.move(0,0);
  assert.notEqual(await p.locator('.radio-deck').evaluate(el=>getComputedStyle(el).backdropFilter),'none');assert.equal(await p.locator('#ambient-volume').evaluate(el=>getComputedStyle(el).borderBottomWidth),'0px');
  await p.locator('.radio-surface').screenshot({path:`docs/validation/radio-apple/final-compact-${width}-${theme}.png`});await p.locator('.radio-expand').click();await p.mouse.move(0,0);await p.locator('.radio-surface').screenshot({path:`docs/validation/radio-apple/final-expanded-${width}-${theme}.png`});
  await p.locator('.radio-skip').last().click();await p.waitForFunction(()=>window.__radioAudio.currentSrc.endsWith('perspective.mp3')&&!window.__radioAudio.paused);assert.equal(await p.locator('.radio-expand strong').innerText(),'Perspective');
  await p.locator('.radio-previous').click();await p.waitForFunction(()=>window.__radioAudio.currentSrc.endsWith('petrovenus-lofi.mp3')&&!window.__radioAudio.paused);assert.equal(await p.locator('.radio-expand strong').innerText(),'Lo-fi');
  await p.locator('#ambient-volume').fill('62');assert.equal(await p.evaluate(()=>window.__radioAudio.volume),.62);assert.equal(await p.locator('#ambient-volume').evaluate(el=>el.style.getPropertyValue('--radio-volume')),'62%');
  await p.locator('.radio-mode button').last().click();await p.locator('.radio-stations button').first().click();await p.waitForFunction(()=>!window.__radioAudio.paused&&window.__radioAudio.currentSrc.includes('example.com'));assert.equal(await p.locator('.radio-skip:disabled').count(),2);
  const cdp=await p.context().newCDPSession(p);await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-transparency',value:'reduce'}]});assert.equal(await p.locator('.radio-deck').evaluate(el=>getComputedStyle(el).backdropFilter),'none');
  await p.locator('.ambient-toggle').click();assert.ok(await p.evaluate(()=>window.__radioAudio.paused));console.log(`PASS Apple player ${width} ${theme}: real previous/next, stream fixture, volume fill, reduced transparency`);await p.close();
 }
 assert.deepEqual(errors,[]);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});
