const {chromium,firefox,webkit}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');const dir='docs/validation/desktop-discovery';fs.mkdirSync(dir,{recursive:true});
(async()=>{const results=[];for(const [engine,type] of Object.entries({chromium,firefox,webkit})){
const browser=await type.launch({headless:true,...(engine==='chromium'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
try{for(const [width,height] of [[1440,900],[1280,720],[768,1024]]){
const page=await browser.newPage({viewport:{width,height},hasTouch:width===768});const errors=[];page.on('pageerror',error=>errors.push(error.message));await page.goto('http://127.0.0.1:4174/#inicio');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
const settle=()=>page.waitForFunction(()=>!document.querySelector('[data-window-motion]'));
const run=async command=>{await page.locator('#terminal-command').fill(command);await page.locator('#terminal-command').press('Enter');await settle();};
const home=async()=>{await page.locator('.terminal-return').click();await settle();};
for(const language of ['pt','en','es']){const prefs=page.locator('.desktop-top-controls');await prefs.locator('.language-trigger').click();await prefs.locator(`[data-language=${language}]`).click();await page.waitForFunction(language=>document.documentElement.lang.startsWith(language),language);if(await prefs.locator('.desktop-motion-toggle').getAttribute('aria-checked')!=='true')await prefs.locator('.desktop-motion-toggle').click();
for(const theme of ['light','dark']){await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
await page.locator('#terminal-command').fill(language==='pt'?'proj':language==='en'?'proj':'proy');await page.locator('.command-predictions').waitFor();await page.locator('#terminal-command').press('ArrowDown');assert.ok(await page.locator('#terminal-command').getAttribute('aria-activedescendant'));await page.locator('#terminal-command').press('Enter');await settle();await page.locator('#window-projetos').waitFor();assert.equal(await page.locator('.project-case img').count(),3);assert.equal(await page.locator('.lab-workbench').count(),0);assert.equal(await page.locator('.project-demo[target=_blank]').count(),3);
await page.waitForFunction(()=>[...document.querySelectorAll('.project-case img')].every(img=>img.complete&&img.naturalWidth>0));await page.locator('.project-study').first().locator('summary').click();
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
if(language==='pt')await page.screenshot({path:`${dir}/${engine}-${width}-${theme}-projects.png`});
await home();await page.locator('[data-dock-id=projetos]').click();await settle();await page.locator('#window-projetos').waitFor();await home();
}results.push({engine,width,language,status:'passed'});}
await run('contato');await page.locator('#contact-name').fill('Desktop review');await home();await run('servicos');await page.locator('.service').first().evaluate(el=>el.open=true);assert.ok(await page.locator('.invitation-try').first().getAttribute('href'));await page.locator('.workbench-start').first().click();await page.locator('.lab-workbench[open]').waitFor();await page.keyboard.press('Escape');await home();
await page.locator('[data-dock-id=contato]').click();await settle();assert.equal(await page.locator('#contact-name').inputValue(),'Desktop review');
assert.equal(await page.locator('.desktop-motion-toggle').getAttribute('aria-checked'),'true');await page.screenshot({path:`${dir}/${engine}-${width}-preferences.png`});assert.equal(await page.locator('#window-contato').isVisible(),true);assert.deepEqual(errors,[]);await page.close();
}
const phone=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});await phone.goto('http://127.0.0.1:4174/#inicio');await phone.locator('.phone-app').waitFor();assert.equal(await phone.locator('.desktop-top-controls,.command-predictions,.ambient-radio').count(),0);await phone.close();
}finally{await browser.close();}}
fs.writeFileSync(`${dir}/results.json`,JSON.stringify(results,null,2));console.log('PASS desktop discovery: '+results.length+' engine/viewport/language combinations, both themes, keyboard predictions, real images, editor, preserved contact, windows and mobile isolation');})().catch(error=>{console.error(error);process.exit(1)});
