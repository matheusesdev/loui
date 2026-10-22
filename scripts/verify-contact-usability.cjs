const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const base=process.env.SITE_URL||'http://127.0.0.1:4174',directory='docs/validation/contact-usability';fs.mkdirSync(directory,{recursive:true});
 const labels={pt:['Informe seu nome para continuar.','Conte brevemente o que você precisa criar ou melhorar.'],en:['Enter your name to continue.','Briefly describe what you need to build or improve.'],es:['Escribe tu nombre para continuar.','Cuenta brevemente qué necesitas crear o mejorar.']};
 const results=[];
 try{for(const[width,height]of[[1348,591],[768,1024],[320,480],[844,390]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<900});
  await context.route('https://wa.me/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<title>WhatsApp intercepted for validation</title>'}));
  const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/#contato');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  const form=page.locator('.contact-compose'),name=form.locator('#contact-name'),message=form.locator('#contact-message'),action=form.locator('.compose-send');
  assert.equal(await form.locator('.contact-field-error').count(),0,'no premature errors');
  for(const theme of['light','dark'])for(const language of['pt','en','es']){
   await chooseLanguage(page,'.workspace-tools',language);if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.workspace-tools .theme-toggle').click();
   await name.fill('   ');await message.fill(' \n ');await action.click();
   await page.waitForFunction(()=>document.activeElement.id==='contact-name');
   assert.equal(await form.locator('#contact-name-error').textContent(),labels[language][0]);assert.equal(await form.locator('#contact-message-error').textContent(),labels[language][1]);
   assert.equal(await name.getAttribute('aria-invalid'),'true');assert.equal(await message.getAttribute('aria-invalid'),'true');
   assert.equal(context.pages().length,1,'invalid input must not navigate');
   assert.ok(await name.evaluate(el=>{const r=el.getBoundingClientRect(),frame=el.closest('.window-content').getBoundingClientRect();return r.top>=frame.top&&r.bottom<=frame.bottom;}),'first error field visible');
   if(language==='pt')await page.screenshot({path:`${directory}/errors-${width}-${theme}.png`});
   await name.fill('Marina');assert.equal(await form.locator('#contact-name-error').count(),0);await action.click();
   await page.waitForFunction(()=>document.activeElement.id==='contact-message');assert.equal(context.pages().length,1);
   await message.fill('Quero conectar minhas ferramentas. <teste> & ação');assert.equal(await form.locator('.contact-field-error').count(),0);
   assert.equal(await message.getAttribute('aria-invalid'),'false');
   if(width<900){assert.equal(await name.evaluate(el=>getComputedStyle(el).fontSize),'16px');assert.equal(await message.evaluate(el=>getComputedStyle(el).fontSize),'16px');}
   let popupPromise=context.waitForEvent('page');await action.focus();await page.keyboard.press('Enter');let popup=await popupPromise;await popup.waitForLoadState();
   assert.equal(new URL(popup.url()).searchParams.get('text'),'Marina\n\nQuero conectar minhas ferramentas. <teste> & ação');await popup.close();
   assert.ok((await form.locator('.contact-feedback').textContent()).length>30);assert.equal(await message.inputValue(),'Quero conectar minhas ferramentas. <teste> & ação');
   popupPromise=context.waitForEvent('page');await name.press('Enter');popup=await popupPromise;await popup.waitForLoadState();assert.equal(new URL(popup.url()).hostname,'wa.me');await popup.close();
   await message.focus();await page.keyboard.press('End');await page.keyboard.press('Enter');await page.keyboard.type('Segunda linha');assert.ok((await message.inputValue()).includes('\nSegunda linha'));
   assert.equal(context.pages().length,1,'Enter in textarea is a newline');
   assert.ok(await form.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
   if(language==='pt')await page.screenshot({path:`${directory}/ready-${width}-${theme}.png`});
   results.push({width,height,theme,language,validation:true,keyboard:true,externalNavigationIntercepted:true});
  }
  await name.fill('');await action.click();await chooseLanguage(page,'.workspace-tools','es');assert.equal(await form.locator('#contact-name-error').textContent(),labels.es[0]);
  await name.fill('Marina');
  await page.locator('.workspace-tools .terminal-return').click();await page.locator('[data-command="contato"]').click();
  const draft=await message.inputValue();await page.locator('#window-contato .window-close').click();
  assert.ok(await page.locator('[data-command="contato"]').evaluate(el=>el===document.activeElement),'return to originating chip');
  await page.locator('[data-command="servicos"]').click();await page.locator('.service-contact').first().click();
  assert.equal(await message.inputValue(),draft);assert.ok(await form.locator('.contact-service-context').isVisible());
  await page.locator('#window-contato .window-close').click();assert.ok(await page.locator('.service-contact').first().evaluate(el=>el===document.activeElement),'return to originating service');
  await page.locator('.service-contact').first().click();await page.locator('#window-contato .window-minimize').click();await page.locator('.service-contact').first().click();assert.equal(await message.inputValue(),draft);
  assert.deepEqual(errors,[]);console.log(`PASS ${width}x${height}: errors, correction, focus, intercepted WhatsApp, Enter, drafts, themes and languages`);await context.close();
 }
 fs.writeFileSync(`${directory}/results.json`,JSON.stringify({scenarios:results.length,results,realMessagesSent:false},null,2)+'\n');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
