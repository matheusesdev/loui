const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto((process.env.SITE_URL||'http://127.0.0.1:5173')+'/#inicio');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 assert.equal(await page.locator('#window-redes').count(),0);assert.equal(await page.locator('[data-command="redes"]').count(),0);assert.equal(await page.locator('.social-footer a').getAttribute('href'),'https://github.com/matheusesdev');
 await page.locator('[data-command="servicos"]').click();await page.waitForFunction(()=>{const input=document.querySelector('#terminal-command');return input.value.length>0&&input.value.length<8});assert.equal(await page.locator('#window-servicos').isVisible(),false);await page.locator('#window-servicos').waitFor({state:'visible'});
 await page.locator('.terminal-return').click();await page.locator('[data-command="stacks"]').click();await page.locator('#terminal-command').click();await page.waitForTimeout(1100);assert.equal(await page.locator('#window-stacks').isVisible(),false);
 await page.locator('[data-command="contato"]').click();await page.locator('#window-contato').waitFor({state:'visible'});
 await page.locator('#contact-name').fill('Teste & nome');await page.locator('#contact-message').fill('Uma ideia com integração.');
 const href=await page.locator('.compose-send').getAttribute('href');assert.equal(new URL(href).searchParams.get('text'),'Teste & nome\n\nUma ideia com integração.');assert.equal(await page.locator('.compose-send').getAttribute('aria-disabled'),'false');
 assert.equal(await page.locator('.whatsapp-channel img').evaluate(img=>img.complete&&img.naturalWidth>0),true);
 await page.screenshot({path:'docs/validation/contact-compose.png'});assert.deepEqual(errors,[]);console.log('PASS footer social links, progressive typing before navigation, cancellation, encoded WhatsApp form and logo');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
