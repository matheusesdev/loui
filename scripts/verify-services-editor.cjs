const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const base=process.env.SITE_URL||'http://127.0.0.1:4174';
 const directory=process.env.VERIFY_SCREENSHOT_DIR||'docs/validation/services-editor';
 fs.mkdirSync(directory,{recursive:true});
 try{for(const [width,height] of [[1440,900],[768,1024],[320,568],[844,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/#laboratorio');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  await page.locator('#intro').waitFor({state:'hidden'});
  assert.equal(await page.locator('#window-laboratorio').count(),0);
  assert.equal(await page.locator('[data-command="lab"]').count(),0);
  await page.locator('#window-servicos').waitFor({state:'visible'});
  assert.equal(new URL(page.url()).hash,'#servicos');
  assert.equal(await page.locator('#window-servicos .demo').count(),4);
  for(const theme of ['light','dark']){for(const lang of ['pt','en','es']){
   await chooseLanguage(page,'.workspace-tools',lang);
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.workspace-tools .theme-toggle').click();
   await page.locator('.service').first().locator('.workbench-start').click();
   const dialog=page.locator('.lab-workbench:visible');const field=dialog.locator('textarea');
   assert.ok(await field.isVisible());assert.equal(await dialog.locator('.safari-bar').count(),0);
   assert.equal(await dialog.locator('.editor-window-controls button').count(),3);
   assert.ok(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
   const rect=await field.boundingBox();assert.ok(rect.width>100&&rect.height>35);
   await dialog.locator('.guide-fill').click();const value=await field.inputValue();assert.ok(value.includes('computed'));
   await dialog.locator('.editor-maximize').click();assert.equal(await dialog.locator('.editor-maximize').getAttribute('aria-pressed'),'true');
   await dialog.locator('.editor-maximize').click();
   if(lang==='pt')await page.screenshot({path:`${directory}/editor-${width}-${theme}.png`});
   await dialog.locator('.editor-minimize').click();assert.ok(await page.locator('.service').first().locator('.workbench-start').evaluate(el=>el===document.activeElement));
   await page.locator('.service').first().locator('.workbench-start').click();assert.equal(await page.locator('.lab-workbench:visible textarea').inputValue(),value);
   await page.keyboard.press('Escape');
  }}
  for(let i=0;i<3;i++){
   const service=page.locator('.service').nth(i);if(i)await service.locator('summary').click();
   await service.locator('.workbench-start').click();const dialog=page.locator('.lab-workbench:visible');
   await dialog.locator('textarea').fill('invalid');await dialog.locator('.guide-run').click();assert.ok((await dialog.locator('.workbench-error').textContent()).length>0);
   await dialog.locator('.guide-fill').click();const popupPromise=page.waitForEvent('popup');await dialog.locator('.guide-run').click();const popup=await popupPromise;
   await popup.waitForLoadState();assert.ok(popup.url().includes('lab-preview.html'));await popup.close();
   await dialog.locator('.editor-close').click();
  }
  assert.deepEqual(errors,[]);console.log(`PASS ${width}x${height}: services, legacy route, 3 demos, preview, editor controls, persisted code, PT/EN/ES and themes`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
