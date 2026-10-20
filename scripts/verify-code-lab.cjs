const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{const {compileLabCode,snippets}=await import('../src/lab-code.js');
 assert.ok(compileLabCode(0,'<script>alert(1)</script>').error);assert.ok(compileLabCode(1,'{broken}').error);assert.ok(compileLabCode(2,'{"name":"password","stage":"etapa"}').error);
 assert.match(compileLabCode(1,'{"request":"Site","priority":"normal","action":"organizar"}').html,/Nenhuma resposta automática/);
 assert.match(compileLabCode(2,'{"name":"empresa","stage":"origem"}').html,/Ateliê Horizonte/);
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));const base=process.env.SITE_URL||'http://127.0.0.1:5173';await page.goto(base+'/#inicio');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');assert.equal(await page.locator('.header .terminal-return').isVisible(),true);assert.equal(await page.locator('.header .contact-link').isVisible(),true);
 assert.equal(await page.locator('#site>footer').count(),0);await page.locator('[data-command="lab"]').click();
 for(let i=0;i<3;i++){
  await page.locator('.lab-tabs button').nth(i).click();await page.locator('.lab-scene:visible .workbench-start').click();const d=page.locator('.lab-workbench:visible');const field=d.locator('.snippet-editor textarea');assert.equal(await field.isVisible(),true);
  await field.fill('invalid');await d.locator('.guide-run').click();assert.ok((await d.locator('.workbench-error').textContent()).length>0);assert.equal(await d.locator('iframe').count(),0);
  await field.fill(snippets[i]);await d.locator('.ide-terminal input').fill('executar');await d.locator('.ide-terminal input').press('Enter');await d.frameLocator('iframe').locator('h1').waitFor();assert.match(await d.locator('.what-you-did').textContent(),/Sabe o que você fez/);
  if(i===0)assert.equal(await d.frameLocator('iframe').locator('h1').textContent(),'Ideias merecem ganhar vida.');
  await page.screenshot({path:`docs/validation/code-lab-${i}.png`});await d.locator('.workbench-back').click();
 }
 await page.setViewportSize({width:390,height:844});await page.locator('.lab-tabs button').first().click();await page.locator('.lab-scene:visible .workbench-start').click();const d=page.locator('.lab-workbench:visible');await d.locator('.guide-fill').click();await d.locator('.guide-run').click();await d.frameLocator('iframe').locator('h1').waitFor();assert.equal(await d.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true);assert.deepEqual(errors,[]);
 console.log('PASS editable HTML/JSON, validation, changed rules and mappings, explanations, minimal home header and mobile');fs.writeFileSync('docs/validation/code-lab-results.json',JSON.stringify({passed:true,errors},null,2)+'\n');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
