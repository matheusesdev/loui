// Authored studies of the local demos in this repository, never client work.
export const caseStudies = [
  {
    id: 'luz-studio', title: 'luz / studio', category: 'Desenvolvimento web', demoIndex: 0,
    summary: 'Uma agenda de estúdio para escolher sessão, dia e horário e conferir o valor antes de confirmar.',
    study: {
      problem: 'Como tornar a escolha de uma sessão e a formação do preço compreensíveis?',
      decision: 'Separar as escolhas da reserva e calcular o total a partir da duração e do valor por hora.',
      result: 'Ao alterar os valores no editor, o total muda na prévia. Escolher um horário e preencher o nome gera um resumo da sessão.',
      limits: 'Disponibilidade de exemplo. Nenhum horário é bloqueado, nenhum pagamento é realizado e a reserva não é salva.',
    },
    translations: {
      en: {
        category: 'Web development',
        summary: 'A studio schedule to choose a session, day and time and check the price before confirming.',
        study: {
          problem: 'How can session selection and pricing be easy to understand?',
          decision: 'Separate booking choices and calculate the total from the duration and hourly price.',
          result: 'Changing the values in the editor updates the preview total. Choosing a time and entering a name produces a session summary.',
          limits: 'Sample availability. No time is reserved, no payment is made and the booking is not saved.',
        },
      },
      es: {
        category: 'Desarrollo web',
        summary: 'Una agenda de estudio para elegir sesión, día y horario y consultar el precio antes de confirmar.',
        study: {
          problem: '¿Cómo hacer comprensibles la elección de una sesión y su precio?',
          decision: 'Separar las opciones de reserva y calcular el total a partir de la duración y el precio por hora.',
          result: 'Cambiar los valores en el editor actualiza el total de la vista previa. Elegir un horario e ingresar un nombre genera un resumen de la sesión.',
          limits: 'Disponibilidad de ejemplo. No se bloquea ningún horario, no se realiza ningún pago ni se guarda la reserva.',
        },
      },
    },
  },
  {
    id: 'atende-workflow', title: 'atende / workflow', category: 'Automações & IA', demoIndex: 1,
    summary: 'Uma mensagem, uma regra e um próximo passo. Veja como uma decisão muda o atendimento.',
    study: {
      problem: 'Como explicar o caminho de um pedido entre a chegada e a próxima ação da equipe?',
      decision: 'Representar a regra em JSON e mostrar a mensagem, a prioridade e a ação ao longo de quatro etapas.',
      result: 'Trocar a ação entre responder e organizar muda a conversa simulada: uma resposta preparada ou um encaminhamento à equipe.',
      limits: 'Fluxo determinístico no navegador. Não há modelo de IA ativo, envio ao WhatsApp ou atendimento a pessoas reais.',
    },
    translations: {
      en: {
        category: 'Automation & AI',
        summary: 'A message, a rule and a next step. See how a decision changes the support flow.',
        study: {
          problem: 'How can a request’s journey from arrival to the team’s next action be explained?',
          decision: 'Represent the rule in JSON and show the message, priority and action across four steps.',
          result: 'Switching the action between responder and organizar changes the simulated conversation: a prepared reply or a handoff to the team.',
          limits: 'A deterministic browser workflow. No active AI model, WhatsApp delivery or real customer support.',
        },
      },
      es: {
        category: 'Automatización e IA',
        summary: 'Un mensaje, una regla y un siguiente paso. Observa cómo una decisión cambia la atención.',
        study: {
          problem: '¿Cómo explicar el recorrido de una solicitud desde su llegada hasta la siguiente acción del equipo?',
          decision: 'Representar la regla en JSON y mostrar el mensaje, la prioridad y la acción a lo largo de cuatro etapas.',
          result: 'Cambiar la acción entre responder y organizar modifica la conversación simulada: una respuesta preparada o un envío al equipo.',
          limits: 'Flujo determinista en el navegador. Sin modelo de IA activo, envíos a WhatsApp ni atención a personas reales.',
        },
      },
    },
  },
  {
    id: 'sincronia-crm', title: 'sincronia / crm', category: 'Integrações', demoIndex: 2,
    summary: 'Do formulário ao CRM de demonstração: acompanhe como os campos se tornam um contato.',
    study: {
      problem: 'Como tornar visível a transformação dos dados entre duas ferramentas?',
      decision: 'Exibir origem, mapeamento e destino lado a lado, permitindo inspecionar os campos durante a simulação.',
      result: 'Alterar o mapeamento de nome ou etapa muda os valores do contato mostrado no CRM de demonstração.',
      limits: 'Dados fictícios e estado local. Nenhuma API ou conta de CRM é conectada e nenhum registro externo é criado.',
    },
    translations: {
      en: {
        category: 'Integrations',
        summary: 'From a form to a demo CRM: follow how source fields become a contact.',
        study: {
          problem: 'How can data transformation between two tools be made visible?',
          decision: 'Show source, mapping and destination side by side, with fields that can be inspected during the simulation.',
          result: 'Changing the name or stage mapping changes the contact values displayed in the demo CRM.',
          limits: 'Fictional data and local state. No API or CRM account is connected and no external record is created.',
        },
      },
      es: {
        category: 'Integraciones',
        summary: 'Del formulario al CRM de demostración: observa cómo los campos se convierten en un contacto.',
        study: {
          problem: '¿Cómo hacer visible la transformación de datos entre dos herramientas?',
          decision: 'Mostrar origen, mapeo y destino lado a lado, con campos que se pueden inspeccionar durante la simulación.',
          result: 'Cambiar el mapeo de nombre o etapa modifica los valores del contacto mostrado en el CRM de demostración.',
          limits: 'Datos ficticios y estado local. No se conecta ninguna API ni cuenta de CRM y no se crea ningún registro externo.',
        },
      },
    },
  },
];
