const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
fs.mkdirSync('docs/validation/guided-diagnosis',{recursive:true});
try{
 for(const [width,height] of [[1440,900],[768,1024],[320,568],[844,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url());});
  await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{if(window.__denyCopy)throw Error('denied');window.__copied=text;}}}));
  await page.goto(base+'/#diagnostico');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  const panel=page.locator('#window-diagnostico');await panel.waitFor({state:'visible'});
  const complete=async index=>{await panel.locator('input[type=radio]').nth(index).check();await panel.locator('.diagnosis-next').click();await panel.locator('.diagnosis-next').click();await panel.locator('.diagnosis-next').click();await panel.locator('#diagnosis-brief').waitFor();};
  const restart=async()=>{await panel.locator('.diagnosis-restart').click();await panel.locator('.diagnosis-confirm button').first().click();};
  for(const lang of ['pt','en','es'])for(const theme of ['light','dark']){
   await panel.locator('.window-close').click();await chooseLanguage(page,'.workspace-tools',lang);
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.workspace-tools .theme-toggle').click();
   await page.locator('#terminal-command').fill(lang==='en'?'diagnosis':'diagnostico');await page.locator('#terminal-command').press('Enter');
   assert.ok(await panel.locator('.diagnosis-next').isDisabled());
   await panel.locator('input[type=radio]').first().focus();await page.keyboard.press('Space');await panel.locator('.diagnosis-next').click();
   assert.ok(await panel.locator('#diagnosis-heading').evaluate(el=>el===document.activeElement));
   await panel.locator('textarea').fill('Current process');await panel.locator('.diagnosis-next').click();await panel.locator('textarea').fill('Expected result');await panel.locator('.diagnosis-next').click();
   assert.ok((await panel.locator('#diagnosis-brief').inputValue()).includes('Current process'));
   await panel.locator('#diagnosis-brief').fill('My edited briefing');
   await panel.locator('.window-minimize').click();await page.locator('#terminal-command').fill('diagnostico');await page.locator('#terminal-command').press('Enter');assert.equal(await panel.locator('#diagnosis-brief').inputValue(),'My edited briefing');
   await panel.locator('.diagnosis-actions button').first().click();assert.equal(await page.evaluate(()=>window.__copied),'My edited briefing');
   await panel.locator('.diagnosis-restart').click();await panel.locator('.diagnosis-confirm button').last().click();assert.equal(await panel.locator('#diagnosis-brief').inputValue(),'My edited briefing');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   if(lang==='pt')await page.screenshot({path:`docs/validation/guided-diagnosis/result-${width}-${theme}.png`});
   await restart();
  }
  for(let index=0;index<4;index++){
   await complete(index);assert.ok((await panel.locator('.diagnosis-recommendation').textContent()).length>3);
   await panel.locator('.diagnosis-demo').click();await page.locator('#window-servicos').waitFor({state:'visible'});
   if(index<3){await page.locator('.lab-workbench:visible').waitFor();await page.keyboard.press('Escape');}
   else assert.equal(await page.locator('.service').nth(3).getAttribute('open')!==null,true);
   await page.locator('#window-servicos .window-close').click();await panel.waitFor({state:'visible'});await restart();
  }
  await complete(1);await panel.locator('#diagnosis-brief').fill('First brief');
  await page.evaluate(()=>window.__denyCopy=true);await panel.locator('.diagnosis-actions button').first().click();assert.ok(await panel.locator('#diagnosis-brief').evaluate(el=>el===document.activeElement&&el.selectionStart===0&&el.selectionEnd===el.value.length));
  await panel.locator('.diagnosis-actions button').last().click();const contact=page.locator('#window-contato');await contact.waitFor({state:'visible'});assert.equal(await contact.locator('#contact-message').inputValue(),'First brief');
  await contact.locator('#contact-name').fill('Ana');await contact.locator('#contact-message').fill('Original message');await contact.locator('.window-close').click();
  await panel.locator('#diagnosis-brief').fill('New brief');await panel.locator('.diagnosis-actions button').last().click();assert.equal(await contact.locator('#contact-message').inputValue(),'Original message');assert.equal(await contact.locator('#contact-name').inputValue(),'Ana');
  await contact.locator('.diagnosis-keep').click();assert.equal(await contact.locator('#contact-message').inputValue(),'Original message');await contact.locator('.window-close').click();
  await panel.locator('.diagnosis-actions button').last().click();await contact.locator('.diagnosis-append').click();assert.equal(await contact.locator('#contact-message').inputValue(),'Original message\n\nNew brief');await contact.locator('.window-close').click();
  await panel.locator('.diagnosis-actions button').last().click();assert.equal(await contact.locator('#contact-message').inputValue(),'Original message\n\nNew brief');assert.equal(await contact.locator('.diagnosis-contact-pending').count(),0);
  await contact.locator('#contact-message').fill('x'.repeat(1999));await contact.locator('.window-close').click();await panel.locator('#diagnosis-brief').fill('Overflow');await panel.locator('.diagnosis-actions button').last().click();await contact.locator('.diagnosis-append').click();assert.equal((await contact.locator('#contact-message').inputValue()).length,1999);assert.ok((await contact.locator('.diagnosis-contact-feedback').textContent()).includes('2.000'));
  await contact.locator('#contact-message').fill('Short');await contact.locator('.diagnosis-append').click();assert.equal(await contact.locator('#contact-message').inputValue(),'Short\n\nOverflow');
  await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.locator('#window-contato .window-close').click();await page.locator('#terminal-command').fill('diagnostico');await page.locator('#terminal-command').press('Enter');assert.equal(await panel.locator('input:checked').count(),0);
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);console.log(`PASS ${width}x${height}: 6 locale/theme flows, keyboard, preserve/reset, 4 demos, copy fallback, append/keep/deduplicate/overflow, reload and no external requests`);await page.close();
 }
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exit(1)});
