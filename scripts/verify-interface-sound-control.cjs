const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 fs.mkdirSync('docs/validation/interface-sounds',{recursive:true});
 for(const [width,height]of [[1440,900],[768,1024],[320,568],[844,390]]){
  const p=await b.newPage({viewport:{width,height},reducedMotion:'reduce'});await p.addInitScript(()=>localStorage.setItem('loui-interface-sounds','off'));await p.goto(base+'/#inicio');await p.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  for(const theme of ['light','dark'])for(const lang of ['pt','en','es']){
   await chooseLanguage(p,'.header',lang);if(await p.locator('html').getAttribute('data-theme')!==theme)await p.locator('.header .theme-toggle').click();
   const control=p.locator('.terminal-sound-toggle');assert.match(await control.getAttribute('aria-label'),lang==='en'?/interface sounds/:lang==='es'?/sonidos de la interfaz/:/sons da interface/);
   const r=await control.boundingBox();assert.ok(r.x>=0&&r.y>=0&&r.x+r.width<=width&&r.y+r.height<=height);
   assert.ok(await p.evaluate(()=>{const rect=document.querySelector('.terminal-sound-toggle').getBoundingClientRect(),range=document.createRange();range.selectNodeContents(document.querySelector('.terminal-caption'));return rect.left>range.getBoundingClientRect().right;}));
   await control.focus();await p.keyboard.press('Shift+Tab');await p.keyboard.press('Tab');assert.ok(await control.evaluate(el=>el===document.activeElement&&getComputedStyle(el).outlineStyle!=='none'));
   if(lang==='pt')await p.screenshot({path:`docs/validation/interface-sounds/control-${width}-${theme}.png`});
  }
  await p.close();console.log(`PASS sound control ${width}x${height}: PT/EN/ES, themes, no caption overlap, keyboard focus`);
 }
 const p=await b.newPage();await p.goto(base+'/#inicio');await p.waitForFunction(()=>document.documentElement.dataset.ready==='true');await p.locator('[data-command=sobre]').click();await p.locator('#window-sobre').waitFor({state:'visible'});await p.locator('#window-sobre .window-close').click();await p.locator('#window-sobre').waitFor({state:'hidden'});await p.close();console.log('PASS animated suggestion open/close.');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});
