# Projetos reais para a loui: propostas e prompts

Material de exploração, não uma ordem para implementar ou publicar todos os projetos. São três produtos independentes que podem se integrar depois. Os prompts abaixo podem ser usados em conversas/repositórios separados. Não alterar o portfólio de produção durante a construção desses aplicativos.

## De demonstração local a produto funcional

O que existe hoje já demonstra interação e regras. Para virar um produto utilizável, precisa persistir dados no servidor, controlar quem pode acessá-los, tratar falhas e concluir uma tarefa real entre pessoas/dispositivos. IA, pagamentos e WhatsApp não são requisitos para a primeira versão.

Três caminhos possíveis:

- Aplicativos separados: melhor recorte para entregar, testar e mostrar cada competência. Recomendado.
- Um único sistema com agenda, atendimento e CRM: favorece experiência integrada, mas amplia permissões, regras e manutenção antes da primeira entrega.
- Configurar ferramentas existentes: serve para validar uma necessidade rapidamente e pode render um case de integração; deve ser apresentado como implantação/integração, sem atribuir autoria do produto de terceiros à loui.

Primeiro piloto sugerido: a própria loui. Sincronia organiza solicitações comerciais; Luz permite agendar uma conversa; Atende recebe e responde mensagens do site. Depois, cada um pode ser adaptado a um piloto externo autorizado.

## Como usar os prompts

Use um projeto/repositório próprio por aplicativo. Se estiver começando sem stack definida, peça duas opções de arquitetura, custos operacionais e uma recomendação antes de configurar serviços. Os prompts não exigem um fornecedor específico. Na implementação, consultar documentação atual das tecnologias escolhidas. Não migrar o site Svelte da loui para acomodar esses aplicativos.

O primeiro objetivo é uma aplicação para uma organização. SaaS com cobrança, múltiplas empresas e autosserviço é outra etapa. Ainda assim, testar autorização por registro e não confiar somente em esconder botões.

## Prompt 1: Luz, agenda de um estúdio

```text
Quero construir o Luz, um aplicativo real de agendamento para um pequeno estúdio fotográfico. Ele será um projeto autoral da loui, desenvolvido em repositório separado do portfólio. A referência de domínio é a demonstração atual: escolher sessão, data e horário e conferir o preço antes de confirmar.

Comece apresentando o MVP, a modelagem dos dados, duas opções de arquitetura e seus custos operacionais, com uma recomendação. Se já houver código, inspecione-o e preserve o que funciona. Confirme as decisões estruturais antes de implementar; depois entregue por etapas testáveis. Consulte a documentação atual das tecnologias adotadas.

MVP para um estúdio:
- Página pública com serviços, duração, preço e horários realmente disponíveis.
- Reserva com dados mínimos de contato e confirmação persistida no servidor.
- Painel autenticado para cadastrar serviços, horários de trabalho, intervalos, bloqueios e consultar reservas.
- Cancelamento e reagendamento com regras explícitas e acesso seguro.
- Estados de reserva confirmada, cancelada, concluída e ausência; sem pagamento nesta versão.

Regras essenciais:
- Impedir no banco reservas sobrepostas para o mesmo recurso, inclusive quando duas pessoas confirmam ao mesmo tempo. Não basta consultar disponibilidade antes de inserir.
- Considerar duração, intervalo entre sessões, antecedência mínima e fuso horário configurado pelo estúdio. Armazenar instantes de forma consistente e exibir no fuso correto.
- Guardar valores monetários em centavos e preservar o preço contratado na reserva, mesmo se o catálogo mudar depois.
- Validar tudo no servidor, impedir duplicação por reenvio e restringir acesso às reservas.
- O cliente não pode listar reservas de outras pessoas. Links de gerenciamento devem ser não enumeráveis, limitados e revogáveis.

Direção visual: agenda e seleção de sessão no centro da interface. Evitar dashboard de cards genéricos. Boa experiência no celular, foco visível e estados de carregamento, indisponibilidade e erro.

Critérios de aceite: reservar em um navegador e ver a reserva no painel em outro; recarregar sem perder dados; duas confirmações concorrentes não ocupam o mesmo período; cancelar libera o horário; reagendar não perde a reserva original se a nova escolha falhar.

Entregar migrations, configuração por variáveis de ambiente, testes das regras críticas e README para execução e publicação. Notificação por e-mail é uma etapa separada: sem provedor configurado, informar claramente que ela não foi enviada. Nunca simular envio bem-sucedido.

Fora do MVP: marketplace, aplicativo nativo, pagamentos, sincronização de calendários externos e múltiplos estúdios.
```

Possível primeiro uso: agenda de reuniões da própria loui, com um único serviço gratuito. Para demonstrar catálogo e preços, manter um ambiente de demonstração separado ou fazer um piloto autorizado com um estúdio.

## Prompt 2: Atende, atendimento real pelo site

```text
Quero construir o Atende, um sistema real de atendimento pelo site para uma pequena equipe. Ele será um projeto autoral da loui em repositório próprio. Quero começar com canal web funcional; WhatsApp e IA ficam para versões posteriores.

Antes de implementar, apresente o fluxo completo de visitante e atendente, o MVP, as entidades, as regras de acesso e duas opções de arquitetura com uma recomendação. Se houver código existente, revise antes de substituir. Consulte documentação atual e implemente em etapas testáveis após alinhar o desenho.

MVP:
- Widget ou página pública para iniciar uma conversa e enviar uma mensagem real.
- Protocolo e acesso protegido para o visitante consultar sua conversa e responder.
- Painel autenticado da equipe com filas de novas, em atendimento, aguardando cliente e resolvidas.
- Atribuição de responsável, histórico persistente e respostas humanas.
- Regras simples e explícitas por assunto para categorizar e encaminhar solicitações.
- Resposta automática inicial identificada como automática, sem fingir compreensão por IA.

Regras essenciais:
- Mensagens precisam ser persistidas no servidor e aparecer para o outro participante. Um registro visual local não conta como atendimento real.
- Impedir que visitantes leiam outras conversas ou escolham identidades de atendentes.
- Separar mensagens públicas de notas internas, inclusive na API, e validar autorização em cada operação.
- Reenvio da mesma mensagem não pode duplicar seu conteúdo. Mostrar falhas e permitir tentar novamente sem perder o texto.
- Evitar disputa de atribuição entre atendentes e registrar mudanças de responsável e status.
- Definir horário de atendimento e uma resposta honesta fora do expediente.
- Adicionar controles de abuso e limites de mensagem. Anexos ficam fora desta versão.

Direção visual: fila legível e conversa como área principal. Estados de envio, erro, ausência de conversas e falta de responsável precisam ser claros. Teclado e celular devem permitir atender sem depender de hover.

Critérios de aceite: visitante e atendente em navegadores diferentes trocam mensagens; histórico resiste à recarga; atribuição e resolução funcionam; uma sessão sem autorização não acessa mensagens nem notas internas; falha de rede não produz confirmação falsa de envio.

Entregue migrations, testes relevantes, configuração de ambiente, README e um roteiro de piloto. Não inclua modelo de IA, conector de WhatsApp ou envio externo como se estivessem ativos. Qualquer integração futura precisa ter configuração e teste reais antes de aparecer como disponível.

Fora do MVP: omnichannel, chatbot generativo, campanhas, anexos e cobrança por atendente.
```

Possível primeiro uso: atendimento de interessados no próprio site da loui, com aviso de disponibilidade real da equipe.

## Prompt 3: Sincronia, CRM enxuto com entrada de leads

```text
Quero construir o Sincronia, um CRM real e enxuto para organizar os contatos e oportunidades comerciais da loui. O produto deve também demonstrar uma integração real: uma solicitação enviada por um formulário chega ao CRM e pode ser acompanhada até o fechamento. Repositório separado do portfólio.

Comece apresentando o MVP, o fluxo de entrada, a modelagem de contatos e oportunidades, as permissões e duas opções de arquitetura com uma recomendação. Inspecione código existente antes de trocar tecnologias. Consulte documentação atual e avance em etapas verificáveis após alinhar o desenho.

MVP para uma organização:
- Painel autenticado com contatos, empresas opcionais e oportunidades.
- Funil: novo contato, qualificação, proposta enviada, negociação, ganho e perdido.
- Responsável, próxima ação, data de acompanhamento, notas e histórico.
- Lista com busca e filtros; mudança de etapa por controle acessível, com drag-and-drop apenas como alternativa.
- Formulário público próprio que crie uma solicitação real no backend, com identificação de origem.
- Uma API de entrada documentada e um consumidor real de teste. Não construir um editor universal de integrações.

Regras essenciais:
- Contato e oportunidade são entidades distintas: a mesma pessoa pode ter oportunidades diferentes.
- Validar entradas no servidor; autenticar integrações quando aplicável; manter credenciais fora do frontend.
- Repetir uma requisição com a mesma chave de idempotência não cria outro registro.
- Normalizar e-mail e telefone para buscar possíveis duplicados, mas não mesclar pessoas automaticamente por semelhança de nome ou telefone. Oferecer revisão explícita.
- Mostrar registros com erro de importação ou entrada em uma fila de pendências, com motivo e possibilidade de correção. Não descartar silenciosamente.
- Registrar origem, autor e data das mudanças relevantes. Não tratar atualização visual do card como prova de gravação no banco.
- Números e indicadores precisam vir dos dados reais, inclusive nos estados vazios.

Direção visual: visão operacional, com foco em próxima ação e acompanhamento. Não preencher a home com gráficos sem utilidade. Experiência responsiva, filtros claros, foco visível e erros recuperáveis.

Critérios de aceite: enviar o formulário em um navegador e encontrar a oportunidade no painel em outro; mover etapa e recuperar após recarregar; agendar e concluir acompanhamento; repetir requisição sem duplicar; revisar um duplicado; impedir acesso não autenticado ao painel e aos dados pessoais.

Entregue migrations, exemplos de requisição sem segredos, testes críticos, README e um roteiro de demonstração. Não conectar contas reais de terceiros nem importar dados de clientes sem autorização específica.

Fora do MVP: CRM imobiliário completo, ERP, automação visual, campanhas em massa, enriquecimento de contatos e múltiplas empresas clientes.
```

Possível primeiro uso: acompanhar os próprios pedidos de orçamento e propostas da loui. O formulário atual do portfólio continua intacto até haver integração explicitamente autorizada e validada.

## Integração depois de cada MVP funcionar

Fluxo proposto: landing page envia solicitação ao Sincronia; uma reunião é marcada no Luz; uma dúvida é tratada no Atende. Os sistemas compartilham referências de contato, não acesso irrestrito aos bancos uns dos outros.

Antes de automatizar, definir qual sistema é responsável por cada informação. Usar contratos pequenos, identificadores estáveis, eventos idempotentes e logs com dados mínimos. Não perder um pedido porque outro aplicativo ficou indisponível: registrar entrega pendente e permitir reprocessamento.

## Landing pages para acompanhar os três produtos

| Página | Público e proposta | Conteúdo que precisa existir | CTA honesto |
|---|---|---|---|
| Luz | Estúdios com reservas por mensagem | Agenda real, serviços, fluxo de reserva e limites do piloto | Testar uma reserva de demonstração |
| Atende | Pequenas equipes que recebem solicitações pelo site | Conversa real de teste, fila, responsável e horário de atendimento | Abrir uma conversa de demonstração |
| Sincronia | Prestadores de serviço que acompanham orçamentos | Entrada por formulário, próxima ação e oportunidade no funil | Testar a entrada de um pedido |

Enquanto os produtos não tiverem clientes, preços ou disponibilidade comercial definidos, omitir essas alegações. Um CTA de lista de interesse só deve dizer que cadastrou alguém depois de persistir o registro.

## Outras ideias de landing pages

| Conceito autoral | Direção própria | Interação útil | Evolução para aplicação |
|---|---|---|---|
| Estúdio de fotografia | Portfólio fotográfico com imagens licenciadas e créditos reais | Escolher ensaio e consultar horários | Luz |
| Marcenaria sob medida | Materiais, processo e ambientes com autoria identificada | Briefing de ambiente, medidas e referência | Orçador e CRM |
| Coworking local | Planta, ambientes, localização e regras | Comparar planos sem esconder condições e solicitar visita | Reserva de salas |
| Pequeno evento ou workshop | Programação, local e organizador | Inscrição com capacidade e lista de espera reais | Check-in e gestão de inscrições |
| Consultoria B2B | Problemas atendidos, entregas e processo | Briefing e agendamento de diagnóstico | Sincronia + Luz |
| Produto de um maker | Fotografias do produto, medidas, materiais e processo de fabricação | Solicitar disponibilidade ou orçamento | Catálogo e pedidos |

Todas podem ser projetos autorais conceituais antes de existir um cliente. Identificar isso no portfólio e não inventar endereço, avaliações, prêmios, preços ou pessoas atendidas. Fotografias devem ter licença ou autorização. Se o formulário não estiver conectado, não anunciar envio bem-sucedido.

## Prompt reutilizável para uma landing page

```text
Crie uma landing page autoral para [escolha um conceito: estúdio fotográfico, marcenaria, coworking, evento, consultoria B2B ou produto de maker]. Antes de implementar, proponha um público específico, uma oferta e uma única ação principal. Explique por que a composição pertence a esse negócio.

Use conteúdo verificável fornecido pelo responsável. Se ainda for um conceito, identifique-o como projeto autoral e omita informações não disponíveis. Não invente clientes, métricas, depoimentos, preços, credenciais ou contatos. Não crie resultados de formulário fictícios.

Defina direção visual com referências distintas para composição, interação e responsividade. Use imagem real ou licenciada quando ela ajudar a compreender a oferta. Evite montar a página como hero genérico seguido de três cards iguais.

O CTA deve concluir uma tarefa útil: consultar horários, enviar briefing, solicitar visita ou inscrever-se. Desenhe estados de validação, envio, sucesso real e falha. Conecte o backend apenas depois de alinhar destino e regras de dados. Credenciais ficam no servidor.

Inclua metadata, carregamento eficiente, navegação por teclado, foco visível, contraste e responsividade. Teste 320, 390, 768 e 1440px, paisagem e reduced motion. Entregue uma página utilizável, um README e evidências visuais. Não publique nem envie mensagens externas sem a autorização correspondente.
```

Os campos entre colchetes deste prompt são escolhas para preencher antes de usá-lo, não lacunas de um projeto já aprovado.

## Novos projetos para o portfólio

| Projeto | Primeira entrega útil | Competência que demonstra | Escopo a evitar no início |
|---|---|---|---|
| Orçador de serviços | Briefing, itens, preço revisável e proposta exportável | Regras de preço, documentos e aprovação | Contratos e assinatura eletrônica |
| Inscrições para eventos | Formulário, limite de vagas, lista de espera e check-in | Concorrência, estados e operação mobile | Marketplace e pagamentos |
| Validador de planilhas | Importação, erros por linha e relatório de correções | Processamento de arquivos e qualidade de dados | Consertar dados silenciosamente |
| Portal de acompanhamento | Solicitação, etapas, documentos e mensagens por cliente | Permissões por registro e transparência de processo | Gestão corporativa completa |
| Reserva de equipamentos | Catálogo, disponibilidade, retirada e devolução | Inventário e conflitos de períodos | Logística e rastreamento físico |
| Aprovação de conteúdo | Versões, comentários e aprovação identificada | Histórico, colaboração e workflow | Editor gráfico próprio |
| Integração formulário → CRM | Entrada autenticada, mapeamento, logs e reprocessamento | APIs, idempotência e observabilidade | Integração universal com qualquer fornecedor |
| Organizador de documentos | Upload restrito, classificação revisável e busca | Armazenamento, autorização e processamento | Assinatura ou análise jurídica |

## Ordem sugerida

1. Uma landing page de oferta concreta com formulário real para exercitar publicação e captura.
2. Sincronia: usar os próprios pedidos e acompanhamentos da loui.
3. Luz: começar pela agenda de conversas da loui e depois adaptar ao estúdio.
4. Atende: começar pelo canal web e atendimento humano da loui.
5. Integrar os três apenas após cada fluxo funcionar isoladamente.
6. Acrescentar um projeto que mostre outra competência: validador de planilhas ou orçador.

Essa ordem é uma recomendação de escopo, não estimativa de prazo. Depende da disponibilidade de pessoas para usar e validar os aplicativos.

## Quando colocar no portfólio

- Conceito visual: imagem e estudo, explicitamente identificado como conceito.
- Aplicação funcional: banco, acesso, fluxo completo e ambiente próprio de demonstração verificados; pode ser um projeto autoral sem clientes.
- Piloto: alguém usa o sistema em uma operação real; relatar limites e o que foi observado, com autorização.
- Case de cliente: evidências e resultados reais, publicados somente com permissão e sem expor dados pessoais.

Para cada card: problema, público, o que está funcionando, uma screenshot do próprio produto, link público de teste e estudo das decisões. Manter o aplicativo privado de operação separado do ambiente de demonstração; não mostrar dados de clientes nem liberar a operação inteira a visitantes.

Modelo de texto: “Sincronia — projeto autoral funcional. Um pedido enviado pelo formulário é registrado como oportunidade, recebe responsável e próxima ação. Ambiente de demonstração com dados de exemplo.” Usar apenas depois de esse fluxo estar implementado e testado.

## Referências de comportamento consultadas

Referências para estudar fluxos, sem recomendação de comprar ou copiar os produtos:

- Cal.com, disponibilidade e intervalos: https://cal.com/pricing
- Chatwoot, regras e encaminhamento: https://app.chatwoot.com/hc/user-guide/articles/1677238266-lesson-4-complete-your-customer-engagement-suite
- Pipedrive, formulário alimentando contatos e oportunidades: https://support.pipedrive.com/en/article/web-forms

As propostas deste documento são da loui. As referências ajudam a identificar tarefas e limites; não comprovam que nossos aplicativos já os executam.
