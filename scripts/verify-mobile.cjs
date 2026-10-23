const {chromium,firefox,webkit}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const dir='docs/validation/mobile';fs.mkdirSync(dir,{recursive:true});
(async()=>{const results=[];
for(const [engine,type] of Object.entries({chromium,firefox,webkit})){
 const browser=await type.launch({headless:true,...(engine==='chromium'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
 try{for(const [width,height] of [[320,568],[390,844],[844,390]]){
 const page=await browser.newPage({viewport:{width,height},hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{window.open=(url)=>{window.__demo=String(url);return null;};});
 await page.goto('http://127.0.0.1:4174');await page.locator('.phone-app').waitFor();await page.locator('#intro[open]').waitFor();await page.locator('#enter').click();await page.locator('#intro').waitFor({state:'hidden'});assert.equal(await page.locator('.phone-signature').count(),0);assert.equal(await page.evaluate(()=>document.querySelector('#site').inert),false);
 const overflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${engine} ${width} overflow`);
 for(const language of ['pt','en','es']){await page.locator('#mobile-language').selectOption(language);for(const theme of ['light','dark']){
 await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;},theme);
 for(let i=0;i<4;i++){await page.locator('.phone-nav a').nth(i).click();await overflow();assert.equal(await page.locator('.phone-nav a[aria-current=page]').count(),1);}
 await page.locator('.phone-nav a').nth(1).click();await page.locator('.phone-service-list button').first().click();await overflow();await page.locator('.phone-secondary').click();const demo=await page.evaluate(()=>window.__demo);assert.ok(JSON.parse(decodeURIComponent(new URL(demo).hash.slice(1))).mobile);
 await page.locator('.phone-nav a').first().click();
 if(language==='pt'&&theme==='light')await page.screenshot({path:`${dir}/${engine}-${width}.png`,fullPage:true});
 }}
 await page.locator('#mobile-language').selectOption('pt');await page.locator('.phone-nav a').nth(1).click();await page.locator('.phone-diagnosis-call button').click();await page.locator('.diagnosis-options input').first().check();for(let i=0;i<3;i++)await page.locator('.diagnosis-next').click();await page.locator('#diagnosis-brief').fill('Mobile briefing');await page.locator('.diagnosis-actions button').last().click();await assert.equal(await page.locator('#contact-message').inputValue(),'Mobile briefing');await page.locator('.phone-nav a').first().click();await page.locator('.phone-nav a').last().click();assert.equal(await page.locator('#contact-message').inputValue(),'Mobile briefing');await overflow();
 assert.equal(await page.locator('.ambient-radio,.lab-workbench,#terminal-command').count(),0);
 if(width===390){
 await page.locator('#contact-name').fill('A'.repeat(100));await page.locator('#contact-message').fill('Long message '.repeat(150));await page.locator('#contact-message').focus();await page.keyboard.press('Tab');await overflow();
 await page.screenshot({path:`${dir}/${engine}-contact.png`,fullPage:true});
 await page.locator('.phone-nav a').nth(1).click();await page.locator('.phone-service-list button').nth(2).click();await page.goBack();await page.locator('.phone-service-list').waitFor();await page.screenshot({path:`${dir}/${engine}-services.png`,fullPage:true});
 await page.locator('.phone-nav a').nth(2).click();await page.screenshot({path:`${dir}/${engine}-projects.png`,fullPage:true});
 for(let index=0;index<3;index++){await page.locator('.phone-project-list button').nth(index).click();await page.locator('.phone-primary').click();const preview=await browser.newPage({viewport:{width,height},hasTouch:true,reducedMotion:'reduce'});await preview.goto(await page.evaluate(()=>window.__demo));await preview.locator(index===0?'.booking-app':'.process-simulation').waitFor();assert.equal(await preview.locator('dialog[open]').count(),0);assert.equal(await preview.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await preview.screenshot({path:`${dir}/${engine}-demo-${index}.png`,fullPage:true});await preview.close();await page.locator('.phone-back:visible').click();}
 }
 assert.deepEqual(errors,[]);results.push({engine,width,height,status:'passed'});await page.close();
 }
 for(const width of [768,1440]){const desktop=await browser.newPage({viewport:{width,height:1024},hasTouch:width===768});await desktop.goto('http://127.0.0.1:4174');await desktop.locator('#terminal-command').waitFor({state:'attached'});assert.equal(await desktop.locator('.phone-app').count(),0);await desktop.close();}
 }finally{await browser.close();}
}fs.writeFileSync(`${dir}/results.json`,JSON.stringify(results,null,2));console.log('PASS mobile: '+results.length+' engine/viewport combinations, three languages, two themes, diagnosis briefing and desktop route');})().catch(error=>{console.error(error);process.exit(1);});
