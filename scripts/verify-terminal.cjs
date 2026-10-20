const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce',colorScheme:'dark'});const errors=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.SITE_URL||'http://127.0.0.1:5173';await page.goto(base);await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.locator('#enter').click();
 assert.equal(await page.locator('.workspace-apps').count(),0);assert.equal(await page.locator('#terminal-command').isVisible(),true);assert.equal(await page.locator('.ambient-radio').isVisible(),true);
 await page.screenshot({path:'docs/validation/terminal-home-dark.png'});
 for(const id of ['servicos','stacks','projetos','contato','lab','sobre']){
  await page.locator(`[data-command="${id}"]`).click();assert.equal(await page.locator(`#window-${id==='lab'?'laboratorio':id}`).isVisible(),true);
  await page.locator('.terminal-return').click();assert.equal(await page.locator('.workspace-window:visible').count(),0);
 }
 checks.push('PASS terminal home, six suggested commands, return, no dock');
 const input=page.locator('#terminal-command');await input.click();assert.equal(await input.evaluate(el=>getComputedStyle(el).outlineStyle),'none');assert.notEqual(await page.locator('.workspace-terminal').evaluate(el=>getComputedStyle(el).boxShadow),'none');await input.fill('');await page.screenshot({path:'docs/validation/terminal-focused.png'});await input.fill('stacks');await input.press('Enter');
 assert.equal(await page.locator('.stack-list img').evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0&&getComputedStyle(image).filter==='none')),true);
 await page.locator('#window-stacks .window-close').click();assert.equal(await input.evaluate(el=>el===document.activeElement),true);
 await input.fill('<img src=x onerror=alert(1)>');await input.press('Enter');assert.equal(await page.locator('.terminal-output img').count(),0);
 await input.fill('help');await input.press('Enter');assert.match(await page.locator('.terminal-output').textContent(),/stacks/);await page.keyboard.press('ArrowUp');assert.equal(await input.inputValue(),'help');
 checks.push('PASS typed commands, focus, history, safe output and original logos without filters');
 await chooseLanguage(page,'.header','en');assert.match(await page.locator('.terminal-question').textContent(),/What shall/);
 await chooseLanguage(page,'.header','es');assert.match(await page.locator('.terminal-question').textContent(),/explorar/);await page.locator('.header .theme-toggle').click();
 await page.screenshot({path:'docs/validation/terminal-home-light-es.png'});
 await page.locator('.ambient-toggle').click();await page.waitForFunction(()=>!document.querySelector('.radio-audio').paused&&document.querySelector('.radio-audio').currentTime>0);
 await page.locator('[data-command="stacks"]').click();assert.equal(await page.locator('.radio-audio').evaluate(a=>a.paused),false);
 await page.locator('.radio-expand').click();assert.equal(await page.locator('#radio-details').isVisible(),true);await page.locator('.radio-credits summary').click();assert.equal(await page.locator('.radio-credits a').count(),10);
 await page.locator('.ambient-toggle').click();assert.equal(await page.locator('.radio-audio').evaluate(a=>a.paused),true);await page.locator('.radio-expand').click();await page.locator('.terminal-return').click();
 checks.push('PASS PT/EN/ES, light theme, floating audio playback persists and expandable credits');
 for(const [width,height]of [[360,800],[390,844],[768,1024],[1024,768],[844,390],[720,500]]){
  await page.setViewportSize({width,height});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.locator('[data-command="stacks"]').click();const panel=await page.locator('#window-stacks').boundingBox(),radio=await page.locator('.ambient-radio').boundingBox();assert.ok(panel.y+panel.height<=radio.y+1,JSON.stringify({width,height,panel,radio}));
  await page.locator('#window-stacks .window-close').click();
 }
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'docs/validation/terminal-mobile.png'});
 checks.push('PASS six sizes, landscape, content windows do not overlap compact radio');
 await page.goto(base+'/#stacks');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');assert.equal(await page.locator('#window-stacks').isVisible(),true);assert.equal(await page.locator('#intro').evaluate(d=>d.open),false);
 assert.deepEqual(errors,[]);const result={checks,errors};fs.writeFileSync('docs/validation/terminal-results.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
