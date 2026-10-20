import { createLabProject } from './lab-projects.js';
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const snippets=[
  '<h1>Ideias merecem ganhar vida.</h1>\n<a href="#collection">Conheça o estúdio</a>',
  '{\n  "request": "Preciso de um site",\n  "priority": "alta",\n  "action": "responder"\n}',
  '{\n  "name": "nome",\n  "stage": "etapa"\n}',
];
export function compileLabCode(index,code,language='pt') {
 const en=language==='en',es=language==='es';
 const fail=message=>({error:message});
 const invalid=en?'Follow the example syntax.':es?'Sigue la sintaxis del ejemplo.':'Siga a sintaxe do exemplo.';
 let html,details;
 if(!code.trim())return fail(en?'Complete the code first.':es?'Completa el código primero.':'Complete o código antes de executar.');
 if(code.length>800)return fail(invalid);
 if(index===0){
  const match=code.trim().match(/^<h1>([^<>]{1,100})<\/h1>\s*<a\s+href=["']#collection["']>([^<>]{1,70})<\/a>$/i);
  if(!match)return fail(en?'Use <h1>Your title</h1> and <a href="#collection">Button text</a>.':es?'Usa <h1>Tu título</h1> y <a href="#collection">Texto del botón</a>.':'Use <h1>Seu título</h1> e <a href="#collection">Texto do botão</a>.');
  if(!match[1].trim()||!match[2].trim())return fail(invalid);
  html=createLabProject(0,'Forma Studio',language).replace(/<h1>[\s\S]*?<\/h1>/,`<h1>${escape(match[1])}</h1>`).replace(/<a class="pill" href="#collection">[\s\S]*?<\/a>/,`<a class="pill" href="#collection">${escape(match[2])} <span>↗</span></a>`);
  details=en?'You wrote HTML: h1 defines the main heading, and a creates the link that moves to the next section. Your code is now part of the rendered page.':es?'Escribiste HTML: h1 define el título principal y a crea el enlace a la siguiente sección. Tu código forma parte de la página.':'Você escreveu HTML: h1 define o título principal, e a cria o link que leva à próxima seção. Seu código agora faz parte da página renderizada.';
 }else{
  let data;try{data=JSON.parse(code);}catch{return fail(en?'Check the JSON: use double quotes and commas between fields.':es?'Revisa el JSON: usa comillas dobles y comas entre campos.':'Confira o JSON: use aspas duplas e vírgulas entre os campos.');}
  if(!data||typeof data!=='object'||Array.isArray(data))return fail(invalid);
  if(index===1){
   if(typeof data.request!=='string'||!data.request.trim()||data.request.length>100||!['alta','normal'].includes(data.priority)||!['responder','organizar'].includes(data.action))return fail(en?'Use request as text, priority "alta" or "normal", and action "responder" or "organizar".':es?'Usa request como texto, priority "alta" o "normal" y action "responder" u "organizar".':'Use request com um texto, priority "alta" ou "normal" e action "responder" ou "organizar".');
   html=createLabProject(1,data.request,language);
   const priority=data.priority==='alta'?(en?'High priority':es?'Prioridad alta':'Prioridade alta'):(en?'Normal priority':es?'Prioridad normal':'Prioridade normal');
   const action=data.action==='responder'?(en?'Reply prepared':es?'Respuesta preparada':'Resposta preparada'):(en?'Queued for the team':es?'En cola para el equipo':'Na fila da equipe');
   html=html.replace(/<div class="flow">/,`<p class="simulation-rule">${priority} / ${action}</p><div class="flow">`);
   if(data.action==='organizar')html=html.replace(/<section class="delivery">[\s\S]*?<\/section>/,`<section class="delivery"><small>${priority}</small><h2>${action}</h2><p>${escape(data.request)}</p><p>${en?'No automatic reply was prepared.':es?'No se preparó una respuesta automática.':'Nenhuma resposta automática foi preparada.'}</p></section>`).replace(en?'Ready to reply.':es?'Listo para responder.':'Pronto para responder.',action).replace(en?'A response prepared for your team':es?'Una respuesta preparada para tu equipo':'Uma resposta preparada para sua equipe',priority);
   details=en?`You configured a workflow: the request enters with ${priority.toLowerCase()}, and the chosen action is ${action.toLowerCase()}. Change action to see a different delivery.`:es?`Configuraste un flujo: la solicitud entra con ${priority.toLowerCase()} y la acción elegida es ${action.toLowerCase()}. Cambia action para ver otra entrega.`:`Você configurou um fluxo: o pedido entra com ${priority.toLowerCase()}, e a ação escolhida é ${action.toLowerCase()}. Mude action para ver outra entrega.`;
  }else{
   const input={nome:'Ana Costa',empresa:'Ateliê Horizonte',etapa:en?'First conversation':es?'Primera conversación':'Primeira conversa',origem:'Website'};
   if(!['nome','empresa'].includes(data.name)||!['etapa','origem'].includes(data.stage))return fail(en?'Map name to "nome" or "empresa", and stage to "etapa" or "origem".':es?'Relaciona name con "nome" o "empresa", y stage con "etapa" u "origem".':'Relacione name a "nome" ou "empresa", e stage a "etapa" ou "origem".');
   html=createLabProject(2,input[data.name],language).replace(/<pre>[\s\S]*?<\/pre>/,`<pre>${escape(JSON.stringify(input,null,2))}</pre>`).replace(/<dd>[^<]*<\/dd><\/div><\/dl>/,`<dd>${escape(input[data.stage])}</dd></div></dl>`);
   details=en?`You mapped fields: ${data.name} becomes the CRM name, and ${data.stage} becomes its stage. The source data stayed the same; your mapping changed the destination.`:es?`Relacionaste campos: ${data.name} pasa al nombre del CRM y ${data.stage} a su etapa. Los datos originales siguen iguales; tu mapeo cambia el destino.`:`Você mapeou campos: ${data.name} vira o nome no CRM, e ${data.stage} vira a etapa. Os dados de origem continuam iguais; seu mapeamento muda o destino.`;
  }
 }
 return {html,explanation:details};
}
