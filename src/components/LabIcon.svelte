<script>
 let {name='code',size=18}=$props();
 const paths={code:'m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16',arrow:'M5 12h14m-5-5 5 5-5 5',file:'M14 3H5v18h14V8l-5-5Zm0 0v5h5',play:'m8 5 11 7-11 7V5Z',folder:'M3 6h7l2 3h9v11H3V6Z',back:'M19 12H5m5-5-5 5 5 5',window:'M3 4h18v16H3V4Zm0 5h18',check:'m5 12 4 4L19 6',flow:'M4 4h5v5H4V4Zm11 11h5v5h-5v-5ZM9 6h8v9M6 9v8h9',link:'m9 15 6-6m-7 3-2 2a4 4 0 0 0 6 6l3-3m-3-9 2-2a4 4 0 0 1 6 6l-3 3',spark:'m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z'};
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={paths[name]||paths.code}/></svg>
