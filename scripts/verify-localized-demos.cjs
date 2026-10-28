const{chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');const assert=require('node:assert/strict');const fs=require('node:fs');
const contrastOf=async locator=>locator.evaluate(element=>{
 const channels=text=>text.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
 const light=rgb=>{const c=channels(rgb);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
 const ink=light(getComputedStyle(element.querySelector('strong')).color),paper=light(getComputedStyle(element).backgroundColor);
 return (Math.max(ink,paper)+.05)/(Math.min(ink,paper)+.05);
});
const base=process.env.SITE_URL||'http://127.0.0.1:4174';const dir='docs/validation/localized-demos';
(async()=>{fs.mkdirSync(dir,{recursive:true});const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});const results=[];
try{for(const[width,height]of[[1440,900],[1024,768],[768,1024],[390,844],[320,568],[844,390]]){
 const page=await browser.newPage({viewport:{width,height},hasTouch:width<900,reducedMotion:'no-preference'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/#inicio');await page.locator('.studio-hero').waitFor();const phone=await page.locator('.phone-app').count();
 const choose=async lang=>{if(phone)await page.locator('#mobile-language').selectOption(lang);else{await page.locator('.studio-header .language-trigger').click();await page.locator(`.studio-header [data-language=${lang}]`).click();}};
 const settle=async lang=>page.waitForFunction(lang=>document.documentElement.lang===({pt:'pt-BR',en:'en',es:'es'}[lang])&&!document.documentElement.classList.contains('language-changing'),lang);
 await choose('en');await page.waitForFunction(()=>document.documentElement.classList.contains('language-changing'));await page.waitForTimeout(160);
 const during=await page.locator('.studio-hero h1').evaluate(e=>({filter:getComputedStyle(e).filter,opacity:getComputedStyle(e).opacity}));assert.match(during.filter,/blur\(/);assert.ok(Number(during.opacity)<1);
 if(width===1440)await page.screenshot({path:dir+'/blur-desktop.png'});
 await settle('en');await page.locator('.studio-hero-evidence img').evaluate(img=>img.decode());assert.ok((await page.locator('.studio-hero-evidence img').getAttribute('src')).endsWith('-en.png'));
 await page.locator('.desktop-motion-toggle').click();await choose('es');await settle('es');assert.ok(await page.locator('.studio-hero h1').evaluate(e=>parseFloat(getComputedStyle(e).transitionDuration)<=0.001));assert.equal(await page.locator('html').evaluate(e=>e.classList.contains('language-changing')),false);
 await page.emulateMedia({reducedMotion:'reduce'});await choose('pt');await settle('pt');assert.equal(await page.locator('.studio-hero h1').evaluate(e=>getComputedStyle(e).filter),'none');
 for(const language of['pt','en','es']){await choose(language);await settle(language);for(const theme of['light','dark']){if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.theme-toggle:visible').first().click();for(let index=0;index<3;index++){
 await page.locator('.studio-hero-choices button').nth(index).click();const image=page.locator('.studio-hero-evidence img');await image.evaluate(img=>img.decode());const src=await image.getAttribute('src');assert.ok(src.endsWith(language==='pt'?'.png':'-'+language+'.png'));if(language==='pt')assert.ok(!/-(en|es)\.png$/.test(src));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.evaluate(()=>{window.scrollTo(0,0);const home=document.querySelector('.workspace-home');if(home)home.scrollTop=0;});
 const dimensions=await page.locator('.studio-hero-action').evaluate(e=>{const r=e.getBoundingClientRect();return{width:r.width,height:r.height,bottom:r.bottom,boundary:document.querySelector('.phone-nav')?.getBoundingClientRect().top??innerHeight};});
 assert.ok(dimensions.bottom+6<=dimensions.boundary,`${width} ${language} ${index} CTA clipped: ${JSON.stringify(dimensions)}`);assert.ok(dimensions.height>=44);assert.ok(await contrastOf(page.locator('.studio-hero-action'))>=4.5,'hero action contrast');
 assert.equal(await page.locator('.studio-hero-action .demo-action-icon').count(),1);assert.equal(await page.locator('.studio-hero-action .demo-action-copy small').textContent(),['Luz','Atende','Sincronia'][index]);
 const href=await page.locator('.studio-hero-action').getAttribute('href');const payload=JSON.parse(decodeURIComponent(new URL(href).hash.slice(1)));assert.equal(payload.index,index);assert.equal(payload.language,language);if(index===1&&language==='en')assert.equal(JSON.parse(payload.code).request,'I need a website');
 results.push({width,height,language,theme,index,src,...dimensions});
 if((width===1440||width===390||width===320)&&index===2&&language==='en')await page.screenshot({path:`${dir}/hero-${width}-${theme}.png`,animations:'disabled'});
 }}}
 if(width===1440||width===390){await choose('en');await settle('en');for(let index=0;index<3;index++){await page.locator('.studio-hero-choices button').nth(index).click();const promise=page.waitForEvent('popup');await page.locator('.studio-hero-action').click();const demo=await promise;await demo.locator(index===0?'.booking-app':'.process-simulation').waitFor();assert.equal(await demo.locator('html').getAttribute('lang'),'en');await demo.close();}
 if(phone){await page.locator('.phone-nav a').nth(2).click();await page.locator('.phone-project-image').first().evaluate(img=>img.decode());assert.equal(await page.locator('.phone-project-image').evaluateAll(images=>images.every(img=>img.src.endsWith('-en.png'))),true);await page.screenshot({path:dir+'/projects-mobile-en.png'});await page.locator('.phone-project-list button').first().click();assert.equal(await page.locator('.demo-action .demo-action-icon').count(),1);}
 else{await page.goto(base+'/#projetos');await page.locator('.project-case img').first().waitFor();assert.equal(await page.locator('.project-case img').evaluateAll(images=>images.every(img=>img.src.endsWith('-en.png'))),true);assert.equal(await page.locator('.project-demo .demo-action-icon').count(),3);await page.goto(base+'/#servicos');if(await page.locator('.service').first().getAttribute('open')===null)await page.locator('.service').first().locator('summary').click();assert.equal(await page.locator('.invitation-try .demo-action-icon').count(),3);assert.ok(await contrastOf(page.locator('.invitation-try').first())>=4.5,'service action contrast');await page.screenshot({path:dir+'/services-desktop-en.png'});}
 }
 assert.deepEqual(errors,[]);await page.close();
}fs.writeFileSync(dir+'/qa.json',JSON.stringify(results,null,2)+'\n');console.log('PASS: hero blur, local/system reduced motion, 108 localized image/action combinations on the build, live demos, and project/service actions.');}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
