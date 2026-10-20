# loui — ambiente interativo aprovado

## Intenção aprovada

Experiência explorável inspirada no conceito do site Órbita, com uma atmosfera própria, minimalista e menos carregada. O visitante entra, escolhe o que abrir e experimenta conteúdos. A navegação contínua anterior passa a ser apenas fallback sem JavaScript.

## Escopo entregue

Entrada tipográfica; home; superfícies para Serviços, Laboratório, Sobre, Contato e Terminal; abrir/fechar/minimizar/retomar; expansão e movimentação desktop; navegação adaptada ao toque; três idiomas e dois temas; terminal de navegação opcional; projetos futuros condicionais e contatos pendentes honestos.

## Arquitetura

`workspace.js` monta o ambiente sobre o conteúdo semântico existente, antes de inicializar idiomas. As demonstrações são movidas para o Laboratório sem duplicação dos controladores. Estado de janela e de experimento permanece em memória; tema e idioma usam a persistência existente. O terminal usa uma lista explícita de comandos e não avalia código.

## Critérios

Navegação independente de comandos; controles acessíveis; superfícies recuperáveis ao redimensionar; estado preservado ao minimizar; cenas reiniciáveis; entrada direta por URL; sem dados ou resultados inventados. Validação e revisão independente registradas em `docs/validation/workspace-review.md`.

## Sequência executada

- [x] Reutilizar conteúdo e cenas; criar controlador de superfícies e laboratório.
- [x] Implementar estado, foco, URL, minimizar/retomar, expansão e arrasto.
- [x] Adicionar terminal de navegação com saída textual segura.
- [x] Traduzir novas strings e preservar temas, desfoque e movimento reduzido.
- [x] Adaptar superfícies ao celular e preservar fallback sem JavaScript.
- [x] Verificar funcionalidade e submeter capturas ao revisor independente.
- [x] Corrigir os achados de contenção de janelas e codificação/tradução; repetir testes.
