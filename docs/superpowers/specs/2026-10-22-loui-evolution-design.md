# Evolução da loui

## Direção aprovada e público

Executar a evolução na ordem recomendada: clareza comercial, prova de capacidade,
qualidade de uso, base operacional e novas experiências. Público amplo, sem
priorizar um segmento, conforme escolha expressa do usuário em 22/10/2026.
Organizar a comunicação por necessidades, sem restringir setor ou porte.

Preservar terminal central, marca minúscula, frase institucional, Svelte no site,
Vue na demonstração web, temas e PT/EN/ES. Sem navegação redundante ou footer
institucional. Demonstrações permanecem identificadas como locais.

## Estratégia de branches

Branches sequenciais por etapa; subdividir quando os tipos de mudança exigirem
revisão independente. Não colocar todas as funcionalidades futuras na primeira.
Cada etapa registra implementação, validações e pendências. Criação de branches
está autorizada; commits, integração e publicação exigem autorização correspondente.
Sem commits, manter o trabalho na branch corrente e não simular isolamento trocando
apenas o nome de uma branch com alterações não commitadas.

| Ordem | Branch proposta | Entrega |
| --- | --- | --- |
| 1 | evolution/01-commercial-clarity | Proposta de valor, serviços por problema, entregas e próximo passo |
| 2 | evolution/02-capability-evidence | Casos autorais verificáveis, autoria, limites e demonstrações contextualizadas |
| 3 | evolution/03-usability | Percurso até contato, feedback de formulário, teclado, foco, toque e responsividade |
| 4a | evolution/04-security | Mapa de conexões externas e política de segurança compatível com as experiências |
| 4b | evolution/04-performance | Carregamento sob demanda e resiliência com medições antes/depois |
| 4c | evolution/04-quality-discovery | Verificações, metadados, compartilhamento e indexação |
| 5 | evolution/05-guided-diagnosis | Diagnóstico local, demonstração pertinente e briefing editável |

Mensuração externa, domínio, e-mail da marca e integrações reais ficam condicionados
à definição dos serviços e acessos. Não instalar rastreamento nem contratar recursos
como consequência automática deste roteiro. Preços, prazos de resposta, suporte,
resultados e projetos de clientes não serão inventados.

## Etapa 1: alternativas e decisão recomendada

1. Ajuste contextual: explicar a proposta na abertura existente e detalhar cada
   serviço dentro da janela atual. Menor ruptura e percurso coerente com a loui.
2. Entrada guiada por perguntas: ajuda a descobrir necessidades, mas antecipa o
   diagnóstico previsto para a etapa 5 e aumenta o trabalho inicial.
3. Página comercial adicional: facilita leitura linear, mas divide navegação e
   pode duplicar a experiência. Não recomendada nesta etapa.

Recomendação: alternativa 1. Sem redesenhar o ambiente ou acrescentar outra navegação.

## Etapa 1: conteúdo e interação a revisar

Mensagem junto ao terminal: “Desenvolvemos sites e sistemas, conectamos ferramentas
e automatizamos processos. Explore uma solução ou conte o que precisa melhorar.”

Manter os comandos e sugestões atuais. A abertura deve explicar a atuação antes
de exigir que a pessoa explore serviços. Conforme correção expressa posterior do
usuário, a navbar foi removida: contato permanece nos comandos do terminal e nas
ações de cada serviço. A mensagem foi encurtada à primeira frase para evitar repetição.

Em Serviços, apresentar quatro necessidades:

- Desenvolvimento web: “Sua ideia precisa de um site ou sistema?” Entregas possíveis:
  sites, plataformas e aplicações sob medida. Começamos pelo objetivo e por quem usa.
- Automação e IA: “Um trabalho repetitivo está tomando tempo?” Entregas possíveis:
  fluxos automatizados e assistentes, com definição dos pontos de revisão humana.
- Integrações: “As informações precisam passar de uma ferramenta para outra?”
  Entregas possíveis: conexões por APIs e webhooks, conforme acessos e recursos disponíveis.
- Consultoria: “Você precisa decidir o que construir primeiro?” Entregas possíveis:
  diagnóstico do processo, prioridades e proposta de próximos passos.

Para cada necessidade, separar descrição, entregas possíveis e demonstração local.
Adicionar acesso contextual ao contato com mensagem editável sobre o serviço escolhido.
Abrir o contato pela mesma função de navegação do workspace, preservando histórico,
foco e conteúdo já digitado. Não sobrescrever um briefing existente silenciosamente.

Fluxo: terminal → Serviços → necessidade → demonstração opcional ou contato.
Consultar traduções autorais para os textos novos; não traduzir tokens de código.
Usar os componentes e estilos existentes, sem reformulação visual nesta etapa.

## Limites da etapa 1

Sem novos casos, diagnóstico, backend, estimativas financeiras, alterações de rádio,
execução arbitrária de código, refatoração abrangente ou publicação. Distinguir
tipos possíveis de entrega de compromissos comerciais ainda não estabelecidos.

## Critérios de aceitação

- Proposta compreensível na abertura, sem abrir uma janela.
- Quatro necessidades e entregas coerentes, sem promessas não verificadas.
- Contato contextual funciona por clique e teclado, sem perder mensagem anterior.
- Demonstrações e prévias continuam funcionando, com código preservado.
- PT/EN/ES, temas claro/escuro e redução de movimento no escopo alterado.
- Sem corte de conteúdo em desktop, tablet, 320×568 e paisagem 844×390.
- npm run check e npm run build aprovados; teste do fluxo e screenshots inspecionadas.

## Estado

Desenho da etapa 1 aprovado pelo usuário. Implementado na branch
evolution/01-commercial-clarity: proposta junto ao terminal, quatro serviços por
necessidade, entregas possíveis e contato contextual traduzido e removível.
O contexto é separado do texto livre: acompanha o link do WhatsApp e não sobrescreve
nome ou mensagem, inclusive durante mudanças de assunto ou idioma.

Validação: check sem erros/avisos e build aprovado; 24 cenários de idioma, tema e
viewport, quatro serviços por cenário, teclado, histórico, preservação de briefing
e código. Editores e três prévias existentes verificados nos quatro tamanhos.
Evidências em docs/validation/commercial-clarity. Etapas seguintes não implementadas.
Nenhum commit, merge, push ou deploy realizado.

Correção de responsividade solicitada após a entrega: abertura sem rolagem,
navbar removida, controles compactos e composição por largura e altura.
A decisão de aceitar rolagem na abertura foi substituída. Ver
docs/design/2026-10-22-compact-workspace.md e docs/validation/compact-workspace/REVIEW.md.

## Atualização da execução

Após autorização expressa do usuário, todas as mudanças da etapa 1 foram commitadas
em 9142fe8 e integradas localmente à main pelo merge ec2445a, sem conflitos.
Sem push ou deploy. A etapa 2 foi implementada na branch evolution/02-capability-evidence,
com três estudos autorais das demonstrações existentes e validação própria. Sua
revisão está em docs/validation/capability-evidence/REVIEW.md; não foi integrada à main.
Próxima etapa do roteiro: qualidade de uso e feedback do contato.

## Estado atual após publicação e próxima etapa

A etapa 2 foi commitada em `335c19a` e integrada à main em `bc9aea5`.
A branch da etapa e a main foram publicadas no origin e seus hashes conferidos.
Isso também publicou a integração anterior da etapa 1. Não foi feito deploy manual
nem verificação de produção nesta entrega.

A etapa 3 está implementada localmente em `evolution/03-usability`: feedback do
contato, validação acessível, continuação por Enter e retorno de foco das janelas.
Check, build e regressões aprovados. Revisão em
`docs/validation/contact-usability/REVIEW.md`. Ainda sem commit ou publicação desta etapa.
