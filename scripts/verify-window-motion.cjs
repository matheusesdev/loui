const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const errors=[];fs.mkdirSync('docs/validation/window-motion',{recursive:true});
 try{
  for(const [width,height]of [[1440,900],[768,1024],[320,568],[844,390]]){
   const page=await browser.newPage({viewport:{width,height},hasTouch:width<900});page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/#sobre');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
   const panel=page.locator('#window-sobre');
   const settle=()=>panel.evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished.catch(()=>{}))));
   const reopen=async()=>{await page.locator('#terminal-command').fill('sobre');await page.locator('#terminal-command').press('Enter');await settle();};
   await settle();
   for(const theme of ['light','dark'])for(const lang of ['pt','en','es']){
    await page.locator('.header .language-trigger').click();await page.locator(`.header [data-language="${lang}"]`).click();await page.waitForFunction(l=>document.documentElement.lang.startsWith(l)&&!document.documentElement.classList.contains('language-changing'),lang);await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    await page.waitForFunction(()=>[...document.querySelectorAll('.header .localized')].every(el=>['none','blur(0px)'].includes(getComputedStyle(el).filter)));
    await panel.locator('.window-minimize').click();
    await panel.evaluate(el=>{const a=el.getAnimations()[0];a.pause();a.currentTime=a.effect.getTiming().duration*.55;});
    assert.equal(await panel.getAttribute('data-window-exit'),'minimized');assert.ok(await panel.evaluate(el=>el.inert));
    assert.ok(await page.locator('#terminal-command').evaluate(el=>el===document.activeElement));
    if(lang==='pt')await page.screenshot({path:`docs/validation/window-motion/minimize-${width}-${theme}.png`});
    await panel.evaluate(el=>{const a=el.getAnimations()[0];a.currentTime=a.effect.getTiming().duration;});
    const distance=await panel.evaluate(el=>{const r=el.getBoundingClientRect(),t=document.querySelector('.terminal-return').getBoundingClientRect();return Math.hypot(r.x+r.width/2-t.x-t.width/2,r.y+r.height/2-t.y-t.height/2);});assert.ok(distance<2,'ends at Terminal');
    await panel.evaluate(el=>el.getAnimations()[0].finish());await panel.waitFor({state:'hidden'});
    await reopen();await panel.locator('.window-close').click();assert.equal(await panel.getAttribute('data-window-exit'),'closed');await panel.waitFor({state:'hidden'});
    await reopen();
   }
   // A pending close must not hide a window reopened through history.
   await panel.locator('.window-close').click();await page.goBack();await panel.waitFor({state:'visible'});await settle();assert.equal(await panel.getAttribute('data-window-exit'),null);assert.equal(await panel.evaluate(el=>el.inert),false);
   await panel.locator('.window-minimize').click();await page.setViewportSize({width:width+1,height});await panel.waitFor({state:'hidden'});await reopen();
   await panel.locator('.window-minimize').click();await page.emulateMedia({reducedMotion:'reduce'});await panel.waitFor({state:'hidden'});await reopen();await panel.locator('.window-minimize').click();assert.ok(await panel.evaluate(el=>el.hidden));assert.equal(await page.locator('.is-exiting').count(),0);await reopen();
   await page.keyboard.press('Escape');assert.ok(await panel.evaluate(el=>el.hidden));
   console.log(`PASS ${width}x${height}: target, minimize/close, PT/EN/ES, themes, interruption, resize, reduced motion, Escape, focus`);await page.close();
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
