// Capture real demos in each supported language. No hand-edited or generated mock UI.
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs');
const base=process.env.SITE_URL||'http://127.0.0.1:5173';
(async()=>{
 const {defaultDemoCode}=await import('../src/lab-code.js');
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const captures=[];
 try{
  fs.mkdirSync('public/images/studies',{recursive:true});
  for(const [index,id] of ['luz-studio','atende-workflow','sincronia-crm'].entries())for(const language of ['pt','en','es']){
   const page=await browser.newPage({viewport:{width:1100,height:760},reducedMotion:'reduce'});
   await page.addInitScript(()=>localStorage.setItem('loui-theme','light'));
   await page.goto(base+'/lab-preview.html#'+encodeURIComponent(JSON.stringify({index,code:defaultDemoCode(index,language),language,direct:true})));
   await page.locator(index===0?'.booking-app':'.process-simulation').waitFor();await page.evaluate(()=>document.fonts.ready);
   if(index>0){await page.locator('.simulation-next').click();await page.locator('.simulation-next').click();}
   const file=`public/images/studies/${id}${language==='pt'?'':'-'+language}.png`;
   await page.screenshot({path:file,clip:{x:0,y:60,width:1100,height:700},animations:'disabled'});
   captures.push({index,language,file,documentLanguage:await page.locator('html').getAttribute('lang'),heading:await page.locator(index===0?'.booking-app h1':'.simulation-heading h1').textContent()});
   await page.close();console.log('Captured '+id+' '+language);
  }
  fs.mkdirSync('docs/validation/localized-demos',{recursive:true});
  fs.writeFileSync('docs/validation/localized-demos/captures.json',JSON.stringify(captures,null,2)+'\n');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
