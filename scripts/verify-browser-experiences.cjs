const playwright=require(process.env.PLAYWRIGHT_PATH||'playwright');const assert=require('node:assert/strict');const fs=require('node:fs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
(async()=>{const results=[],directory='docs/validation/browser-compatibility';fs.mkdirSync(directory,{recursive:true});
 for(const engine of ['chromium','firefox','webkit']){
  const executable=engine==='chromium'?process.env.BROWSER_PATH:playwright[engine].executablePath();
  const browser=await playwright[engine].launch({headless:true,...(executable?{executablePath:executable}:{})});
  try{for(const [width,height] of [[1440,900],[390,844]]){
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>{const Original=window.Audio;window.Audio=class extends Original{constructor(...args){super(...args);window.__radioAudio=this;}};});
   await page.goto(base+'/#servicos');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');assert.equal(await page.locator('.lab-workbench').count(),0);
   if(width<768){
    assert.equal(await page.locator('.phone-app').count(),1);
    for(let index=0;index<3;index++){
     await page.goto(`${base}/#projetos/${index}`);await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
     const launch=page.locator('.phone-primary.demo-action');await launch.waitFor();
     const popupPromise=page.waitForEvent('popup');await launch.click();const popup=await popupPromise;popup.on('pageerror',e=>errors.push(e.message));
     await popup.locator(index===0?'.booking-app':'.process-simulation').waitFor();
     assert.ok(await popup.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await popup.close();
    }
    await page.screenshot({path:`${directory}/${engine}-${width}.png`});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
    results.push({engine,version:browser.version(),width,height,editors:0,previews:3,actualLocalAudio:false,status:'passed'});
    console.log(`PASS ${engine} ${width}: native mobile navigation, 3 actual previews, and layout`);await page.close();continue;
   }
   for(let index=0;index<3;index++){
    const service=page.locator('.service').nth(index);if(await service.getAttribute('open')===null)await service.locator('summary').click();
    await service.locator('.workbench-start').click();const dialog=page.locator('.lab-workbench:visible');await dialog.waitFor();
    await dialog.locator('.guide-fill').click();const value=await dialog.locator('textarea').inputValue();assert.ok(value.length>10);
    if(index===0)await page.screenshot({path:`${directory}/editor-${engine}-${width}.png`});
    const popupPromise=page.waitForEvent('popup');await dialog.locator('.guide-run').click();const popup=await popupPromise;popup.on('pageerror',e=>errors.push(e.message));
    await popup.locator('.reveal-continue').click();await popup.locator(index===0?'.booking-app':'.process-simulation').waitFor();assert.ok(await popup.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await popup.close();
    await dialog.locator('.external-preview-ready button').click();
    await dialog.locator('.editor-minimize').click();await service.locator('.workbench-start').click();assert.equal(await page.locator('.lab-workbench:visible textarea').inputValue(),value);await page.keyboard.press('Escape');
   }
   await page.locator('#window-servicos .window-close').click();
   await page.locator('.radio-expand').click();await page.locator('#radio-details').waitFor({state:'visible'});
   const volume=page.locator('#ambient-volume');const before=Number(await volume.inputValue());await volume.focus();await volume.press('ArrowLeft');assert.equal(Number(await volume.inputValue()),before-1);
   await page.locator('.ambient-toggle').click();await page.waitForFunction(()=>window.__radioAudio?.readyState>=3&&!window.__radioAudio.paused,{},{timeout:15000});
   assert.ok(await page.evaluate(()=>window.__radioAudio.currentTime>=0));await page.locator('.radio-mute').click();assert.ok(await page.evaluate(()=>window.__radioAudio.muted));await page.locator('.ambient-toggle').click();assert.ok(await page.evaluate(()=>window.__radioAudio.paused));
   await page.locator('.radio-collapse').click();assert.equal(await page.locator('.radio-expand').getAttribute('aria-expanded'),'false');
   assert.deepEqual(errors,[]);results.push({engine,version:browser.version(),width,height,editors:3,previews:3,actualLocalAudio:true,status:'passed'});console.log(`PASS ${engine} ${width}: 3 lazy editors, actual previews, preserved code, local MP3, keyboard volume, mute and radio collapse`);await page.close();
  }}finally{await browser.close();}
 }
 fs.writeFileSync(directory+'/experiences.json',JSON.stringify(results,null,2)+'\n');
})().catch(error=>{console.error(error);process.exit(1)});
