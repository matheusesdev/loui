// Regenerate the original loui sharing artwork. Uses the same local variable font.
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 const font=fs.readFileSync('public/fonts/Archivo-Variable.woff2').toString('base64');
 await page.setContent(`<style>@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${font}) format('woff2')}*{box-sizing:border-box}body{margin:0;background:#efeee9;color:#263336;font-family:Archivo,sans-serif;padding:62px 72px;width:1200px;height:630px}.brand{font-size:106px;letter-spacing:-8px;line-height:1;font-weight:600}.brand span{color:#28596b}h1{font-size:58px;line-height:1.12;letter-spacing:-2px;font-weight:500;margin:42px 0 36px;max-width:930px}.terminal{border:1px solid #c9cfcd;border-radius:13px;overflow:hidden;width:700px;background:#f8f8f5;box-shadow:0 12px 25px #26333610}.bar{padding:12px 18px;background:#e6e8e3;font-size:13px;color:#59696b}.prompt{padding:22px;font:18px Menlo,monospace;color:#28596b}.prompt span{color:#536267}footer{position:absolute;right:72px;bottom:67px;font-size:17px;color:#536267}</style><div class="brand">loui<span>.</span></div><h1>Entre a ideia e o possível,<br>existe código.</h1><div class="terminal"><div class="bar">loui — Terminal</div><div class="prompt">loui / <span>desenvolvimento &amp; automação</span></div></div><footer>loui-phi.vercel.app</footer>`);
 await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'public/images/loui-share.png'});
 console.log('Created public/images/loui-share.png (1200x630)');
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exit(1)});
