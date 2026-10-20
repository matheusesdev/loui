# Direção das experiências — implementação

## Web: luz / estúdio fotográfico

Objetivo: reservar uma sessão de fotografia, em uma demonstração local.
Referências: Linear para clareza de estados e seleção; Mobbin para o fluxo de reserva.
Decisão: composição dividida entre uma natureza-morta desenhada em SVG e um formulário
de agenda. Fundo branco, texto #252a2b, azul #315a73, cinza #edf0f2, acento #f0bf63.
Tipografia: Archivo local para interface, Georgia apenas no título da marca editorial.
O elemento memorável é o estúdio ilustrado que muda de iluminação com a sessão escolhida.
O código define horas e valor/hora; computed calcula o orçamento. Escolher dia, horário
e nome gera uma confirmação local. Sem pagamentos ou reserva real.

## Automação: mesa de atendimento

Objetivo: acompanhar a mensagem atravessando uma regra até a resposta ou encaminhamento.
Referência: n8n para caminho de execução. Não copiar seu canvas.
Decisão: aplicação de atendimento, com lista de conversas, conversa em WhatsApp e
inspetor de execução. Verde de atendimento, superfícies claras e controles de execução.
A mensagem e a regra digitadas afetam o conteúdo, a prioridade e a entrega.
Selecionar uma etapa permite inspecionar sua entrada e saída. Pausar, avançar e repetir.

## Integração: pedido → CRM

Objetivo: perceber a transformação de um pedido em um registro de relacionamento.
Referência: Stripe para apresentação de dados e clareza de eventos.
Decisão: documento de pedido com itens, conexão central de mapeamento e registro CRM.
Azul de operação com superfícies brancas; hierarquia de documento e campos, sem hero.
O código escolhe campos de origem; selecionar um campo evidencia o par no destino.
Simular reenvio demonstra atualização sem criar um segundo registro.

## Crítica prévia

Descartada a sugestão automática do UI/UX Pro Max de narrativa acionada por scroll:
não serve à tarefa de reservar um horário. Adotadas seleção explícita, data localizada,
foco visível e limpeza de temporizadores. Nenhuma das três prévias deve virar uma
landing page de SaaS com métricas decorativas. Compartilhar acessibilidade e acabamento,
mantendo linguagem e composição específicas de cada atividade.
