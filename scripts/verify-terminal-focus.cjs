const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const base=process.env.SITE_URL||'http://127.0.0.1:4174';
 const directory='docs/validation/terminal-focus';fs.mkdirSync(directory,{recursive:true});
 try{for(const [width,height]of[[1348,591],[1440,900],[768,1024],[320,480],[568,320]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[];
  page.on('pageerror',error=>errors.push(error.message));await page.goto(base+'/#inicio');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  for(const theme of ['light','dark']){
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.workspace-tools .theme-toggle').click();
   await page.locator('.terminal-overline').click();
   const metrics=()=>page.locator('.workspace-terminal').evaluate(el=>{const input=el.querySelector('input'),r=el.getBoundingClientRect(),style=getComputedStyle(input);return {x:r.x,y:r.y,width:r.width,height:r.height,shadow:getComputedStyle(el).boxShadow,inputHeight:input.getBoundingClientRect().height,font:style.fontSize,padding:style.padding};});
   const before=await metrics();await page.locator('#terminal-command').click();const focused=await metrics();
   assert.deepEqual(focused,before,`input focus changes terminal ${width}x${height}: ${JSON.stringify({before,focused})}`);
   await page.keyboard.type('help');await page.keyboard.press('Enter');
   for(let i=0;i<5;i++){await page.locator('#terminal-command').fill('idioma pt');await page.locator('#terminal-command').press('Enter');}
   await page.locator('.terminal-overline').click();const withHistory=await metrics();
   await page.locator('#terminal-command').click();assert.deepEqual(await metrics(),withHistory,'history focus changes terminal');
   const output=page.locator('.terminal-output');
   assert.ok(await output.evaluate(el=>el.scrollHeight>el.clientHeight),'history must overflow for this test');
   assert.equal(await output.evaluate(el=>getComputedStyle(el).scrollbarWidth),'none');
   assert.equal(await output.evaluate(el=>getComputedStyle(el,'::-webkit-scrollbar').display),'none');
   await output.focus();await page.keyboard.press('Home');
   await page.waitForFunction(()=>document.querySelector('.terminal-output').scrollTop===0);
   await page.keyboard.press('End');await page.waitForFunction(()=>document.querySelector('.terminal-output').scrollTop>0);
   await page.locator('#terminal-command').click();
   if(width===1348||width===320)await page.screenshot({path:`${directory}/history-${width}-${theme}.png`});
   await page.locator('#terminal-command').fill('clear');await page.locator('#terminal-command').press('Enter');
   assert.equal(await output.locator('p').count(),0);assert.equal(await output.getAttribute('tabindex'),'-1');
  }
  assert.deepEqual(errors,[]);console.log(`PASS ${width}x${height}: stable focus, hidden scrollbar, accessible scrolling, clear, both themes`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
