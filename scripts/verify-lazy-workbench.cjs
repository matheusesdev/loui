const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const base=process.env.SITE_URL||'http://127.0.0.1:4174';
 fs.mkdirSync('docs/validation/performance',{recursive:true});
 try{
  for(const [width,height] of [[1440,900],[768,1024],[320,568],[844,390]]){
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[],chunks=[];
   page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/\/LabWorkbench-/.test(r.url()))chunks.push(r.url());});
   await page.goto(base+'/#servicos');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
   assert.equal(await page.locator('.lab-workbench').count(),0);assert.equal(chunks.length,0);
   for(const lang of ['pt','en','es'])for(const theme of ['light','dark']){
    await page.locator('#window-servicos .window-close').click();await chooseLanguage(page,'.workspace-tools',lang);if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.workspace-tools .theme-toggle').click();
    await page.locator('[data-command=servicos]').click();const start=page.locator('.service').first().locator('.workbench-start');await start.click();
    const dialog=page.locator('.lab-workbench:visible');await dialog.waitFor();await dialog.locator('.guide-fill').click();
    const code=await dialog.locator('textarea').inputValue();assert.ok(code.includes('computed'));
    assert.ok(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
    if(lang==='pt')await page.screenshot({path:`docs/validation/performance/editor-${width}-${theme}.png`});
    await page.keyboard.press('Escape');assert.ok(await start.evaluate(el=>el===document.activeElement));
    await start.click();assert.equal(await page.locator('.lab-workbench:visible textarea').inputValue(),code);await page.keyboard.press('Escape');
   }
   assert.equal(chunks.length,1);
   for(let i=0;i<3;i++){
    const service=page.locator('.service').nth(i);if(await service.getAttribute('open')===null)await service.locator('summary').click();
    await service.locator('.workbench-start').click();const dialog=page.locator('.lab-workbench:visible');await dialog.waitFor();
    await dialog.locator('.guide-fill').click();const popupPromise=page.waitForEvent('popup');await dialog.locator('.guide-run').click();const popup=await popupPromise;await popup.waitForLoadState();assert.ok(popup.url().includes('lab-preview.html'));await popup.close();await page.keyboard.press('Escape');
   }
   assert.equal(await page.locator('.lab-workbench').count(),3);assert.deepEqual(errors,[]);await page.close();console.log(`PASS ${width}: lazy mount, shared chunk, preserved code, previews, languages, themes, focus`);
  }
  // A failed fetch remains recoverable on another explicit click.
  const retry=await browser.newPage({reducedMotion:'reduce'});let fail=true;
  await retry.route('**/LabWorkbench-*.js',route=>fail?route.abort('failed'):route.continue());
  await retry.goto(base+'/#servicos');const start=retry.locator('.service').first().locator('.workbench-start');await start.click();
  await retry.locator('.editor-load-status').first().filter({hasText:/./}).waitFor();assert.equal(await retry.locator('.lab-workbench:visible').count(),0);
  fail=false;await start.click();await retry.locator('.lab-workbench:visible').waitFor();await retry.close();console.log('PASS network failure and retry');
  // Delay the chunk, leave Services, then finish the download: no surprise modal.
  const pending=await browser.newPage({reducedMotion:'reduce'});let release;
  const gate=new Promise(resolve=>release=resolve);await pending.route('**/LabWorkbench-*.js',async route=>{await gate;await route.continue();});
  await pending.goto(base+'/#servicos');const launch=pending.locator('.service').first().locator('.workbench-start');await launch.click();
  await pending.locator('#window-servicos .window-close').click();release();await pending.waitForLoadState('networkidle');assert.equal(await pending.locator('.lab-workbench:visible').count(),0);
  await pending.locator('#terminal-command').fill('servicos');await pending.locator('#terminal-command').press('Enter');await launch.click();await pending.locator('.lab-workbench:visible').waitFor();await pending.close();console.log('PASS leaving during download and reopening');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
