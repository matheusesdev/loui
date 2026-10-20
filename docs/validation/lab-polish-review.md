# Revisão do acabamento do laboratório

Escopo: janela que apresenta as experiências e editor. As três prévias de produto
permanecem com o comportamento já aprovado. Direção: `docs/design/LAB-WORKSPACE.md`.

Skills aplicadas: frontend-design, UI/UX Pro Max e web-design-guidelines.
As consultas de UX reforçaram hierarquia e foco visível; descartada a recomendação
genérica de breadcrumbs de navegação, pois o editor não tem uma árvore de páginas.
O caminho no topo descreve o projeto/arquivo, sem fingir ser uma navegação funcional.

## Revisão por arquivo

- `src/components/LabInvitation.svelte`: apresentação específica de reserva,
  atendimento e CRM; ilustrações de contexto escondidas da árvore acessível;
  uma ação real para abrir o editor. No celular, ação acompanha a descrição.
- `src/components/LabIcon.svelte`: SVGs consistentes, decorativos e aria-hidden.
- `src/components/LabWorkbench.svelte`: dialog nomeado, controles nativos,
  estado de seleção nos arquivos, inputs com nome e label; Ctrl/Cmd+Enter executa;
  Escape devolve ao laboratório. Números de linha acompanham rolagem vertical.
- `src/styles/lab-polish.css`: foco do campo indicado na área de edição, sem
  borda interna pesada; estados de seleção, contraste e reduced motion;
  layout compacto no celular. Trechos longos têm rolagem interna de código.

## Evidências

- `npm run check`: zero erros e avisos.
- `npm run build`: aprovado.
- `scripts/verify-lab-polish.cjs`: quatro seleções em três idiomas e dois temas;
  teclado, abertura/fechamento, troca de arquivos, exemplo, reset e erro de validação;
  ação de começar visível em 390×844. Resultados em `lab-polish-results.json`.
- `scripts/verify-compact-locales.cjs`: orientação cabe em 320×568 nos três idiomas.
- `scripts/verify-external-preview.cjs`: execução e abertura da prévia em outra aba,
  preservação do código, retorno ao editor, recarga e entrada inválida.
- Capturas de desktop e celular: `lab-polish-*.png` e `editor-polish-*.png`.
  Inspecionadas para hierarquia, legibilidade e acesso à ação principal.

Validação em Edge/Chromium automatizado. Não representa teste em todos os aparelhos
físicos nem certificação de acessibilidade. O editor continua sendo uma experiência
guiada inspirada em VS Code, e não uma cópia funcional de todo o aplicativo.
