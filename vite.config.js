import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { cpSync } from 'node:fs';
import { discovery } from './src/content/discovery.js';

export default defineConfig({
  build: { manifest: true, rollupOptions: { input: { main: 'index.html', preview: 'lab-preview.html' } } },
  plugins: [svelte(), {
    name: 'loui-discovery',
    transformIndexHtml(html, context) {
      if(context.path !== '/' && context.path !== '/index.html')return;
      const meta=(property,content)=>({tag:'meta',attrs:{property,content},injectTo:'head'});
      return {html:html.replace(/<meta name="description"[^>]*>/,''),tags:[
        {tag:'meta',attrs:{name:'description',content:discovery.description.pt},injectTo:'head'},
        {tag:'link',attrs:{rel:'canonical',href:discovery.url},injectTo:'head'},
        ...Object.entries({'og:type':'website','og:site_name':'loui','og:title':discovery.title,'og:description':discovery.description.pt,'og:url':discovery.url,'og:locale':'pt_BR','og:image':new URL(discovery.image,discovery.url).href,'og:image:type':'image/png','og:image:width':'1200','og:image:height':'630','og:image:alt':discovery.imageAlt}).map(([key,value])=>meta(key,value)),
        ...Object.entries({'twitter:card':'summary_large_image','twitter:title':discovery.title,'twitter:description':discovery.description.pt,'twitter:image':new URL(discovery.image,discovery.url).href,'twitter:image:alt':discovery.imageAlt}).map(([name,content])=>({tag:'meta',attrs:{name,content},injectTo:'head'})),
      ]};
    },
    generateBundle() {
      this.emitFile({type:'asset',fileName:'robots.txt',source:`User-agent: *\nAllow: /\n\nSitemap: ${discovery.url}sitemap.xml\n`});
      this.emitFile({type:'asset',fileName:'sitemap.xml',source:`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${discovery.url}</loc></url></urlset>\n`});
    },
  }, {
    name: 'loui-content-assets',
    apply: 'build',
    closeBundle() { cpSync('public', 'dist/public', { recursive: true }); },
  }],
  // Preserve existing /public/... asset URLs in both development and build.
  publicDir: false,
});
