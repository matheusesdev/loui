// Development-only browser checks. No browser automation is shipped with the site.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:process.env.BROWSER_PATH});
  const context = await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'dark',reducedMotion:'reduce'});
  const page = await context.newPage();
  const errors = [], failedResources = [], checks = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) failedResources.push(r.url()); });
  const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
  const evidence = path.resolve('docs/validation'); fs.mkdirSync(evidence,{recursive:true});
  for (const [width,height] of [[360,800],[390,844],[768,1024],[1024,768],[1440,1000],[844,390],[720,500]]) {
    for (const theme of ['dark','light']) {
      await page.setViewportSize({width,height});
      await page.goto(base);
      await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('#intro .theme-toggle').click();
      assert.equal(await page.locator('#intro').evaluate(e=>e.open),true);
      assert.equal(await page.locator('#intro').evaluate(e=>e.scrollWidth>e.clientWidth+1),false,`intro overflow ${width}`);
      if ([390,1440].includes(width)) await page.screenshot({path:path.join(evidence,`intro-${width}-${theme}.png`)});
      await page.getByRole('button',{name:'Entrar',exact:true}).click();
      await page.locator('#intro').waitFor({state:'hidden'});
      assert.equal(await page.evaluate(()=>document.activeElement.id),'hero-title');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`page overflow ${width}`);
      assert.equal(await page.locator('#projetos').isVisible(),false);
      assert.equal(await page.locator('#contact-form input').first().isDisabled(),true);
      if ([390,1440].includes(width)) await page.screenshot({path:path.join(evidence,`site-${width}-${theme}.png`),fullPage:true});
      checks.push(`PASS ${width}x${height} ${theme}: intro, focus, no overflow, empty projects, disabled form`);
      console.log(checks.at(-1));
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/#servicos');
  assert.equal(await page.locator('#intro').evaluate(e=>e.open),false);
  await page.locator('.service').nth(1).locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.service').nth(1).evaluate(e=>e.open),true);
  checks.push('PASS direct anchor and keyboard accordion');
  await page.getByRole('button',{name:/Ativar tema/}).click();
  const selected = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'),selected);
  checks.push('PASS theme persistence');
  await page.evaluate(async()=>{
    const {renderProjects}=await import('/src/main.js');
    renderProjects([{title:'Projeto de verificação',summary:'Conteúdo temporário',category:'Teste',url:'javascript:alert(1)'}]);
  });
  assert.equal(await page.locator('#projetos').isVisible(),true);
  assert.equal(await page.locator('#project-list a').count(),0);
  await page.evaluate(async()=>{const {renderProjects}=await import('/src/main.js'); renderProjects([]);});
  checks.push('PASS project rendering, unsafe URL rejected, reset to empty');
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback=await nojs.newPage(); await fallback.goto(base);
  assert.equal(await fallback.locator('h1').isVisible(),true);
  assert.equal(await fallback.locator('#intro').isVisible(),false);
  checks.push('PASS no JavaScript: content accessible, no blocking intro');
  const restricted=await browser.newContext({reducedMotion:'reduce'});
  await restricted.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}});});
  const restrictedPage=await restricted.newPage(); await restrictedPage.goto(base);
  await restrictedPage.locator('#intro .theme-toggle').click();
  await restrictedPage.locator('#enter').click();
  assert.equal(await restrictedPage.locator('#intro').evaluate(e=>e.open),false);
  checks.push('PASS blocked storage: theme toggle and entry remain functional');
  await fallback.close(); await restrictedPage.close(); await page.bringToFront();
  await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto(base);
  await page.locator('#enter').click();
  await page.locator('#intro').waitFor({state:'hidden',timeout:5000});
  assert.equal(await page.evaluate(()=>document.activeElement.id),'hero-title');
  checks.push('PASS animated intro exit and focus');
  await page.emulateMedia({reducedMotion:'reduce'});
  const contrasts=await page.evaluate(()=>{
    const lum=hex=>{const c=hex.match(/\d+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return c[0]*.2126+c[1]*.7152+c[2]*.0722};
    const ratios=[];
    for(const theme of ['dark','light']){document.documentElement.dataset.theme=theme;const s=getComputedStyle(document.body);const bg=lum(s.backgroundColor);for(const variable of ['--text','--muted','--accent']){const span=document.createElement('span');span.style.color=`var(${variable})`;document.body.append(span);const fg=lum(getComputedStyle(span).color);span.remove();ratios.push({theme,variable,ratio:(Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05)});}}
    return ratios;
  });
  contrasts.forEach(c=>assert.ok(c.ratio>=4.5,JSON.stringify(c)));
  checks.push('PASS text, secondary text and accent contrast >= 4.5:1 in both themes');
  assert.deepEqual(errors,[]); assert.deepEqual(failedResources,[]);
  const report={date:'2026-10-20',browser:'Chromium / Edge headless',checks,contrasts,errors,failedResources};
  fs.writeFileSync(path.join(evidence,'results.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
