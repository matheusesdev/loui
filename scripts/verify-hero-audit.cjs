const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const directory='docs/validation/hero-audit/after';
(async()=>{
 fs.mkdirSync(directory,{recursive:true});
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{})});
 const results=[];const errors=[];
 try {
  for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844],[320,568],[844,390]]){
   const page=await browser.newPage({viewport:{width,height},hasTouch:width<900,reducedMotion:'reduce'});
   page.on('pageerror',error=>errors.push(error.message));
   await page.goto(base+'/#inicio');await page.locator('.studio-hero').waitFor();
   for(const language of ['pt','en','es']){
    await page.evaluate(async lang=>{const {setLanguage}=await import('/src/i18n.js');setLanguage(lang,false);},language);
    for(const theme of ['light','dark']){
     const current=await page.locator('html').getAttribute('data-theme');
     if(current!==theme)await page.locator('.theme-toggle:visible').first().click();
     for(let index=0;index<3;index++){
      const choice=page.locator('.studio-hero-choices button').nth(index);
      await choice.focus();await page.keyboard.press('Space');
      assert.equal(await choice.getAttribute('aria-pressed'),'true');
      assert.ok(await choice.evaluate(element=>element.matches(':focus-visible')));
      await page.locator('.studio-hero-evidence img').evaluate(img=>img.decode());
      await page.evaluate(()=>{window.scrollTo(0,0);const home=document.querySelector('.workspace-home');if(home)home.scrollTop=0;});
      const metrics=await page.evaluate(()=>{
       const action=document.querySelector('.studio-hero-action');const a=action.getBoundingClientRect();
       const nav=document.querySelector('.phone-nav')?.getBoundingClientRect();
       const point=document.elementFromPoint(a.x+a.width/2,a.y+a.height/2);
       return {overflow:document.documentElement.scrollWidth>innerWidth,ctaTop:a.y,ctaBottom:a.bottom,boundary:nav?.top??innerHeight,ctaHit:action===point||action.contains(point),demo:new URL(location.href).searchParams.get('demo'),themeColor:document.querySelector('meta[name="theme-color"]').content};
      });
      assert.equal(metrics.overflow,false,`${width} ${language} overflow`);
      assert.ok(metrics.ctaTop>=0&&metrics.ctaBottom+6<=metrics.boundary,`${width} ${height} ${language} ${index}: CTA/focus clearance ${JSON.stringify(metrics)}`);
      assert.ok(metrics.ctaHit,`${width} CTA obscured`);
      const href=await page.locator('.studio-hero-action').getAttribute('href');
      const data=JSON.parse(decodeURIComponent(new URL(href).hash.slice(1)));assert.equal(data.index,index);assert.equal(data.language,language);
      assert.equal(metrics.themeColor,theme==='light'?'#efeee9':'#14191d');
      results.push({width,height,language,theme,index,...metrics});
      if(language==='pt'&&index===2)await page.screenshot({path:`${directory}/${width}-${height}-${theme}.png`});
     }
    }
   }
   const selected=await page.locator('.studio-hero-action').getAttribute('href');await page.reload();await page.locator('.studio-hero').waitFor();assert.equal(JSON.parse(decodeURIComponent(new URL(await page.locator('.studio-hero-action').getAttribute('href')).hash.slice(1))).index,JSON.parse(decodeURIComponent(new URL(selected).hash.slice(1))).index);
   await page.close();
  }
  for(const width of [1440,390]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});page.on('pageerror',error=>errors.push(error.message));
   await page.goto(base+'/#inicio');await page.locator('.studio-hero').waitFor();
   for(let index=0;index<3;index++){
    await page.locator('.studio-hero-choices button').nth(index).click();
    const popup=page.waitForEvent('popup');await page.locator('.studio-hero-action').click();const demo=await popup;
    await demo.locator(index===0?'.booking-app':'.process-simulation').waitFor();await demo.close();
   }
   for(const route of ['servicos','projetos','contato']){
    if(width===390)await page.locator('.phone-nav a').nth({servicos:1,projetos:2,contato:3}[route]).click();
    else{await page.goto(base+'/#'+route);await page.locator('#window-'+route).waitFor({state:'visible'});}
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.screenshot({path:`${directory}/${route}-${width}.png`});
   }
   await page.locator('.compose-send').click();assert.equal(await page.locator('#contact-name').getAttribute('aria-invalid'),'true');assert.equal(await page.locator('#contact-name').evaluate(e=>document.activeElement===e),true);
   await page.close();
  }
  assert.deepEqual(errors,[]);
  fs.writeFileSync(directory+'/results.json',JSON.stringify(results,null,2)+'\n');
  console.log('PASS: 108 hero combinations, CTA and focus clearance, real theme toggles, loaded images, keyboard, reload, six live previews, services/projects/contact and empty-form focus.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
