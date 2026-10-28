const playwright=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
const directory=process.env.RELEASE_VALIDATION_DIR||'docs/validation/release-review';
(async()=>{const results=[];fs.mkdirSync(directory,{recursive:true});
 for(const engine of ['chromium','firefox','webkit']){
  const executable=engine==='chromium'&&process.env.BROWSER_PATH?process.env.BROWSER_PATH:playwright[engine].executablePath();
  if(!fs.existsSync(executable)){results.push({engine,status:'not-installed'});console.log('NOT INSTALLED '+engine);continue;}
  let browser;try{browser=await playwright[engine].launch({headless:true,executablePath:executable});}catch(error){results.push({engine,status:'launch-unavailable',reason:error.message});console.log('UNAVAILABLE '+engine);continue;}
  try{for(const [width,height] of [[1440,900],[390,844]]){
   const page=await browser.newPage({viewport:{width,height},hasTouch:width<900});const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>{window.__opens=[];window.open=(...args)=>{window.__opens.push(args);return null;};});
   const response=await page.goto(base+'/#inicio');assert.equal(response.status(),200);await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
   assert.equal(await page.locator('.lab-workbench').count(),0);
   if(width<768){
    assert.equal(await page.locator('.phone-app').count(),1);
    await page.locator('.phone-nav a[href="#servicos"]').click();await page.locator('.phone-diagnosis-call button').click();
    const diagnosis=page.locator('.guided-diagnosis:visible');await diagnosis.locator('input[type=radio]').first().check();
    for(let i=0;i<3;i++)await diagnosis.locator('.diagnosis-next').click();
    await diagnosis.locator('#diagnosis-brief').fill('Release review briefing');await diagnosis.locator('.diagnosis-actions button').last().click();
    assert.equal(await page.locator('#contact-message').inputValue(),'Release review briefing');
    await page.locator('#mobile-language').selectOption('en',{force:true});await page.waitForFunction(()=>document.documentElement.lang.startsWith('en'));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
    await page.screenshot({path:`${directory}/${engine}-${width}.png`});
    results.push({engine,width,height,status:'passed',mobile:true,realMessagesSent:false});
    console.log(`PASS ${engine} ${width}: mobile diagnosis, contact handoff, language and layout`);await page.close();continue;
   }
   const settle=async id=>page.waitForFunction(id=>!document.querySelector('#window-'+id).dataset.windowMotion,id);
   const open=async command=>{await page.locator('#terminal-command').fill(command);await page.locator('#terminal-command').press('Enter');await settle('diagnostico');};
   await open('diagnostico');const diagnosis=page.locator('#window-diagnostico');await diagnosis.locator('input[type=radio]').first().check();
   for(let i=0;i<3;i++)await diagnosis.locator('.diagnosis-next').click();
   await diagnosis.locator('#diagnosis-brief').fill('Release review briefing');
   await diagnosis.locator('.window-minimize').click();await diagnosis.waitFor({state:'hidden'});await open('diagnostico');
   assert.equal(await diagnosis.locator('#diagnosis-brief').inputValue(),'Release review briefing');
   if(width>=900){await diagnosis.locator('.window-maximize').click();await settle('diagnostico');assert.ok(await diagnosis.evaluate(el=>el.classList.contains('is-maximized')));await diagnosis.locator('.window-maximize').click();await settle('diagnostico');}
   await diagnosis.locator('.diagnosis-actions button').last().click();await settle('contato');const contact=page.locator('#window-contato');
   assert.equal(await contact.locator('#contact-message').inputValue(),'Release review briefing');await contact.locator('#contact-name').fill('Ana');await contact.locator('#contact-message').fill('Original message');
   await contact.locator('.window-close').click();await contact.waitFor({state:'hidden'});
   await diagnosis.locator('#diagnosis-brief').fill('Append this briefing');await diagnosis.locator('.diagnosis-actions button').last().click();await settle('contato');
   await contact.locator('#contact-name').press('Enter');assert.deepEqual(await page.evaluate(()=>window.__opens),[]);
   await contact.locator('.diagnosis-append').click();assert.equal(await contact.locator('#contact-message').inputValue(),'Original message\n\nAppend this briefing');
   assert.ok(decodeURIComponent(await contact.locator('.compose-send').getAttribute('href')).includes('Append this briefing'));
   await page.locator('.terminal-return').click();await diagnosis.waitFor({state:'hidden'});await contact.waitFor({state:'hidden'});
   await chooseLanguage(page,'.workspace-tools','en');await open('diagnosis');assert.equal(await diagnosis.locator('#diagnosis-brief').inputValue(),'Append this briefing');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({path:`${directory}/${engine}-${width}.png`});
   assert.deepEqual(errors,[]);results.push({engine,width,height,status:'passed',motion:true,realMessagesSent:false});console.log(`PASS ${engine} ${width}: motion, diagnosis, preserved state, contact/Enter safety, language and layout`);await page.close();
  }}finally{await browser.close();}
 }
 fs.writeFileSync(directory+'/browser.json',JSON.stringify(results,null,2)+'\n');
 assert.ok(results.some(r=>r.status==='passed'));
})().catch(error=>{console.error(error);process.exit(1)});
