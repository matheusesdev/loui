exports.chooseLanguage=async function(page,container,language,wait=true){
 await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 const picker=page.locator(`${container} .language-picker`);
 await picker.locator('.language-trigger').click();
 await picker.locator(`[data-language="${language}"]`).click();
 if(wait)await page.waitForFunction(code=>document.documentElement.lang===({pt:'pt-BR',en:'en',es:'es'}[code])&&!document.documentElement.classList.contains('language-changing'),language,{timeout:5000}).catch(async error=>{console.log({language,current:await page.locator('html').getAttribute('lang'),picker:await picker.textContent()});throw error;});
};
