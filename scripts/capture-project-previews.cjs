// Capture the actual local demonstrations; no invented product imagery.
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs');
(async()=>{const {snippets}=await import('../src/lab-code.js');const browser=await chromium.launch({executablePath:process.env.BROWSER_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{fs.mkdirSync('public/images/studies',{recursive:true});for(const [index,id] of ['luz-studio','atende-workflow','sincronia-crm'].entries()){
 const page=await browser.newPage({viewport:{width:1100,height:760},reducedMotion:'reduce'});await page.addInitScript(()=>localStorage.setItem('loui-theme','light'));
 await page.goto('http://127.0.0.1:4174/lab-preview.html#'+encodeURIComponent(JSON.stringify({index,code:snippets[index],language:'pt',direct:true})));
 await page.locator(index===0?'.booking-app':'.process-simulation').waitFor();await page.evaluate(()=>document.fonts.ready);
 if(index>0){await page.locator('.simulation-next').click();await page.locator('.simulation-next').click();}
 await page.screenshot({path:`public/images/studies/${id}.png`,clip:{x:0,y:60,width:1100,height:700}});await page.close();console.log('Captured '+id);
}}finally{await browser.close();}})().catch(error=>{console.error(error);process.exit(1)});
