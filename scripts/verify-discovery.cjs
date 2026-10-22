const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const {discovery}=await import('../src/content/discovery.js');
 const html=fs.readFileSync('dist/index.html','utf8'),preview=fs.readFileSync('dist/lab-preview.html','utf8');
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 assert.ok(html.includes(`href="${discovery.url}"`));
 assert.ok(!/name="robots"[^>]*noindex/.test(html));
 for(const property of ['og:type','og:title','og:description','og:url','og:image','og:image:alt'])assert.ok(html.includes(`property="${property}"`));
 assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
 assert.equal((html.match(/name="description"/g)||[]).length,1);
 assert.ok(html.includes(discovery.description.pt));
 assert.ok(!html.includes('hreflang='),'single address does not provide separate locale URLs');
 assert.match(preview,/name="robots" content="noindex"/);
 assert.ok(!preview.includes('rel="canonical"'),'preview must not canonicalize unrelated content to home');
 const robots=fs.readFileSync('dist/robots.txt','utf8');assert.match(robots,/Allow: \//);assert.ok(!robots.includes('Disallow: /'));assert.ok(robots.includes(discovery.url+'sitemap.xml'));
 const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,1);assert.ok(sitemap.includes(`<loc>${discovery.url}</loc>`));assert.ok(!sitemap.includes('lab-preview'));
 const image=fs.readFileSync('dist/'+discovery.image);assert.equal(image.subarray(1,4).toString(),'PNG');assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630);
 for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  if(/^[a-z][a-z\d+.-]*:/i.test(match[1]))continue;
  assert.ok(fs.existsSync(path.join('dist',match[1].split('?')[0])),`missing local asset ${match[1]}`);
 }
 const manifest=JSON.parse(fs.readFileSync('dist/.vite/manifest.json','utf8'));assert.ok(manifest['src/components/LabWorkbench.svelte'].isDynamicEntry);
 console.log('PASS built discovery: canonical, metadata, single locale URL, sharing PNG, sitemap, robots, preview noindex, local assets and lazy entry');
})().catch(error=>{console.error(error);process.exit(1)});
