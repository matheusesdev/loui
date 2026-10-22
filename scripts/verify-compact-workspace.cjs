const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chooseLanguage}=require('./browser-helpers.cjs');
const base=process.env.SITE_URL||'http://127.0.0.1:4174';
const directory='docs/validation/compact-workspace';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});
 const results=[];fs.mkdirSync(directory,{recursive:true});
 try{
  for(const [width,height] of [[1348,591],[1366,768],[1280,600],[1024,600],[1920,1080],[768,1024],[390,844],[360,640],[320,568],[320,480],[844,390],[667,375],[568,320]]){
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<900});const errors=[];
   page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/#inicio');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
   for(const theme of ['light','dark'])for(const language of ['pt','en','es']){
    const tools=page.locator('.workspace-tools');
    if(await tools.count())await chooseLanguage(page,'.workspace-tools',language);
    else if(language!=='pt')throw Error('Compact controls missing');
    if(await page.locator('html').getAttribute('data-theme')!==theme)await tools.locator('.theme-toggle').click();
    const layout=await page.evaluate(()=>{
     const home=document.querySelector('.workspace-home');
     const selectors=['.workspace-home-title','.workspace-proposition','.workspace-terminal','.terminal-form','[data-command="servicos"]','[data-command="contato"]','.workspace-tools','.ambient-radio','.social-footer'];
     const boxes=Object.fromEntries(selectors.map(selector=>{const el=document.querySelector(selector)||document.querySelector('#site>.header'),r=el.getBoundingClientRect();return [selector,{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}];}));
     return {home:{client:home.clientHeight,scroll:home.scrollHeight},page:{width:innerWidth,height:innerHeight,scroll:document.documentElement.scrollHeight},navbar:!!document.querySelector('#site>.header'),boxes};
    });
    if(layout.home.scroll>layout.home.client+1)console.log('Overflow evidence',width,height,layout);
    assert.ok(layout.home.scroll<=layout.home.client+1,`home requires scrolling ${width}x${height} ${language}`);
    assert.equal(layout.navbar,false,'remove the navbar');
    const overlaps=(a,b)=>Math.min(a.right,b.right)>Math.max(a.x,b.x)+1&&Math.min(a.bottom,b.bottom)>Math.max(a.y,b.y)+1;
    for(const selector of ['.ambient-radio','.social-footer','.workspace-tools'])assert.ok(!overlaps(layout.boxes['.workspace-terminal'],layout.boxes[selector]),`terminal overlaps ${selector} ${width}x${height} ${language}`);
    for(const [selector,r]of Object.entries(layout.boxes))assert.ok(r.x>=-1&&r.y>=-1&&r.right<=width+1&&r.bottom<=height+1&&r.height>0,`${selector} clipped ${width}x${height} ${language}: ${JSON.stringify(r)}`);
    for(const selector of ['[data-command="servicos"]','[data-command="contato"]','.workspace-tools .theme-toggle','.radio-expand','.ambient-toggle'])assert.ok(await page.locator(selector).evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));}),`${selector} covered ${width}x${height}`);
    if(language==='pt'&&((width===1348)||(width===320)||(width===568)||(width===768)))await page.screenshot({path:`${directory}/home-${width}-${height}-${theme}.png`});
    results.push({width,height,language,theme,scroll:false,clipping:false});
   }
   await page.locator('[data-command="servicos"]').click();await page.locator('#window-servicos').waitFor({state:'visible'});
   assert.equal(new URL(page.url()).hash,'#servicos');
   await page.locator('.workspace-tools .terminal-return').click();assert.equal(new URL(page.url()).hash,'#inicio');
   await page.locator('[data-command="contato"]').click();await page.locator('#contact-name').fill('Teste');await page.locator('#contact-message').fill('Mensagem preservada');
   await page.locator('.workspace-tools .terminal-return').click();await page.locator('[data-command="contato"]').click();assert.equal(await page.locator('#contact-message').inputValue(),'Mensagem preservada');
   await page.locator('.workspace-tools .terminal-return').click();
   assert.ok(await page.locator('.workspace-home').evaluate(el=>el.scrollHeight<=el.clientHeight+1),'history must not expand the opening');
   assert.deepEqual(errors,[]);console.log(`PASS ${width}x${height}: no scroll/clipping, 3 languages, 2 themes, controls and navigation`);await page.close();
  }
  const page=await browser.newPage({viewport:{width:1348,height:591},reducedMotion:'no-preference'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/#inicio');await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  await chooseLanguage(page,'.workspace-tools','es');
  for(const [width,height]of[[320,480],[568,320],[768,1024],[1348,591]]){
   await page.setViewportSize({width,height});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   assert.ok(await page.locator('.workspace-home').evaluate(el=>el.scrollHeight<=el.clientHeight+1),'resize without reload');
   await page.locator('.radio-expand').click();await page.locator('.radio-deck.is-expanded').waitFor();
   const box=await page.locator('.ambient-radio').boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=width+1&&box.y+box.height<=height+1,'expanded radio bounds');
   await page.locator('.radio-collapse').click();
   if(width===320)await page.screenshot({path:`${directory}/home-320-480-es.png`});
  }
  await page.locator('#terminal-command').fill('tema claro');await page.locator('#terminal-command').press('Enter');assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
  await page.locator('#terminal-command').fill('services');await page.locator('#terminal-command').press('Enter');await page.locator('#window-servicos').waitFor({state:'visible'});
  await page.locator('.workspace-tools .terminal-return').click();
  await page.keyboard.press('Tab');assert.deepEqual(errors,[]);await page.close();
  console.log('PASS live resize/rotation, radio expansion, normal motion and terminal commands');
  fs.writeFileSync(`${directory}/results.json`,JSON.stringify({scenarios:results.length,results,liveResize:true,radioExpansion:true,normalMotion:true},null,2)+'\n');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
