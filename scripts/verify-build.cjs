const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chooseLanguage } = require('./browser-helpers.cjs');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_PATH });
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(process.env.BUILD_URL || 'http://127.0.0.1:4174');
    await page.waitForFunction(() => document.documentElement.dataset.ready === 'true');
    assert.match(await page.locator('script[type="module"]').getAttribute('src'), /assets\//);
    await page.locator('#enter').click();
    await chooseLanguage(page, '.header', 'en');
    assert.match(await page.locator('.workspace-home-title').textContent(), /A space/);
    assert.equal(await page.locator('[data-open="servicos"]').textContent(), 'Services');
    await page.locator('[data-open="laboratorio"]').click();
    await page.locator('.lab-scene').first().locator('.demo-button').click();
    await page.locator('#window-laboratorio .window-minimize').click();
    await page.locator('.workspace-resume button').click();
    assert.equal(await page.locator('.lab-scene').first().locator('.demo').getAttribute('data-state'), 'complete');
    const asset = await page.request.get(new URL('/public/favicon.svg', page.url()).href);
    assert.equal(asset.status(), 200);
    assert.match(asset.headers()['content-type'], /svg/);
    await page.locator('[data-open="stacks"]').click();
    assert.equal(await page.locator('.stack-list img').evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0)),true);
    await page.locator('[data-open="radio"]').click();await page.locator('.radio-play').click();
    await page.waitForFunction(()=>!document.querySelector('.radio-audio').paused&&document.querySelector('.radio-audio').currentTime>0);
    await page.locator('[data-open="stacks"]').click();await page.locator('.radio-floating-player').waitFor({state:'visible'});
    await page.locator('.radio-stop').click();
    assert.equal(await page.locator('.radio-audio').evaluate(audio=>audio.paused),true);
    assert.deepEqual(errors, []);
    const result = { checks: ['PASS compiled production entry', 'PASS reactive home and dock translation', 'PASS lab state preserved through minimize/resume', 'PASS public assets and eight logos', 'PASS compiled local radio playback, mini player and close'], errors };
    fs.writeFileSync('docs/validation/svelte-build-results.json', JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(result, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
