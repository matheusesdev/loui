<script>
 import {tick} from 'svelte';
 import {getLanguage} from '../i18n.js';
 import {diagnosisCopy} from '../content/diagnosis.js';
 import {buildBriefing,diagnosisServices} from '../diagnosis.js';
 let {model,onDemo,onContact}=$props();
 let step=$state(0),choice=$state(null),current=$state(''),goal=$state(''),briefing=$state(''),edited=$state(false),confirming=$state(false),feedback=$state('');
 let heading,briefField=$state(),resetConfirm=$state();
 const c=$derived.by(()=>{model.languageRevision;return diagnosisCopy[getLanguage()];});
 const hasData=$derived(choice!==null||!!current||!!goal||!!briefing);
 async function focusHeading(){await tick();heading?.focus({preventScroll:true});heading?.scrollIntoView({block:'nearest',behavior:'instant'});}
 function generate(){briefing=buildBriefing(c.options[choice],current,goal,c.labels);edited=false;feedback='';}
 function next(){if(step===0&&choice===null)return;if(step===2&&!edited)generate();step++;feedback='';focusHeading();}
 function back(){step--;feedback='';focusHeading();}
 async function restart(){if(hasData){confirming=true;await tick();resetConfirm?.focus();}else clear();}
 function clear(){step=0;choice=null;current='';goal='';briefing='';edited=false;feedback='';confirming=false;focusHeading();}
 async function copy(){if(!briefing.trim()){feedback='empty';return;}try{await navigator.clipboard.writeText(briefing);feedback='copied';}catch{feedback='manual';await tick();briefField?.focus();briefField?.select();}}
 function contact(){if(!briefing.trim()){feedback='empty';briefField?.focus();return;}onContact(briefing,diagnosisServices[choice]);}
</script>
<section class="guided-diagnosis" aria-labelledby="diagnosis-heading">
 <p class="diagnosis-progress">{step<3?`${c.progress} ${step+1} ${c.of} 3`:c.title}</p>
 <h2 id="diagnosis-heading" tabindex="-1" bind:this={heading}>{step<3?c.questions[step]:c.result}</h2>
 {#if step===0}
  <p>{c.intro}</p>
  <fieldset class="diagnosis-options"><legend class="sr-only">{c.questions[0]}</legend>{#each c.options as option,index}<label class:chosen={choice===index}><input type="radio" name="diagnosis-need" value={index} bind:group={choice}/><span>{option}</span></label>{/each}</fieldset>
  <p class="diagnosis-hint">{c.select}</p>
 {:else if step<3}
  <label class="sr-only" for="diagnosis-answer">{c.questions[step]}</label>
  <p class="diagnosis-hint" id="diagnosis-answer-help">{c.optional}</p>
  {#if step===1}<textarea id="diagnosis-answer" name="current" rows="5" maxlength="600" bind:value={current} aria-describedby="diagnosis-answer-help"></textarea>{:else}<textarea id="diagnosis-answer" name="goal" rows="5" maxlength="600" bind:value={goal} aria-describedby="diagnosis-answer-help"></textarea>{/if}
 {:else}
  <p class="diagnosis-recommendation">{c.services[choice]}</p><p>{c.explanations[choice]}</p><p class="diagnosis-hint">{c.local}</p>
  <button class="diagnosis-demo" type="button" onclick={()=>onDemo(choice)}>{choice===3?c.approach:c.demo}</button>
  <label for="diagnosis-brief">{c.brief}</label><p class="diagnosis-hint" id="diagnosis-brief-help">{c.edit}</p>
  <textarea id="diagnosis-brief" name="briefing" rows="6" maxlength="2000" bind:this={briefField} bind:value={briefing} oninput={()=>{edited=true;feedback='';}} aria-describedby="diagnosis-brief-help"></textarea>
  {#if edited}<button class="diagnosis-refresh" type="button" onclick={async()=>{generate();await tick();briefField?.focus();}}>{c.refresh}</button>{/if}
  <div class="diagnosis-actions"><button type="button" onclick={copy}>{c.copy}</button><button class="diagnosis-primary" type="button" onclick={contact}>{c.contact}</button></div>
 {/if}
 <p class="diagnosis-feedback" role="status">{feedback?c[feedback]:''}</p>
 <div class="diagnosis-navigation">{#if step>0}<button type="button" onclick={back}>{c.back}</button>{/if}{#if step<3}<button class="diagnosis-primary diagnosis-next" type="button" disabled={step===0&&choice===null} onclick={next}>{step===2?c.finish:c.next}</button>{/if}</div>
 {#if confirming}<div class="diagnosis-confirm" role="group" aria-label={c.confirm}><p>{c.confirm}</p><button type="button" bind:this={resetConfirm} onclick={clear}>{c.reset}</button><button type="button" onclick={()=>{confirming=false;focusHeading();}}>{c.cancel}</button></div>{:else if hasData}<button class="diagnosis-restart" type="button" onclick={restart}>{c.restart}</button>{/if}
</section>
