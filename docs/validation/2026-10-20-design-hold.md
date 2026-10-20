# loui — revisão independente após rejeição visual

## Decisão atual: HOLD

A versão atual funciona, mas não atende à direção estética pedida pelo usuário. Os PASS anteriores em review.md devem ser lidos como evidência funcional e entrega para inspeção; não sustentam aprovação estética. Esta decisão substitui a aprovação visual anterior.

## Método e recursos realmente usados

- Agente separado `ui_finish_review`: leu integralmente o perfil UI Finish-Gate Reviewer do agency-agents; examinou capturas desktop/mobile e os quatro arquivos de estilos; devolveu HOLD com achados verificáveis. Não editou código.
- Agente separado `ui_direction`: revisão de direção a partir dos perfis UI Designer e UX Architect. Não autorizado a editar código.
- UI/UX Pro: não encontrado nos diretórios locais de skills, no catálogo de ferramentas disponíveis ou na busca de plugins desta sessão. A fonte pública UI/UX Pro Max foi localizada e suas instruções lidas; isso não equivale à instalação da skill nem à execução de seu motor de busca. Diretrizes gerais foram consultadas como fallback, sem alegar resultados de busca do motor.
- Não é necessário incorporar Backend Architect, AI Engineer ou Prompt Engineer a uma correção de identidade visual de um site estático. Esses perfis permanecem reservados às respectivas funcionalidades.

## Achados independentes

1. Cabeçalho com cápsulas dentro de cápsulas: contêiner, navegação, idioma, tema e CTA repetem acabamento de landing page SaaS. Correção proposta: cabeçalho integrado à composição, navegação tipográfica e controles discretos, com uma única ação dominante.
2. Demonstrações confinadas em cartões: cantos de 24 px, dot-grid, sombras e janelas flutuantes competem com a transformação. Correção proposta: palco aberto para os serviços; manter controles reais, estados e reset.
3. Títulos grandes com estrutura repetida e palavra final colorida não constituem uma identidade tipográfica própria. Correção proposta: hierarquia e composições diferentes por seção, ligadas à entrada pela interação e pelo desenho das letras.
4. Ritmo mobile excessivamente repetido: blocos de serviços, grade de processo, duas marcas gigantes e formulário indisponível prolongam a leitura sem variar a experiência. Correção proposta: alternar leitura e participação; processo conectado; contato indisponível compacto.

## Preservar

- Referência Unseen pela entrada, tipografia, movimento e continuidade, sem copiar tema ou recursos.
- Marca loui em minúsculas, frase aprovada, minimalismo, dark/light, azul-gelo pontual e PT/EN/ES.
- Troca de idioma perceptível, teclado, toque, movimento reduzido e reinício corrigido.
- Conteúdo honesto sem projetos, clientes ou números inventados.

## Condições para nova aprovação

Comparar entrada, menu e serviço interativo em desktop e 390 px, nos dois temas. Inspecionar estados inicial, execução, final, reinício e textos longos em espanhol. Examinar a hierarquia também sem cor. A aprovação funcional não substitui a avaliação de identidade.

Não houve nova alteração visual nesta rodada de auditoria.

## Parecer do segundo agente: UI Designer + UX Architect

O agente `ui_direction` concluiu que a composição inicial foi coberta por componentes genéricos de SaaS. Propôs três decisões para revisão do usuário:

1. Cabeçalho plano, integrado à composição, com navegação tipográfica e utilidades discretas. Idioma como lista alinhada ao controle, preservando alvos de toque e foco.
2. Um palco aberto para os serviços, com índice e demonstração ampla do serviço selecionado, sem cartão envolvente. Ações acessíveis por botão, toque e teclado; reinício separado da ação principal.
3. Um traço condutor como assinatura entre entrada, serviços e contato. Azul reservado a estados e ao traço, com tipografia e composição variando entre seções. Retirar orbitais decorativos e palavras destacadas apenas por enfeite.

Critério adicional: a composição deve ter identidade mesmo sem animação; ao ativar o movimento, a continuidade precisa ser reconhecível. Isso é uma proposta de redesenho, não uma implementação nem um resultado aprovado.

## Fontes

- https://github.com/msitarzewski/agency-agents/blob/main/design/design-ui-finish-gate-reviewer.md
- https://github.com/msitarzewski/agency-agents/blob/main/design/design-ui-designer.md
- https://github.com/msitarzewski/agency-agents/blob/main/design/design-ux-architect.md
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md
