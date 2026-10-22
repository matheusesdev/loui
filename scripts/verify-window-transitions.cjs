const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});const errors=[];
 fs.mkdirSync('docs/validation/window-motion/transitions',{recursive:true});
 try{
  for(const [width,height]of [[1440,900],[768,1024],[320,568],[844,390]]){
   const page=await browser.newPage({viewport:{width,height},hasTouch:width<900});page.on('pageerror',e=>errors.push(e.message));await page.goto((process.env.SITE_URL||'http://127.0.0.1:4174')+'/#inicio');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
   const panel=page.locator('#window-sobre');
   const settle=()=>panel.evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished.catch(()=>{}))));
   const open=async()=>{await page.locator('#terminal-command').fill('sobre');await page.locator('#terminal-command').press('Enter');};
   for(const theme of ['light','dark'])for(const lang of ['pt','en','es']){
    await chooseLanguage(page,'.header',lang);await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    await page.waitForFunction(()=>[...document.querySelectorAll('.header .localized')].every(el=>['none','blur(0px)'].includes(getComputedStyle(el).filter)));
    await open();assert.equal(await panel.getAttribute('data-window-motion'),'opening');
    const startDistance=await panel.evaluate(el=>{const a=el.getAnimations()[0];a.pause();a.currentTime=0;const r=el.getBoundingClientRect(),t=document.querySelector('.terminal-return').getBoundingClientRect();return Math.hypot(r.x+r.width/2-t.x-t.width/2,r.y+r.height/2-t.y-t.height/2);});assert.ok(startDistance<2);
    await panel.evaluate(el=>{const a=el.getAnimations()[0];a.currentTime=a.effect.getTiming().duration*.6;});
    if(lang==='pt')await page.screenshot({path:`docs/validation/window-motion/transitions/open-${width}-${theme}.png`});
    await panel.evaluate(el=>el.getAnimations()[0].finish());await settle();assert.ok(await panel.locator('.window-close').evaluate(el=>el===document.activeElement));
    if(width>=900){
     const before=await panel.boundingBox();await panel.locator('.window-maximize').click();assert.equal(await panel.getAttribute('data-window-motion'),'resizing');await settle();const maximized=await panel.boundingBox();assert.ok(maximized.width>before.width);
     await page.screenshot({path:`docs/validation/window-motion/transitions/maximized-${theme}-${lang}.png`});
     await panel.locator('.window-maximize').click();await settle();const after=await panel.boundingBox();for(const key of ['x','y','width','height'])assert.ok(Math.abs(before[key]-after[key])<1,`restores ${key}`);
     // Repeated maximize/restore while the previous transition is still running.
     await panel.evaluate(el=>{el.querySelector('.window-maximize').click();const a=el.getAnimations()[0];a.pause();a.currentTime=140;el.querySelector('.window-maximize').click();});await settle();assert.ok(!await panel.evaluate(el=>el.classList.contains('is-maximized')));
    }
    await panel.locator('.window-minimize').click();await page.goBack();await settle();assert.ok(await panel.isVisible());assert.equal(await panel.getAttribute('data-window-motion'),null);
    await page.keyboard.press('Escape');await panel.waitFor({state:'hidden'});
   }
   // Closing during entry, resizing during entry, and a live reduced-motion switch.
   await open();await page.keyboard.press('Escape');await panel.waitFor({state:'hidden'});
   await open();await page.setViewportSize({width:width+1,height});await settle();assert.ok(await panel.isVisible());
   await panel.locator('.window-minimize').click();await panel.waitFor({state:'hidden'});await open();await page.emulateMedia({reducedMotion:'reduce'});await settle();assert.ok(await panel.isVisible());assert.equal(await panel.getAttribute('data-window-motion'),null);
   await page.keyboard.press('Escape');await panel.waitFor({state:'hidden'});await open();assert.equal(await panel.getAttribute('data-window-motion'),null);assert.ok(await panel.isVisible());
   if(width>=900){await panel.locator('.window-maximize').click();assert.equal(await panel.getAttribute('data-window-motion'),null);}
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));console.log(`PASS ${width}x${height}: command entry, inverse target, maximize/restore where available, rapid actions, PT/EN/ES, themes, reduced motion`);await page.close();
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
