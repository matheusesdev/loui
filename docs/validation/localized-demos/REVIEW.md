# Idioma do hero, screenshots e ações das demonstrações

Branch: ui/bandeiras-idioma. As alterações anteriores das bandeiras e os demais arquivos locais foram preservados. Sem commit ou deploy.

## Diagnóstico reproduzido

Antes da correção, durante language-changing o título do hero tinha filter:none, enquanto a imagem em inglês ainda apontava para sincronia-crm.png. O hero Svelte não participava do bindText que cria spans localized no conteúdo legado, e a imagem não dependia do idioma. O seletor mobile passava animate=false. A preferência local de movimento reduzido também não era consultada pelo fluxo de idioma.

## Implementação

- Textos do hero participam do blur existente; o layout em bloco é preservado apesar da regra legada .workspace-home .localized{display:inline}.
- Troca mobile usa a mesma transição. Sistema e interruptor de animações desativam o blur e a troca é imediata. Revisão da troca rápida preservada pelo identificador de revisão existente.
- Nove screenshots de demos reais: três aplicações em três idiomas. scripts/capture-project-previews.cjs regenera as imagens em 1100×700, por meio das páginas locais. Sem montagem de interface fictícia ou edição de texto sobre imagem.
- Hero e projetos desktop/mobile compartilham a escolha da screenshot pelo idioma. O caminho pt original é preservado; en/es recebem sufixos próprios.
- Mensagem inicial do exemplo de atendimento acompanha o idioma. Código fornecido ou editado pelo visitante continua intacto; as chaves técnicas do JSON (como nome e etapa) representam os campos da origem e não são traduzidas. Nomes próprios e moeda original permanecem.
- Ações do hero, serviços e projetos têm ícone de tarefa, rótulo específico, nome do aplicativo e seta de nova aba, com foco e hover. Conteúdo HTML dessas ações vem apenas de dicionários fixos, nunca do código editável ou entrada do usuário.
- A inspeção visual identificou um conflito de precedência no botão dos serviços; o escopo da nova regra foi ajustado. A checagem de contraste foi acrescentada ao teste.

## Validação

npm run validate aprovado: Svelte, build e descoberta. Build repetido após o ajuste visual final. git diff --check aprovado. Lint dos arquivos principais sem ocorrências.

scripts/verify-localized-demos.cjs validou o artefato compilado em 4174, com Playwright/Chromium: 1440×900, 1024×768, 768×1024, 390×844, 320×568 e 844×390; três idiomas, dois temas e três demos, total de 108 combinações. Blur medido durante a troca; ausência de blur e troca imediata com movimento reduzido local e do sistema. Imagens carregadas por idioma, ações e popups reais, projetos e serviços verificados. CTA sem sobreposição à navegação, alvos de pelo menos 44px e contraste de texto mínimo de 4.5:1 no hero e no botão dos serviços. Sem overflow horizontal nem erros JavaScript.

Teste de segurança do artefato com headers reais aprovado: seis combinações de contato, 18 prévias, temas e layouts, fallback de catálogo, áudio de teste e bloqueio de script inline/conexão não autorizada. Nenhum contato real enviado.

Capturas inspecionadas: blur-desktop.png, hero-1440-light.png, hero-320-dark.png, service-actions.png e imagens reais de CRM em inglês e atendimento em espanhol. captures.json registra os títulos e idiomas efetivos das páginas capturadas; qa.json registra a matriz funcional.

Referência de revisão: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md . A extensão do blur existente é um pedido explícito do usuário; os controles continuam reconhecíveis e a preferência de movimento é respeitada.

Limites: os cenários usam tamanhos emulados, sem aparelho físico. A validação posterior em Firefox e WebKit está registrada em `docs/validation/browser-compatibility/`. O aviso preexistente do script clássico theme-init.js foi mantido porque ele executa antes da primeira pintura.
