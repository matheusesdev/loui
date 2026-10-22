const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
const expected={pt:['sobre','servicos','stacks','lab','projetos','contato'],en:['about','services','stacks','lab','projects','contact'],es:['sobre','servicios','stacks','lab','proyectos','contacto']};
async function bounds(page,root){return page.locator(`${root} .language-trigger,${root} .theme-toggle,${root} .terminal-return,${root} .contact-link`).evaluateAll(nodes=>nodes.filter(n=>n.getClientRects().length).map(n=>{const r=n.getBoundingClientRect();return [n.className,r.x,r.y,r.width,r.height]}));}
function stable(actual,expected){assert.equal(actual.length,expected.length);actual.forEach((row,i)=>row.forEach((v,j)=>j?assert.ok(Math.abs(v-expected[i][j])<1,`${row[0]} coordinate ${j}: ${v} vs ${expected[i][j]}`):assert.equal(v,expected[i][j])));}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const errors=[];fs.mkdirSync('docs/validation/feedback',{recursive:true});
 try{
  for(const [width,height] of [[1440,900],[768,1024],[320,568],[844,390]]){
   const page=await browser.newPage({viewport:{width,height},hasTouch:width<900});page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base);await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.evaluate(()=>document.fonts.ready);await page.locator('#enter').waitFor({state:'visible'});
   const intro=await bounds(page,'#intro');
   for(const lang of ['en','es','pt']){await chooseLanguage(page,'#intro',lang);stable(await bounds(page,'#intro'),intro);await page.locator('#intro .theme-toggle').click();stable(await bounds(page,'#intro'),intro);}
   await page.locator('#enter').click();await page.locator('#intro').waitFor({state:'hidden'});
   const header=await bounds(page,'.header');
   for(const theme of ['light','dark']){
    if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.header .theme-toggle').click();
    for(const lang of ['pt','en','es']){
     await chooseLanguage(page,'.header',lang);stable(await bounds(page,'.header'),header);
     assert.deepEqual(await page.locator('[data-command]').allTextContents(),expected[lang]);
     assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow');
     const boxes=await bounds(page,'.header');for(const row of boxes)assert.ok(row[1]>=0&&row[1]+row[3]<=width,`toolbar bounds ${width} ${lang} ${row}`);
     await page.waitForFunction(()=>[...document.querySelectorAll('.header .localized')].every(n=>getComputedStyle(n).filter==='blur(0px)'||getComputedStyle(n).filter==='none'));
     await page.screenshot({path:`docs/validation/feedback/home-${width}-${theme}-${lang}.png`});
    }
   }
   await page.emulateMedia({reducedMotion:'reduce'});
   // The floating player can cover terminal shortcuts on small screens.
   // Move it using its supported keyboard control before pointer navigation.
   await page.locator('.radio-move').focus();
   for(let step=0;step<20;step++)await page.keyboard.press('Shift+ArrowUp');
   for(const lang of ['pt','en','es']){
    await chooseLanguage(page,'.header',lang);
    for(const command of ['sobre','servicos','stacks','lab','projetos','contato']){
     await page.locator(`[data-command="${command}"]`).click();const panel=page.locator(`#window-${command==='lab'?'laboratorio':command}`);await panel.waitFor({state:'visible'});
     if(command==='lab'){assert.ok((await panel.locator('.lab-intro').textContent()).length>100);if(lang==='pt')await page.screenshot({path:`docs/validation/feedback/lab-${width}.png`});}
     await panel.locator('.window-close').click();
    }
   }
   // Keyboard picker opens, selects a language and restores focus to its trigger.
   const trigger=page.locator('.header .language-trigger');await trigger.focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Home');await page.keyboard.press('Enter');await page.waitForFunction(()=>document.documentElement.lang==='pt-BR');assert.ok(await trigger.evaluate(n=>n===document.activeElement));
   await page.locator('#terminal-command').fill('servicos');await page.locator('#terminal-command').press('Enter');await page.locator('#window-servicos').waitFor({state:'visible'});
   console.log(`PASS ${width}x${height}: intro/header geometry, PT/EN/ES, light/dark, translated commands, keyboard, reduced motion`);await page.close();
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
