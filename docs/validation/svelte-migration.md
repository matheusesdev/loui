# Migração incremental para Svelte — 20/10/2026

Histórico: para a versão atual com stacks, contato e rádio, ver [desktop-review.md](desktop-review.md).

Autorização: adoção de Svelte para a próxima evolução da loui.

Implementado: Svelte 5 + Vite, lockfile, build estático, componentes Home, Dock e WindowTitlebar, estado reativo por instância para janelas e seleção ativa. O dock renderiza os estados aberto/minimizado e os acessos de retomada. Home e Dock traduzem pelo estado reativo; o tradutor DOM ignora essas duas superfícies para evitar duas fontes de atualização do mesmo texto.

Preservado: controlador de drag/foco/rotas, demonstrações conceituais, introdução, temas, terminal, conteúdo institucional e fallback sem JavaScript. Esta é uma migração incremental, não uma reescrita integral de todos os módulos. O refinamento visual macOS e as novas superfícies da proposta continuam pendentes.

Verificação executada:

- `npm run check`: zero erros e avisos.
- `npm run build`: build estático gerado em dist.
- `scripts/verify-workspace.cjs`, contra Vite: 12 grupos aprovados, sem erros de página ou respostas HTTP com erro. Inclui sete tamanhos, teclado, toque emulado, idiomas, reset, drag, retomada, projetos condicionais e fallback.
- `scripts/verify-build.cjs`, contra preview: entrada compilada, tradução reativa, demonstração preservada ao minimizar/retomar e assets públicos.

Evidências: workspace-results.json e svelte-build-results.json nesta pasta. Não houve deploy. Testes emulados não substituem dispositivos físicos ou leitores de tela.
