const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');const assert=require('node:assert/strict');
const {chooseLanguage}=require('./browser-helpers.cjs');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 const p=await browser.newPage({viewport:{width:320,height:480},reducedMotion:'reduce'});await p.goto('http://127.0.0.1:4174/#inicio');await p.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 assert.ok(await p.evaluate(()=>document.documentElement.scrollHeight<=innerHeight&&document.documentElement.scrollWidth<=innerWidth));
 await p.locator('#terminal-command').fill('diagnostico');await p.locator('#terminal-command').press('Enter');const d=p.locator('#window-diagnostico');
 await d.locator('input[type=radio]').nth(2).check();await d.locator('.diagnosis-next').click();await d.locator('textarea').fill('a'.repeat(700));assert.equal((await d.locator('textarea').inputValue()).length,600);
 await d.locator('.diagnosis-next').click();await d.locator('textarea').fill('A goal');await d.locator('.diagnosis-navigation button').first().click();assert.equal((await d.locator('textarea').inputValue()).length,600);await d.locator('.diagnosis-next').click();assert.equal(await d.locator('textarea').inputValue(),'A goal');await d.locator('.diagnosis-next').click();
 await d.locator('#diagnosis-brief').fill('Custom result');await chooseLanguage(p,'.workspace-tools','en');assert.equal(await d.locator('#diagnosis-brief').inputValue(),'Custom result');
 await d.locator('.diagnosis-refresh').click();assert.ok(await d.locator('#diagnosis-brief').evaluate(el=>el===document.activeElement));assert.ok((await d.locator('#diagnosis-brief').inputValue()).includes('Expected result: A goal'));
 await d.locator('.window-close').click();await p.locator('#terminal-command').fill('diagnosis');await p.locator('#terminal-command').press('Enter');assert.ok((await d.locator('#diagnosis-brief').inputValue()).includes('A goal'));
 console.log('PASS 320x480 opening without page overflow; 600 limit; back; language keeps manual text; refresh focus; close/reopen');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
