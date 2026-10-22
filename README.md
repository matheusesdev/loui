# loui

**Entre a ideia e o possível, existe código.**

Site e ambiente interativo da **loui**, um estúdio em início de jornada dedicado a desenvolvimento web, automações, integrações e consultoria em tecnologia. A marca é escrita em minúsculas.

O projeto apresenta a empresa por meio de exploração: um terminal recebe comandos, os conteúdos aparecem em janelas e o laboratório convida o visitante a completar pequenos trechos de código e acompanhar o resultado. O objetivo é tornar compreensível o trabalho do estúdio, inclusive para quem nunca programou.

Não há clientes ou resultados comerciais inventados. A área de projetos apresenta três estudos autorais das demonstrações locais — reservas, automação e mapeamento para CRM — com decisões, comportamentos observáveis e limites explícitos.

## A ideia e a experiência

A direção visual combina atmosfera discreta, azul-gelo, tipografia de presença e referências de janelas do macOS. O laboratório usa uma interface inspirada em editor de código e navegador. Não incorpora o VS Code ou o Safari, nem representa uma afiliação com Apple ou Microsoft.

O percurso sugerido é:

1. **Entrada:** preparação dos recursos essenciais e uma breve sequência da marca, seguida de Entrar. Sem porcentagem de carregamento fictícia.
2. **Sobre a loui:** primeiro comando sugerido, para apresentar o estúdio e sua abordagem.
3. **Serviços:** desenvolvimento web, automações e IA, integrações e consultoria.
4. **Stacks:** tecnologias confirmadas, com nomes e logos nas cores de marca.
5. **Laboratório:** convite para participar de uma experiência guiada.
6. **Projetos:** espaço para futuras entregas, com estado vazio honesto.
7. **Contato:** WhatsApp, e-mail e composição de mensagem.

O visitante pode digitar os comandos ou clicar nas sugestões. O clique escreve o comando progressivamente antes de abrir o conteúdo; a preferência por movimento reduzido elimina essa espera. Janelas podem ser abertas, fechadas, minimizadas e ampliadas; no desktop, também podem ser movidas pela barra de título. O terminal permite retomar uma seção minimizada pelo comando correspondente.

O cabeçalho mantém a marca, retorno ao terminal, idioma, tema e contato, com simplificação em telas pequenas. Os ícones sociais ficam discretamente na parte inferior, sem rodapé institucional. A rádio é um controle flutuante independente da navegação.

## Terminal

| Comando | Abre ou executa |
| --- | --- |
| `sobre` | Apresentação e processo da loui |
| `servicos` | Serviços do estúdio |
| `stacks` | Tecnologias e ferramentas |
| `lab` | Laboratório interativo |
| `projetos` | Estudos autorais e acesso às demonstrações locais |
| `contato` | Canais e formulário de mensagem |
| `help` | Lista de comandos |
| `inicio` | Retorno ao terminal |
| `idioma pt`, `idioma en`, `idioma es` | Troca de idioma |
| `tema claro`, `tema escuro` | Troca de tema |
| `clear` | Limpa o histórico visível |

Existem aliases como `about`, `services`, `contact`, `home`, `language` e `theme`. Setas para cima/baixo percorrem o histórico. O terminal reconhece uma lista restrita de comandos: **não executa comandos do computador, JavaScript arbitrário, instalações ou chamadas externas**. A saída usa texto seguro.

Atalhos como `/#sobre`, `/#stacks` e `/#laboratorio` abrem diretamente o conteúdo e dispensam a introdução.

## Laboratório: aprender fazendo

Cada serviço tem um convite antes da atividade. Ao começar, abre-se um ambiente dedicado com explorador de arquivos, editor, orientações, terminal e prévia. Um exemplo ajuda o visitante, e **Preencher comigo** permite continuar sem conhecimento prévio.

Os trechos editáveis são pequenos e têm uma gramática controlada. A validação oferece orientação quando há erro. Os comandos `executar`, `run`, `ejecutar` e `npm run dev` acionam a experiência; esse último é uma simulação, não um processo npm real.

### Desenvolvimento web

O visitante configura a duração e o preço de uma sessão em Vue 3:

```js
const hours = ref(2);
const hourlyRate = ref(180);
const total = computed(() => hours.value * hourlyRate.value);
```

A prévia abre o **luz / estúdio fotográfico**, um aplicativo de reservas. A pessoa escolhe
sessão, dia e horário, ajusta a duração e confirma com um nome de exemplo. O total reage
à duração sem recarregar; a confirmação mostra os detalhes e permite recomeçar.
A agenda fixa é fictícia e nenhuma reserva ou cobrança é realizada. A ilustração SVG do
estúdio é um ativo local criado para esta demonstração.

O editor aceita somente a gramática orientada acima (1–8 horas e R$ 1–1.000/hora).
Não compila componentes arbitrários nem executa JavaScript fornecido pelo visitante;
os valores validados alimentam um aplicativo Vue real.

Todas as experiências abrem em outra aba, com o modal **Sabe o que você fez?** e o resultado
ofuscado ao fundo. **Quero explorar o que criei** revela a prévia. As simulações começam
após o fechamento; com movimento reduzido, a pessoa avança manualmente.

### Automação

O visitante configura uma regra em JSON:

```json
{
  "request": "Preciso de um site",
  "priority": "alta",
  "action": "responder"
}
```

A simulação mostra uma mensagem chegando em uma conversa de WhatsApp, a prioridade sendo aplicada e a ação acontecendo. `priority` aceita `alta` ou `normal`. `action` aceita `responder` ou `organizar`: a primeira prepara uma resposta simulada; a segunda encaminha a conversa à equipe, sem mostrar uma resposta automática.

### Integração

O visitante relaciona campos entre um formulário e um CRM:

```json
{
  "name": "nome",
  "stage": "etapa"
}
```

O formulário de exemplo contém `nome`, `empresa`, `etapa` e `origem`. O campo `name` pode receber `nome` ou `empresa`, e `stage` pode receber `etapa` ou `origem`. A simulação percorre recebimento, mapeamento, criação do registro e sincronização. O registro de destino reflete o código escolhido.

As simulações têm pausa, avanço manual e repetição. Com movimento reduzido, o avanço começa manual. Após executar, **“Sabe o que você fez?”** explica brevemente o efeito do código. Consultoria apresenta o método, sem uma atividade artificial.

**Todas as experiências são locais. Não enviam mensagens reais, não conectam contas de WhatsApp ou CRM e não chamam modelos de IA.**

## Rádio

A loui radio reproduz uma seleção local de **cinco faixas** com licenças Creative Commons. Há play/pausa, volume, mudo, seleção de faixa e créditos. A reprodução continua ao navegar e a lista reinicia após a última faixa.

- Sem autoplay: o visitante escolhe quando começar.
- Sem download do áudio antes da primeira ação de reprodução.
- Carregamento pode ser cancelado e falhas têm mensagem recuperável.
- Escape recolhe os detalhes e devolve o foco ao controle de expansão.
- A seleção é uma playlist em repetição, **não uma transmissão ao vivo ou catálogo infinito**.
- A continuidade em segundo plano depende das políticas do navegador e do dispositivo.

Fontes, autores, conversões e licenças individuais: [créditos de áudio](public/audio/CREDITS.md). Essas licenças devem ser preservadas ao redistribuir os arquivos. A pesquisa de opções externas está em [radio-options.md](docs/validation/radio-options.md); nenhuma API paga ou assinatura foi contratada.

## Tecnologias

### Implementação do site

- **Svelte 5:** componentes, estado reativo e superfícies interativas.
- **Vue 3:** aplicativo interativo da experiência web.
- **Vite 8:** desenvolvimento, compilação e preview do build estático.
- **JavaScript, HTML e CSS:** controladores de navegação, conteúdo institucional e apresentação.
- **Playwright com Chromium/Edge:** verificações de navegador usadas no desenvolvimento.
- **Vercel:** hospedagem do build estático.

A migração para Svelte é incremental: alguns controladores e conteúdo HTML continuam em JavaScript/DOM. O site não tem backend, banco de dados, autenticação, chaves de API ou variáveis de ambiente obrigatórias.

### Stacks apresentadas pela loui

Supabase, Claude Code, Codex, Python, n8n, Node.js, Vue.js e Next.js são ferramentas apresentadas como parte da atuação do estúdio. **Isso não significa que todas sejam dependências deste site.** Também não representa parceria, certificação ou integração ativa com esses fornecedores.

## Idiomas, temas e acessibilidade

- Português como idioma inicial; inglês e espanhol disponíveis.
- Troca de idioma com desfoque de aproximadamente 1,3 segundo em movimento normal.
- Tema claro como padrão inicial, com escolha manual de claro/escuro persistida.
- Preferências persistidas em `localStorage`, com tolerância à indisponibilidade do armazenamento.
- Movimento reduzido respeitado nas transições, digitação e simulações.
- Controles com nomes acessíveis, foco visível, campos rotulados e estados anunciados.
- Código validado por regras restritas, sem `eval`; texto inserido na prévia é escapado.
- Página institucional permanece no HTML como alternativa sem JavaScript; o laboratório exige JavaScript.

Foram verificadas a inicial, as seis janelas e a rádio em **14 dimensões entre 320 e 2560 px**, incluindo telefone/tablet em orientação horizontal. O editor e as experiências também têm testes móveis específicos. Isso é evidência de emulação em Chromium, não garantia para todos os aparelhos: Safari/iOS, teclado virtual, leitores de tela e dispositivos físicos ainda precisam de verificações próprias.

## Executar localmente

Recomendado: **Node.js 22.12+ na linha 22** e npm. Instale o Node antes de começar.

```bash
git clone https://github.com/matheusesdev/loui.git
cd loui
npm ci
npm run dev
```

Abra **http://127.0.0.1:5173** e mantenha o terminal do servidor aberto. Se a porta já estiver ocupada, confira o endereço informado pelo Vite.

```bash
npm run check     # diagnósticos Svelte; falha se houver avisos
npm run build     # gera dist/
npm run preview   # serve dist/ em http://127.0.0.1:4174
```

Não abra `index.html` via `file://` nem use o servidor Python na raiz: os componentes Svelte precisam ser processados pelo Vite. Para hospedagem, publique o conteúdo de `dist/`.

## Estrutura

```text
index.html                     Conteúdo institucional, introdução e entrada
src/
  main.js                      Inicialização e integração dos módulos
  workspace.js                 Janelas, rotas, foco e terminal principal
  workspace-state.svelte.js     Estado reativo do ambiente
  i18n.js / locales.js          Idiomas, traduções e transição
  theme.js / intro.js           Temas e entrada
  contacts.js / projects.js     Renderização dos canais e projetos
  lab-code.js                  Validação dos pequenos trechos editáveis
  lab-projects.js              Templates HTML legados das demonstrações
  components/
    Stacks.svelte              Tecnologias
    SocialFooter.svelte        Ícones sociais discretos
    ContactForm.svelte         Composição de mensagem para WhatsApp
    Radio.svelte               Controle e reprodução de áudio
    LabWorkbench.svelte        Editor guiado
    ProcessSimulation.svelte   Automação e integração em execução
  content/site.js              Contatos, redes, stacks, músicas e projetos
  styles/                      Sistema visual e layouts responsivos
public/
  fonts/                       Archivo e sua licença
  logos/                       Logos e atribuições
  audio/                       Faixas, fontes e licenças
scripts/                       Verificações de navegador
docs/
  superpowers/                 Especificações e propostas de evolução
  validation/                  Relatórios, resultados e capturas
```

Alguns componentes, folhas de estilo e testes antigos permanecem como histórico. Nem todo arquivo existente é carregado pela versão atual. As folhas ativas estão declaradas em `index.html`.

## Personalizar o conteúdo

### Contatos e redes

Edite `src/content/site.js`. WhatsApp deve conter código do país e apenas dígitos. O LinkedIn está pendente: preencha `site.socials.linkedin` com a URL correta para ativar o link. O GitHub configurado é `matheusesdev`.

O formulário **não envia mensagens pelo servidor**: compõe uma URL de WhatsApp com nome e ideia. A pessoa revisa e envia no próprio WhatsApp. Os campos não são salvos pela loui. A cópia de e-mail depende da permissão de clipboard e informa como proceder se falhar.

### Projetos reais

Os estudos demonstrativos ficam em `src/content/case-studies.js`, com traduções PT/EN/ES.
Não representam clientes ou integrações ativas. “Experimentar demonstração” abre
o editor correspondente em Serviços. Os detalhes abertos são preservados ao trocar idioma.

Para acrescentar uma entrega real, inclua um item em `site.projects`, preservando a
distinção entre trabalho entregue e demonstração:

```js
{
  title: 'Nome real do projeto',
  summary: 'Descrição factual do trabalho realizado.',
  category: 'Desenvolvimento web',
  url: 'https://seu-projeto.com',
  image: './public/projetos/seu-projeto.webp',
  imageAlt: 'Descrição da imagem',
  imageWidth: 1200,
  imageHeight: 800,
  translations: {
    en: { title: 'Project name', summary: 'Factual description.' },
    es: { title: 'Nombre del proyecto', summary: 'Descripción factual.' }
  }
}
```

Título e resumo são obrigatórios. Links e imagens são opcionais; use links HTTP(S) e imagens locais em `public/`. A janela permanece acessível quando a lista está vazia. Não publique exemplos como se fossem trabalhos entregues.

### Música, logos e textos

Novas músicas entram em `site.radio.tracks`; verifique a licença e registre os créditos antes de adicionar o arquivo. Logos locais e suas atribuições estão em [public/logos/README.md](public/logos/README.md). Traduções gerais ficam em `src/locales.js`; os componentes de experiências têm textos próprios para PT/EN/ES.

## Verificação

As verificações de navegador usam Playwright como ferramenta opcional de desenvolvimento, fora das dependências de produção. Instale-o em um ambiente de testes:

```bash
npm install --no-save --package-lock=false playwright
npx playwright install chromium
```

Com o servidor Vite ou preview ativo, configure `SITE_URL` se necessário. Para usar um navegador já instalado, defina `BROWSER_PATH` com o caminho absoluto. `PLAYWRIGHT_PATH` permite apontar para uma instalação externa do pacote.

Exemplo em PowerShell:

```powershell
$env:SITE_URL = 'http://127.0.0.1:4174'
# Opcional, caso use Edge instalado:
$env:BROWSER_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
node scripts/verify-responsive.cjs
node scripts/verify-contact-typing.cjs
node scripts/verify-radio-ux.cjs
node scripts/verify-process-simulation.cjs
```

Principais evidências e limites:

| Verificação | Escopo |
| --- | --- |
| `npm run check` | Diagnósticos dos componentes Svelte |
| `npm run build` | Compilação para hospedagem estática |
| `verify-responsive.cjs` | 14 tamanhos, inicial, janelas e rádio |
| `verify-contact-typing.cjs` | Digitação progressiva, interrupção, contatos e URL da mensagem |
| `verify-radio-ux.cjs` | Cinco arquivos de áudio, reprodução, loop, mudo, falha e cancelamento |
| `verify-process-simulation.cjs` | Regras, conversa simulada, mapeamento, etapas, pausa e repetição |

Scripts mais antigos, como os que esperam o dock ou um campo de nome em vez do editor de código, documentam versões anteriores e não devem ser tratados como aceite da interface atual. Consulte os relatórios de [validação](docs/validation/) antes de escolher uma suíte.

## Deploy na Vercel

O projeto gera arquivos estáticos. `vercel.json` define:

- framework: Vite;
- instalação: npm a partir do lockfile;
- build: `npm run build`;
- saída: `dist`;
- variáveis de ambiente obrigatórias: nenhuma.

`vite.config.js` preserva os caminhos existentes `/public/...` copiando esses assets para `dist/public`. Isso mantém imagens de projetos, logos e músicas disponíveis no build. Não remova essa cópia sem atualizar os caminhos usados pelo site.

Ao importar o repositório na Vercel, confirme essas opções. Integração Git permite deploys automáticos conforme a configuração de branches da conta. `.vercel/`, `node_modules/`, `dist/` e arquivos `.env` não pertencem ao Git; não coloque credenciais no conteúdo público.

## Estágio e limites

Este é um site institucional interativo em evolução. Não existe backend, serviço real de automação, integração externa de CRM ou IA ativa dentro das experiências. O formulário prepara uma mensagem para WhatsApp; a rádio oferece seleção local e emissoras online; os projetos apresentados são estudos autorais das demonstrações locais, identificados como tal.

As referências visuais orientam a experiência, mas os nomes e marcas de terceiros pertencem aos seus titulares. Fonte, logos e áudio têm licenças próprias nos respectivos diretórios. Este repositório não concede uma licença geral de reutilização ao código e à identidade da loui.


### Prévia em página dedicada

Executar uma experiência abre `lab-preview.html` em nova aba, com toda a largura disponível. O editor preserva o código e oferece um link explícito caso a abertura seja bloqueada. Dados da simulação ficam no fragmento da URL (não enviados ao servidor), são revalidados na página e permitem recarregar a prévia. Não use dados pessoais reais nos exemplos. O build Vite tem duas entradas: index.html e lab-preview.html. Teste atual: scripts/verify-external-preview.cjs.

Validação desta evolução: `scripts/verify-vue-experience.cjs`, incluindo interatividade e dimensões do editor em desktop, tablet, celular e paisagem.

## Orientações para agentes e design

Antes de trabalhar no projeto, leia [AGENTS.md](AGENTS.md) e o [fluxo de design](docs/design/WORKFLOW.md). As skills de frontend, UI e UX estão versionáveis em `.agents/skills`. A [curadoria de referências](docs/design/REFERENCES.md) registra fontes, problemas atuais e propostas para a próxima reformulação. Instalar skills não significa que a reformulação visual já foi feita.

### Direção atual das demonstrações

- **atende:** mesa de atendimento com conversa simulada de WhatsApp e inspetor de execução. Selecionar uma etapa revela sua saída. A regra pode responder ou encaminhar à equipe.
- **sincronia:** pedido de exemplo, mapeamento de campos e registro de CRM. Selecionar o par evidencia os valores transformados; simular reenvio mantém um registro na demonstração. Não há conexão com loja ou CRM real.
- Três idiomas e apresentação clara/escura conforme a preferência salva da loui. Cada prévia mantém sua identidade.
- O explorador do laboratório mostra implementação e CSS reais, em modo de leitura; o trecho orientado é editável.

Direção e referências: [EXPERIENCES.md](docs/design/EXPERIENCES.md).
Teste atual: `scripts/verify-experiences.cjs`. O script anterior `verify-vue-experience.cjs` encaminha para essa verificação.

## Rádio online e janelas móveis

O cabeçalho do terminal permite arrastar no desktop,
com setas do teclado e restauração por Home ou botão. A rádio tem o mesmo recurso,
inclusive por toque. No celular, o terminal permanece encaixado para preservar a leitura.
As posições ficam limitadas à tela e não são persistidas entre visitas.

A rádio tem duas fontes: **Seleção loui** (as cinco faixas locais licenciadas) e
**Rádio online**, com busca por gênero na [Radio Browser API](https://docs.radio-browser.info/).
A consulta usa HTTPS, MP3, cache de sessão, timeout, cancelamento e servidor alternativo.
Não exige backend ou chave de API. O catálogo só é consultado ao escolher a fonte
online. Buscar um gênero não toca automaticamente nem interrompe a fonte atual;
selecionar uma emissora inicia o áudio explicitamente. O nome mostrado é o da emissora,
não uma identificação da música atual.

Emissoras independentes podem ficar indisponíveis ou impor restrições geográficas.
Falhas são informadas e a seleção local continua disponível. Créditos e licenças
das faixas locais permanecem acessíveis no player. A busca e o stream conectam o navegador
aos serviços externos, apenas após a ação do visitante.

Validação atual: `scripts/verify-floating-radio.cjs` usa catálogo e áudio controlados
para exercitar estados e erros; `scripts/verify-radio-live.cjs` consulta o catálogo e
verifica a reprodução real de uma emissora (sujeita à rede). Os scripts de rádio
anteriores registram o layout legado e não são a verificação deste novo player.
Direção: [FLOATING-RADIO.md](docs/design/FLOATING-RADIO.md).

### Feedback do contato

O formulário indica campos vazios após tentar continuar e mantém o texto digitado.
Enter no nome permite continuar; no campo da ideia, cria uma nova linha. Abrir o
WhatsApp prepara a conversa para revisão e envio pelo visitante, sem envio automático.
Validação desta etapa: `scripts/verify-contact-usability.cjs` e
[registro de revisão](docs/validation/contact-usability/REVIEW.md).
