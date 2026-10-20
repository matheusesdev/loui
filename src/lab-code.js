export const snippets=[
  "const hours = ref(2);\nconst hourlyRate = ref(180);\nconst total = computed(() => hours.value * hourlyRate.value);",
  '{\n  "request": "Preciso de um site",\n  "priority": "alta",\n  "action": "responder"\n}',
  '{\n  "name": "nome",\n  "stage": "etapa"\n}',
];
export function compileLabCode(index,code,language='pt') {
 const en=language==='en',es=language==='es';
 const fail=message=>({error:message});
 const invalid=en?'Follow the example syntax.':es?'Sigue la sintaxis del ejemplo.':'Siga a sintaxe do exemplo.';
 let details;
 if(!code.trim())return fail(en?'Complete the code first.':es?'Completa el código primero.':'Complete o código antes de executar.');
 if(code.length>800)return fail(invalid);
 if(index===0){
  const match=code.trim().match(/^const\s+hours\s*=\s*ref\(\s*(\d+)\s*\);?\s*const\s+hourlyRate\s*=\s*ref\(\s*(\d+)\s*\);?\s*const\s+total\s*=\s*computed\(\s*\(\)\s*=>\s*hours\.value\s*\*\s*hourlyRate\.value\s*\);?$/);
  if(!match)return fail(en?'Use the Vue example: two ref() values and the computed() calculation.':es?'Usa el ejemplo Vue: dos valores ref() y el cálculo computed().':'Use o exemplo Vue: dois valores ref() e o cálculo computed().');
  const hours=Number(match[1]),hourlyRate=Number(match[2]);
  if(hours<1||hours>8||hourlyRate<1||hourlyRate>1000)return fail(en?'Use hours from 1 to 8 and hourlyRate from 1 to 1000.':es?'Usa hours de 1 a 8 y hourlyRate de 1 a 1000.':'Use hours entre 1 e 8 e hourlyRate entre 1 e 1000.');
  details=en?'You initialized a Vue booking application. ref() stores the session duration and hourly price; computed() calculates the total. Choose a session, day and time to complete a sample booking.':es?'Inicializaste una aplicación Vue de reservas. ref() guarda la duración y el precio por hora; computed() calcula el total. Elige sesión, día y horario para completar una reserva de ejemplo.':'Você inicializou um aplicativo Vue de reservas. ref() guarda a duração e o preço por hora; computed() calcula o total. Escolha sessão, dia e horário para completar uma reserva de exemplo.';
  return {framework:'vue',config:{hours,hourlyRate},explanation:details};
 }else{
  let data;try{data=JSON.parse(code);}catch{return fail(en?'Check the JSON: use double quotes and commas between fields.':es?'Revisa el JSON: usa comillas dobles y comas entre campos.':'Confira o JSON: use aspas duplas e vírgulas entre os campos.');}
  if(!data||typeof data!=='object'||Array.isArray(data))return fail(invalid);
  if(index===1){
   if(typeof data.request!=='string'||!data.request.trim()||data.request.length>100||!['alta','normal'].includes(data.priority)||!['responder','organizar'].includes(data.action))return fail(en?'Use request as text, priority "alta" or "normal", and action "responder" or "organizar".':es?'Usa request como texto, priority "alta" o "normal" y action "responder" u "organizar".':'Use request com um texto, priority "alta" ou "normal" e action "responder" ou "organizar".');
   const priority=data.priority==='alta'?(en?'High priority':es?'Prioridad alta':'Prioridade alta'):(en?'Normal priority':es?'Prioridad normal':'Prioridade normal');
   const action=data.action==='responder'?(en?'Reply prepared':es?'Respuesta preparada':'Resposta preparada'):(en?'Queued for the team':es?'En cola para el equipo':'Na fila da equipe');
   details=en?`You configured a workflow: the request enters with ${priority.toLowerCase()}, and the chosen action is ${action.toLowerCase()}. Change action to see a different delivery.`:es?`Configuraste un flujo: la solicitud entra con ${priority.toLowerCase()} y la acción elegida es ${action.toLowerCase()}. Cambia action para ver otra entrega.`:`Você configurou um fluxo: o pedido entra com ${priority.toLowerCase()}, e a ação escolhida é ${action.toLowerCase()}. Mude action para ver outra entrega.`;
  }else{
   const input={nome:'Ana Costa',empresa:'Ateliê Horizonte',etapa:en?'First conversation':es?'Primera conversación':'Primeira conversa',origem:'Website'};
   if(!['nome','empresa'].includes(data.name)||!['etapa','origem'].includes(data.stage))return fail(en?'Map name to "nome" or "empresa", and stage to "etapa" or "origem".':es?'Relaciona name con "nome" o "empresa", y stage con "etapa" u "origem".':'Relacione name a "nome" ou "empresa", e stage a "etapa" ou "origem".');
   details=en?`You mapped fields: ${data.name} becomes the CRM name, and ${data.stage} becomes its stage. The source data stayed the same; your mapping changed the destination.`:es?`Relacionaste campos: ${data.name} pasa al nombre del CRM y ${data.stage} a su etapa. Los datos originales siguen iguales; tu mapeo cambia el destino.`:`Você mapeou campos: ${data.name} vira o nome no CRM, e ${data.stage} vira a etapa. Os dados de origem continuam iguais; seu mapeamento muda o destino.`;
  }
 }
 return {explanation:details};
}
