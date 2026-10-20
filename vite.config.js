import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { cpSync } from 'node:fs';

export default defineConfig({
  plugins: [svelte(), {
    name: 'loui-content-assets',
    apply: 'build',
    closeBundle() { cpSync('public', 'dist/public', { recursive: true }); },
  }],
  // Preserve existing /public/... asset URLs in both development and build.
  publicDir: false,
});
