<script>
  let { name } = $props();
  const paths = {
    inicio: 'M3 11 12 3l9 8M5 10v11h5v-7h4v7h5V10',
    servicos: 'm8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16',
    laboratorio: 'M9 3h6m-5 0v6L4 19q-1 2 2 2h12q3 0 2-2L14 9V3M7 15h10',
    stacks: 'm12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5',
    sobre: 'M8 3h8l5 9-5 9H8l-5-9 5-9Zm4 5v5m0 3v.1',
    contato: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
    redes: 'M14 3h7v7m0-7L10 14M10 4H3v17h17v-7',
    projetos: 'M3 6h7l2 3h9v12H3V6Zm0 0V3h7l2 3h9v3',
    radio: 'M3 14v-3a9 9 0 0 1 18 0v3M3 13h4v8H3v-8Zm14 0h4v8h-4v-8',
    terminal: 'm4 6 6 6-6 6m9 0h7',
  };
</script>
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={paths[name] || paths.servicos} /></svg>
