const {chooseLanguage:choose}=require('./browser-helpers.cjs');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',colorScheme:'dark'});
 const page=await context.newPage();const errors=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.SITE_URL||'http://127.0.0.1:4173';
 const tags={pt:'pt-BR',en:'en',es:'es'};
 for(const width of [360,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  for(const lang of ['pt','en','es']){
   await page.goto(base);
   await choose(page,'#intro',lang);
   assert.equal(await page.locator('html').getAttribute('lang'),tags[lang]);
   assert.equal(await page.locator('#intro').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
   await page.locator('#enter').click();
   for(const theme of ['dark','light']){
    if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.header .theme-toggle').click();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${width} ${lang} ${theme} overflow`);
   }
   checks.push(`PASS ${width}px ${lang}: localized intro/page, both themes, no overflow`);
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 await choose(page,'.header','en');
 assert.match(await page.title(),/Development/);
 assert.equal(await page.locator('#email').getAttribute('placeholder'),'So we can keep talking');
 assert.match(await page.locator('.header .theme-toggle').getAttribute('aria-label'),/theme/);
 assert.equal(await page.locator('#form-status').textContent(),'The form will be available when our contact channels open.');
 checks.push('PASS English title, placeholders, theme accessible name and disabled form text');
 await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'en');
 assert.equal(await page.locator('#intro .language-code').textContent(),'EN');
 await page.locator('#enter').click();
 checks.push('PASS language persisted and selectors synchronized');
 for(let i=0;i<4;i++){
  const service=page.locator('.service').nth(i);await service.evaluate(e=>e.open=true);
  const button=service.locator('.demo-button');await button.focus();await page.keyboard.press('Enter');
  assert.equal(await service.locator('.demo').evaluate(e=>e.classList.contains('complete')),true);
  assert.ok((await service.locator('.demo-status').textContent()).length>0);
  await service.locator('.demo-reset').click();assert.equal(await service.locator('.demo').evaluate(e=>e.classList.contains('complete')),false);await button.click();
 }
 checks.push('PASS all four demos: keyboard, repeat, completion state in reduced motion');
 await choose(page,'.header','es');
 assert.equal(await page.locator('.demo').nth(3).locator('.demo-status').textContent(),'Camino definido.');
 assert.equal(await page.locator('.demo').nth(1).locator('.node-label').first().textContent(),'Solicitud');
 checks.push('PASS completed demo statuses and visual labels translated');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await choose(page,'.header','en',false);
 assert.equal(await page.locator('html').evaluate(e=>e.classList.contains('language-changing')),true);
 await page.waitForFunction(()=>document.documentElement.lang==='en'&&!document.documentElement.classList.contains('language-changing'));
 await page.evaluate(async()=>{const {setLanguage}=await import('/src/i18n.js');setLanguage('es');setLanguage('en');setLanguage('pt');});
 await page.waitForFunction(()=>document.documentElement.lang==='pt-BR'&&!document.documentElement.classList.contains('language-changing'));
 checks.push('PASS blur transition and rapid switching: final selection wins');
 await page.locator('.service').nth(2).evaluate(e=>e.open=true);
 if(await page.locator('.demo').nth(2).evaluate(e=>e.classList.contains('complete')||e.classList.contains('running')))await page.locator('.service').nth(2).locator('.demo-reset').click();
 await page.locator('.service').nth(2).locator('.demo-button').click();
 await page.waitForFunction(()=>document.querySelectorAll('.demo')[2].classList.contains('complete'));
 checks.push('PASS animated integration demo completes');
 await page.goto(base);await page.mouse.move(100,300);await page.mouse.move(1000,400);
 assert.notEqual(await page.locator('.intro-scene').evaluate(e=>e.style.getPropertyValue('--type-x')),'');
 await page.locator('#enter').click();await page.locator('#intro').waitFor({state:'hidden'});
 assert.equal(await page.locator('.hero').evaluate(e=>e.classList.contains('arrived')),true);
 checks.push('PASS reactive introduction and converging entry to hero');
 const mobile=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
 const touch=await mobile.newPage();await touch.goto(base);await choose(touch,'#intro','en');await touch.locator('#enter').tap();await touch.locator('.demo-button').first().tap();
 assert.equal(await touch.locator('.demo').first().evaluate(e=>e.classList.contains('complete')),true);
 checks.push('PASS touch: language, entry and demo');
 await touch.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await touch.screenshot({path:'docs/validation/experience-mobile-en.png',fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'/#servicos');await choose(page,'.header','en');
 await page.locator('.demo-button').first().click();await page.locator('#servicos').scrollIntoViewIfNeeded();
 await page.screenshot({path:'docs/validation/experience-desktop-en.png'});
 await page.locator('.demo').first().screenshot({path:'docs/validation/demo-complete-en.png'});
 const blocked=await browser.newContext({reducedMotion:'reduce'});await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('blocked')}})});
 const restricted=await blocked.newPage();await restricted.goto(base);await choose(restricted,'#intro','es');assert.equal(await restricted.locator('html').getAttribute('lang'),'es');
 checks.push('PASS language switching with blocked storage');
 assert.deepEqual(errors,[]);
 const report={date:'2026-10-20',checks,errors};fs.writeFileSync('docs/validation/experience-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
