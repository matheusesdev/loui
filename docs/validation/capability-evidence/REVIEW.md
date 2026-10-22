# Etapa 2 — prova de capacidade e portfólio

Branch evolution/02-capability-evidence, a partir da main no merge ec2445a.
O commit da etapa anterior é 9142fe8; ambos são locais, sem push ou deploy.

## Implementado

- Três estudos autorais ligados às demonstrações já existentes: luz / studio,
  atende / workflow e sincronia / crm.
- Desafio, decisão técnica, comportamento observável e limites em cada estudo.
- Identificação explícita de demonstração local; sem clientes, métricas ou relatos
  comerciais inventados. Dados e funcionalidades conferidos no código das experiências.
- Experimentar demonstração abre o editor correto em Serviços, sem apagar código.
- Estado dos detalhes preservado ao trocar idioma; dados autorais em PT/EN/ES.
- Notebook: três resumos lado a lado. Telas compactas: três títulos visíveis, com um
  projeto aberto por vez. Em paisagem baixa, títulos em colunas. Escolhas iniciais
  acessíveis sem rolagem em 320×480, 844×390 e 568×320 nos três idiomas.
- README atualizado para distinguir estudos autorais de futuras entregas comerciais.

## Verificação

- npm run check: zero erros e avisos; npm run build aprovado; git diff --check limpo.
- scripts/verify-case-studies.cjs: 24 combinações de quatro viewports, dois temas e
  três idiomas. Cada combinação percorre os três estudos e os respectivos editores
  e prévias: 72 percursos, com retorno de foco, código preservado e falta de overflow.
- Estado de disclosure preservado na troca de idioma e na navegação entre janelas.
- Verificação adicional das escolhas compactas em três tamanhos/três idiomas,
  com redimensionamento sem recarregar; percurso com movimento normal.
- Regressão de contato contextual: quatro tamanhos, temas/idiomas, texto preservado,
  remoção de contexto e link do WhatsApp corretos. Sem enviar mensagens.
- Capturas reais inspecionadas em notebook claro/escuro, celular e paisagem.

## Revisão de interface

- src/projects.js: details/summary nativos, rótulos de links identificam o projeto;
  textos inseridos com textContent e metadados separados do renderizador.
- src/workspace.js: acesso reutiliza o editor existente e respeita clique modificado
  em links, sem criar outra navegação ou prévia concorrente.
- src/styles/project-studies.css: foco visível e ações de 44 px ou mais; composição
  compacta por largura e altura. Detalhes longos têm rolagem dentro da janela.
- index.html: proposta factual e acesso pela janela Projetos, sem alteração da abertura.

Referência: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

## Limites

Validação em Google Chrome via Playwright, sem aparelhos físicos. Os estudos
demonstram o comportamento local do código; não são prova de operação em produção,
integração externa ou impacto comercial. Nenhum nome de pessoa ou cliente foi inferido.

Etapa 2 mantida para revisão nesta branch, sem commit, merge ou publicação automáticos.
