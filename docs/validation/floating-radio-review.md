# Validação — terminal e rádio móveis

Branch `feat/terminal-radio-moveis`. Sem commit, merge ou deploy nesta etapa.

## Implementado

- Terminal arrastável no desktop, com espaço original preservado na página.
- Rádio arrastável por ponteiro e toque; redimensionamento e expansão recalculam limites.
- Setas e Shift+setas movem pelo cabeçalho; Home e botão restauram a posição.
- Camadas compartilhadas permitem trazer terminal, rádio e janelas à frente ao clicar.
- Novo player com seleção local e catálogo online, gêneros sugeridos e busca livre.
- Busca com cancelamento, cache, timeout e alternativa entre servidores da API.
- Escolher gênero não interrompe nem inicia áudio; selecionar emissora é ação explícita.
- Estados de carregamento, catálogo vazio/indisponível e falha de reprodução.
- Créditos das faixas locais preservados, com link para fornecedor do catálogo e emissora.

## Evidências

- `npm run check`: zero erros e avisos.
- `npm run build`: aprovado.
- `verify-floating-radio.cjs`: ponteiro, teclado, reset, limites de tela, seleção por
  gênero, catálogo vazio, falha de catálogo e de stream, seleção local, mudo e volume.
  API e áudio simulados nesse teste para resultados determinísticos.
- `verify-floating-radio-locales.cjs`: PT/EN/ES, claro/escuro e arraste por eventos
  de toque no Chromium, com reset e ausência de overflow horizontal.
- `verify-radio-live.cjs`: catálogo real retornou REYFM Lofi; o navegador disparou
  reprodução e o player mostrou “Ao vivo”. Registro em `radio-live-results.json`.
- `verify-external-preview.cjs`: fluxo das três experiências continua funcionando.
- Capturas de desktop e celular inspecionadas para hierarquia e legibilidade.

## Revisão de interface

- `src/components/Radio.svelte`: controles com labels, aria-expanded, aria-pressed,
  mensagens de estado e títulos de emissora tratados como texto.
- `src/styles/floating-radio.css`: foco visível, alvos próprios para controles,
  títulos longos truncados, limites do painel e movimento reduzido no indicador.
- `src/workspace.js`: terminal mantém estrutura e comandos, com cabeçalho de movimento
  e restauração separados dos campos de texto.
- `src/radio-browser.js`: somente streams HTTPS MP3 sem HLS, páginas de emissora
  validadas como HTTPS, nenhuma chave ou credencial no cliente.

Teste real não garante disponibilidade futura das emissoras. Não houve teste em
aparelhos físicos ou Safari; movimento por toque foi emulado em Edge/Chromium.
O player não identifica a música individual de um stream; mostra nome da emissora.
