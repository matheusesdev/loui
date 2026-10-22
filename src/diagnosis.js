export const diagnosisServices=['Desenvolvimento web','Automações & IA','Integrações','Consultoria em tecnologia'];
export function buildBriefing(topic,current,goal,labels){
 return [[labels.topic,topic],[labels.current,current],[labels.goal,goal]]
  .filter(([,value])=>value?.trim()).map(([label,value])=>`${label}: ${value.trim()}`).join('\n');
}
export function mergeBriefing(current,briefing){
 const text=briefing.trim();
 if(!text)return {status:'empty',message:current};
 if(current.includes(text))return {status:'duplicate',message:current};
 const message=current.trim()?`${current}\n\n${text}`:text;
 if(message.length>2000)return {status:'overflow',message:current};
 return {status:'added',message};
}
