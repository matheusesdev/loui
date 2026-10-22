# Etapa 2 — prova de capacidade

Continuação do roteiro aprovado, na branch evolution/02-capability-evidence.
Base: merge ec2445a da etapa 1, commit 9142fe8. Integração local autorizada pelo
usuário e concluída sem conflitos. Sem push ou deploy.

## Objetivo e direção

Substituir o estado vazio de Projetos por três estudos autorais das demonstrações
que já existem no repositório: luz / studio, atende / workflow e sincronia / crm.
Não são clientes nem entregas comerciais. A autoria é atribuída ao laboratório
da loui; não acrescentar nome de pessoa ou compromissos de suporte sem dados.

Cada projeto apresenta categoria, propósito e acesso à demonstração existente.
Um disclosure nativo “Por dentro do projeto” explica desafio, decisão, resultado
observável e limites. Não usar métricas, depoimentos, certificações ou screenshots
de clientes. Resultado significa comportamento demonstrado, não impacto comercial.

Layout: estudos lado a lado quando há espaço. Em telas compactas, três títulos
visíveis abrem um projeto por vez; em paisagem, mantê-los em colunas. Tipografia
Archivo e tokens atuais; separadores simples, sem novas superfícies decorativas.
A abertura compacta e o terminal não mudam. Conteúdo detalhado fica na janela Projetos.

## Evidências para o conteúdo

- src/vue-demo.js: seleção de sessão, data e horário, cálculo com hours/hourlyRate,
  validação e confirmação simulada. Sem reserva ou pagamento real.
- src/components/ProcessSimulation.svelte e src/lab-code.js: regra JSON com prioridade
  e ação responder/organizar, apresentação por etapas e mensagem simulada.
- Os mesmos arquivos: mapeamento de nome/empresa e etapa/origem para um CRM ilustrativo.
  Sem sincronização externa ou garantia de idempotência de um serviço real.

## Referências e interação

- Janela Serviços e LabInvitation.svelte: relação entre contexto e experiência guiada.
- details/summary de Serviços: disclosure por teclado e toque, mantendo o conteúdo
  disponível sem exigir uma segunda página ou navegação redundante.
- docs/design/REFERENCES.md: finalidades próprias para reserva, automação e integração.
- Web Interface Guidelines: foco, títulos, links e disclosures acessíveis.

Ao clicar em Experimentar demonstração, abrir Serviços no projeto correspondente e
seu editor existente. Fechar devolve foco ao iniciador dentro de Serviços; código e
mensagem permanecem preservados. URLs modificadas mantêm a abertura nativa do link.
Trocar idioma conserva estudos abertos. PT/EN/ES com tradução autoral dos conteúdos.
Redimensionar entre composição ampla e compacta redefine a abertura das fichas,
conservando os detalhes internos e o código das demonstrações.

## Plano e aceitação

1. Criar src/content/case-studies.js com dados e traduções verificados; ligar em site.js.
2. Ampliar projects.js para estudos opcionais, sem quebrar projetos externos simples.
3. Delegar a ação de demonstração no controlador do workspace usando o fluxo atual.
4. Acrescentar project-studies.css e textos de interface em locales.js; atualizar README.
5. Validar conteúdo, três editores, retorno de foco, código preservado, idioma/tema,
   desktop, tablet, celular e paisagem. Executar check, build e teste específico.

Sem dependências novas, alterações nas simulações ou integração externa.
Esta etapa fica disponível para revisão na própria branch, sem integração automática.
