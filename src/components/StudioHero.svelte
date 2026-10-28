<script>
  import { onMount } from 'svelte';
  import { getLanguage } from '../i18n.js';
  import { demoUrl } from '../demo-links.js';
  import {projectPreview,demoActionMarkup,demoActionLabel} from '../demo-presentation.js';
  import { site } from '../content/site.js';

  let language = $state(getLanguage());
  const readSelection = () => {
    const id = new URL(location.href).searchParams.get('demo');
    const index = site.projects.findIndex(project => project.id === id);
    return index < 0 ? 2 : index;
  };
  let selected = $state(readSelection());
  function selectDemo(index) {
    selected = index;
    const url = new URL(location.href);
    url.searchParams.set('demo', site.projects[index].id);
    history.replaceState(history.state, '', url);
  }
  const copy = {
    pt: {
      titles: ['Escolha a sessão.\nConfira o valor.', 'Uma mensagem.\nUma regra de atendimento.', 'Um pedido.\nUm contato no CRM.'],
      description: 'Sites, sistemas e automações da loui. Escolha uma demonstração e teste o resultado.',
      choices: ['Agenda', 'Atendimento', 'CRM'],
      actions: ['Testar a agenda', 'Simular o atendimento', 'Testar o mapeamento CRM'],
      captions: ['Luz: sessão, horário e preço antes da confirmação.', 'Atende: uma regra decide entre responder e encaminhar.', 'Sincronia: os campos do pedido chegam ao contato de destino.'],
      limits: 'Demonstração local. Sem envio ou gravação de dados.',
      choose: 'Escolher demonstração', newTab: 'Abre em outra aba',
      signature: 'Entre a ideia e o possível, existe código.'
    },
    en: {
      titles: ['Choose a session.\nCheck the price.', 'A message.\nA support rule.', 'An order.\nA contact in the CRM.'],
      description: 'Websites, systems and automation by loui. Choose a demo and try the result.',
      choices: ['Schedule', 'Support', 'CRM'],
      actions: ['Try the schedule', 'Simulate support', 'Try CRM mapping'],
      captions: ['Luz: session, time and price before confirmation.', 'Atende: a rule chooses between a reply and a handoff.', 'Sincronia: order fields become a contact in the destination.'],
      limits: 'Local demo. No data is sent or saved.',
      choose: 'Choose a demo', newTab: 'Opens in another tab',
      signature: 'Between an idea and what is possible, there is code.'
    },
    es: {
      titles: ['Elige la sesión.\nConsulta el precio.', 'Un mensaje.\nUna regla de atención.', 'Un pedido.\nUn contacto en el CRM.'],
      description: 'Sitios, sistemas y automatizaciones de loui. Elige una demostración y prueba el resultado.',
      choices: ['Agenda', 'Atención', 'CRM'],
      actions: ['Probar la agenda', 'Simular la atención', 'Probar el mapeo CRM'],
      captions: ['Luz: sesión, horario y precio antes de confirmar.', 'Atende: una regla decide entre responder y derivar.', 'Sincronia: los campos del pedido llegan al contacto de destino.'],
      limits: 'Demostración local. Sin envío ni almacenamiento de datos.',
      choose: 'Elegir demostración', newTab: 'Abre en otra pestaña',
      signature: 'Entre la idea y lo posible, existe código.'
    }
  };
  const c = $derived(copy[language]);
  onMount(() => {
    const update = () => { language = getLanguage(); };
    update();
    const restore = () => { selected = readSelection(); };
    document.addEventListener('languagechange', update);
    window.addEventListener('popstate', restore);
    return () => {
      document.removeEventListener('languagechange', update);
      window.removeEventListener('popstate', restore);
    };
  });
</script>

<div class="studio-hero">
  <div class="studio-hero-copy">
    <h1 class="localized" tabindex="-1">{c.titles[selected]}</h1>
    <p class="studio-hero-description localized">{c.description}</p>
    <div class="studio-hero-choices" role="group" aria-label={c.choose}>
      {#each c.choices as choice, index}
        <button type="button" aria-pressed={selected === index} onclick={() => selectDemo(index)}><span class="localized">{choice}</span></button>
      {/each}
    </div>
    <a class="studio-hero-action demo-action" href={demoUrl(selected, language)} target="_blank" rel="noopener noreferrer">
      {@html demoActionMarkup(selected,language)}
    </a>
    <p class="studio-hero-limits localized">{c.limits}</p>
  </div>
  <figure class="studio-hero-evidence">
    <a href={demoUrl(selected, language)} target="_blank" rel="noopener noreferrer" aria-label={`${demoActionLabel(selected,language)}. ${c.newTab}`}>
      <img src={projectPreview(site.projects[selected].id,language)} alt={c.captions[selected]} width="1100" height="700" fetchpriority="high" />
    </a>
    <figcaption class="localized" aria-live="polite">{c.captions[selected]}</figcaption>
  </figure>
  <p class="studio-hero-signature localized">{c.signature}</p>
</div>
