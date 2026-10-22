const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const base=process.env.SITE_URL||'http://127.0.0.1:4174';
 const directory='docs/validation/capability-evidence';fs.mkdirSync(directory,{recursive:true});
 const results=[];
 const labels={pt:{heading:'Ideias que você pode testar.',authorship:'Projeto autoral / demonstração local',limits:'Limites da demonstração'},en:{heading:'Ideas you can try.',authorship:'Original project / local demo',limits:'Demo limitations'},es:{heading:'Ideas que puedes probar.',authorship:'Proyecto propio / demostración local',limits:'Límites de la demostración'}};
 try{for(const [width,height]of[[1348,591],[768,1024],[320,480],[844,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<900});const errors=[];const saved={};
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400&&response.url().startsWith(base))errors.push(`${response.status()} ${response.url()}`);});
  await page.goto(base+'/#projetos');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  for(const theme of['light','dark'])for(const language of['pt','en','es']){
   await chooseLanguage(page,'.workspace-tools',language);
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.workspace-tools .theme-toggle').click();
   assert.equal(await page.locator('#projetos>h2').textContent(),labels[language].heading);
   assert.equal(await page.locator('.project-case').count(),3);
   for(const text of await page.locator('.project-authorship').allTextContents())assert.equal(text,labels[language].authorship);
   if(language==='pt'){
    for(let index=0;index<3;index++){
     const card=page.locator('.project-case').nth(index),details=card.locator('.project-study');
     if(await details.evaluate(el=>el.open)){
      if(!await card.evaluate(el=>el.open))await card.locator('.project-heading').click();
      await details.locator('summary').click();
     }
    }
    while(await page.locator('.project-case[name][open]').count())await page.locator('.project-case[name][open]>.project-heading').click();
    await page.locator('#window-projetos .window-content').evaluate(el=>el.scrollTop=0);
    await page.screenshot({path:`${directory}/projects-${width}-${theme}.png`});
   }
   for(let index=0;index<3;index++){
    const article=page.locator('.project-case').nth(index);const details=article.locator('.project-study');
    if(!await article.evaluate(el=>el.open))await article.locator('.project-heading').click();
    if(!await details.evaluate(el=>el.open)){await details.locator('summary').focus();await page.keyboard.press('Enter');}
    assert.equal(await details.locator('dt').count(),4);assert.equal(await details.locator('dt').last().textContent(),labels[language].limits);
    assert.ok((await details.locator('dd').last().textContent()).length>40);
    assert.ok(await article.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
    if(language==='pt'&&index===0&&width===1348)await page.screenshot({path:`${directory}/study-${width}-${theme}.png`});
    await article.locator('.project-demo').click();
    const editor=page.locator('.lab-workbench:visible');await editor.waitFor({state:'visible'});
    const field=editor.locator(`textarea#lab-value-${index}`);assert.ok(await field.isVisible());
    if(saved[index])assert.equal(await field.inputValue(),saved[index],'existing code must survive case navigation');
    await editor.locator('.guide-fill').click();saved[index]=await field.inputValue();
    const popupPromise=page.waitForEvent('popup');await editor.locator('.guide-run').click();const popup=await popupPromise;
    popup.on('pageerror',error=>errors.push(error.message));await popup.waitForLoadState();
    assert.ok(popup.url().includes('/lab-preview.html#'));await popup.locator('.standalone-preview').waitFor();await popup.close();
    await editor.locator('.editor-close').click();
    assert.ok(await page.locator('.service').nth(index).locator('.workbench-start').evaluate(el=>el===document.activeElement));
    await page.locator('.workspace-tools .terminal-return').click();await page.locator('[data-command="projetos"]').click();
    assert.equal(await page.locator('.project-case').nth(index).locator('.project-study').evaluate(el=>el.open),true,'open study survives navigation');
   }
   assert.ok(await page.locator('#window-projetos .window-content').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   results.push({width,height,theme,language,studies:3,demos:3,overflow:false});
  }
  const count=await page.locator('.project-study[open]').count();await chooseLanguage(page,'.workspace-tools','pt');
  assert.equal(await page.locator('.project-study[open]').count(),count,'language switch preserves open studies');
  assert.deepEqual(errors,[]);console.log(`PASS ${width}x${height}: 3 studies/demos, preview, focus, code, disclosure state, PT/EN/ES, both themes`);await page.close();
 }
 const compactPage=await browser.newPage({viewport:{width:1348,height:591},reducedMotion:'reduce'});
 await compactPage.goto(base+'/#projetos');await compactPage.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 for(const[width,height]of[[320,480],[844,390],[568,320]]){
  await compactPage.setViewportSize({width,height});
  await compactPage.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  for(const language of['pt','en','es']){
   await chooseLanguage(compactPage,'.workspace-tools',language);
   assert.equal(await compactPage.locator('.project-case[open]').count(),0);
   assert.ok(await compactPage.locator('#window-projetos .window-content').evaluate(el=>el.scrollHeight<=el.clientHeight+1),'compact choices must fit without scrolling');
  }
  await compactPage.screenshot({path:`${directory}/compact-choices-${width}.png`});
 }
 await compactPage.close();console.log('PASS compact project choices and live resize in PT/EN/ES');
 const page=await browser.newPage({viewport:{width:1348,height:591},reducedMotion:'no-preference'});
 await page.goto(base+'/#projetos');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 await page.locator('.project-demo').nth(2).click();await page.locator('.lab-workbench:visible #lab-value-2').waitFor();
 await page.locator('.lab-workbench:visible .editor-close').click();
 assert.ok(await page.locator('.service').nth(2).locator('.workbench-start').evaluate(el=>el===document.activeElement));await page.close();
 fs.writeFileSync(`${directory}/results.json`,JSON.stringify({scenarios:results.length,results,normalMotion:true,compactChoices:true,liveResize:true},null,2)+'\n');
 console.log('PASS normal motion and focus return');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
