const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chooseLanguage } = require('./browser-helpers.cjs');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_PATH });
  const base = process.env.SITE_URL || 'http://127.0.0.1:4174';
  const directory = process.env.VERIFY_SCREENSHOT_DIR || 'docs/validation/commercial-clarity';
  fs.mkdirSync(directory, { recursive: true });
  const results = [];
  const copy = {
    pt: { proposition: 'Desenvolvemos sites e sistemas', question: 'Sua ideia precisa', context: 'Quero conversar sobre:', remove: 'Remover assunto' },
    en: { proposition: 'We build websites and systems', question: 'Does your idea need', context: 'I would like to discuss:', remove: 'Remove topic' },
    es: { proposition: 'Desarrollamos sitios y sistemas', question: '¿Tu idea necesita', context: 'Quiero hablar sobre:', remove: 'Quitar tema' },
  };
  try {
    for (const [width, height] of [[1440, 900], [768, 1024], [320, 568], [844, 390]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width < 900 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(base)) errors.push(`${response.status()} ${response.url()}`); });
      await page.goto(base + '/#inicio');
      await page.waitForFunction(() => document.documentElement.dataset.ready === 'true');
      for (const theme of ['light', 'dark']) {
        for (const language of ['pt', 'en', 'es']) {
          await page.locator('.workspace-tools .terminal-return').click();
          await chooseLanguage(page, '.workspace-tools', language);
          if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('.workspace-tools .theme-toggle').click();
          assert.ok((await page.locator('.workspace-proposition').textContent()).includes(copy[language].proposition));
          await page.locator('.workspace-proposition').scrollIntoViewIfNeeded();
          assert.ok(await page.locator('.workspace-proposition').evaluate(el => {
            const box = el.getBoundingClientRect(), parent = el.parentElement.getBoundingClientRect();
            return box.top >= parent.top - 1 && box.bottom <= parent.bottom + 1;
          }), `proposition clipped ${width} ${language}`);
          assert.ok(await page.locator('.workspace-home').evaluate(el => el.scrollWidth <= el.clientWidth + 1));
          if (language === 'pt' && theme === 'light') await page.screenshot({ path: `${directory}/home-${width}.png` });
          if (width < 900 && language === 'pt' && theme === 'light') {
            await page.locator('.workspace-home').evaluate(el => { el.scrollTop = el.scrollHeight; });
            const serviceButton = page.locator('[data-command="servicos"]');
            assert.ok(await serviceButton.evaluate(el => {
              const rect = el.getBoundingClientRect();
              return el.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
            }), 'radio must not cover service shortcut at the end of home scroll');
            await page.screenshot({ path: `${directory}/terminal-${width}.png` });
          }
          await page.locator('[data-command="servicos"]').click();
          await page.locator('#window-servicos').waitFor({ state: 'visible' });
          assert.ok(await page.locator('.service-question').first().textContent().then(text => text.includes(copy[language].question)));
          for (let index = 0; index < 4; index++) {
            const service = page.locator('.service').nth(index);
            if (!(await service.evaluate(el => el.open))) await service.locator('summary').click();
            const action = service.locator('.service-contact');
            await action.scrollIntoViewIfNeeded();
            assert.ok((await action.boundingBox()).height >= 44);
            assert.ok(await service.locator('.service-body').evaluate(el => el.scrollWidth <= el.clientWidth + 1));
            if (language === 'pt' && theme === 'light' && index === 0) await page.screenshot({ path: `${directory}/services-${width}.png` });
            await action.focus();
            await page.keyboard.press('Enter');
            assert.equal(new URL(page.url()).hash, '#contato');
            const form = page.locator('.contact-compose');
            const context = form.locator('.contact-service-context');
            assert.ok((await context.textContent()).includes(copy[language].context));
            assert.ok((await context.textContent()).includes((await service.locator('summary h3').textContent()).trim()));
            assert.ok(await form.locator('#contact-name, #contact-message').evaluateAll(elements => elements.some(el => el === document.activeElement)));
            if (index === 0 && theme === 'light' && language === 'pt') {
              await form.locator('#contact-name').fill('Marina');
              await form.locator('#contact-message').fill('Quero organizar meu processo. Não apagar! <teste> & detalhes');
            }
            assert.equal(await form.locator('#contact-name').inputValue(), 'Marina');
            assert.equal(await form.locator('#contact-message').inputValue(), 'Quero organizar meu processo. Não apagar! <teste> & detalhes');
            const link = new URL(await form.locator('.compose-send').getAttribute('href'));
            const payload = link.searchParams.get('text');
            assert.ok(payload.includes(copy[language].context));
            assert.ok(payload.includes('Não apagar! <teste> & detalhes'));
            assert.equal(link.hostname, 'wa.me');
            assert.ok(await form.evaluate(el => el.scrollWidth <= el.clientWidth + 1));
            if (language === 'pt' && theme === 'light' && index === 0) await page.screenshot({ path: `${directory}/contact-${width}.png` });
            await context.getByRole('button', { name: copy[language].remove, exact: true }).click();
            assert.equal(await form.locator('.contact-service-context').count(), 0);
            assert.ok(!new URL(await form.locator('.compose-send').getAttribute('href')).searchParams.get('text').includes(copy[language].context));
            assert.ok((await form.locator('#contact-message').inputValue()).includes('Não apagar!'));
            await page.goBack();
            await page.locator('#window-servicos.is-active').waitFor({ state: 'visible' });
          }
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
          results.push({ width, height, theme, language, services: 4, messagePreserved: true, keyboard: true, overflow: false });
        }
      }
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}x${height}: 4 services, PT/EN/ES, both themes, keyboard, history, draft preservation and WhatsApp URL`);
      await page.close();
    }
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    await page.goto(base + '/#servicos');
    await page.waitForFunction(() => document.documentElement.dataset.ready === 'true');
    await page.locator('.service-contact').first().click();
    await page.locator('#contact-message').fill('Texto preservado durante a troca de idioma.');
    await chooseLanguage(page, '.workspace-tools', 'en');
    assert.ok((await page.locator('.contact-service-context').textContent()).includes(copy.en.context));
    assert.equal(await page.locator('#contact-message').inputValue(), 'Texto preservado durante a troca de idioma.');
    await page.goBack();
    await page.locator('.workbench-start').first().click();
    const editor = page.locator('.lab-workbench:visible');
    await editor.locator('.guide-fill').click();
    const code = await editor.locator('textarea').inputValue();
    await editor.locator('.editor-close').click();
    await page.locator('.service-contact').first().click();
    await page.goBack();
    await page.locator('.workbench-start').first().click();
    assert.equal(await page.locator('.lab-workbench:visible textarea').inputValue(), code);
    await page.close();
    fs.writeFileSync(`${directory}/results.json`, JSON.stringify({ scenarios: results.length, results, normalMotion: true, languageSwitchPreservesDraft: true, editorPreservesCode: true }, null, 2) + '\n');
    console.log('PASS normal motion, live language change and editor code preservation');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
