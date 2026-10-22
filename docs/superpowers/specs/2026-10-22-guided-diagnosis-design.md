# Diagnóstico guiado — proposta para a etapa 5

Status: desenho aprovado pelo usuário e implementado localmente. Branch `evolution/05-guided-diagnosis`.
Base: etapa 4c integrada localmente na main, sem envio ao origin nesta entrega.

## Objetivo

Ajudar quem ainda não sabe qual serviço procurar a organizar sua necessidade,
explorar uma demonstração relacionada e levar um briefing editável ao contato.
Público amplo e setores variados, conforme o roteiro aprovado.

## Alternativas

1. Formulário longo de orçamento: mais detalhes, mas exige dados cedo demais e
   sugere estimativa comercial que o projeto não oferece. Não recomendado.
2. Conversa com IA externa: flexível, mas requer backend, privacidade e serviço
   externo; ultrapassa o roteiro local autorizado. Não recomendado nesta etapa.
3. Três perguntas locais e recomendação transparente: fluxo curto, sem conta,
   rede ou promessa automática. Recomendado.

## Fluxo proposto

Abrir pelo comando `diagnostico` e sua sugestão no terminal, com aliases em inglês
e espanhol. Usar a mesma janela, controles e comportamento de foco do workspace;
não criar navbar, página extra ou novo estilo visual.

1. Escolher o que quer melhorar: criar site/sistema; reduzir trabalho repetitivo;
   conectar ferramentas; descobrir por onde começar. Pode mudar e voltar.
2. Descrever como funciona hoje, em texto livre de até 600 caracteres. Campo
   opcional, com indicação visível. Não solicitar nome, e-mail ou dados sensíveis.
3. Descrever o resultado esperado, até 600 caracteres. Campo opcional. Ao concluir,
   mostrar orientação mesmo se a pessoa preferiu deixar os textos em branco.

A recomendação vem da opção escolhida: web, automação, integração ou consultoria.
Explicar essa associação em uma frase, sem simular análise por IA, atribuir nota,
prometer viabilidade, calcular preço, prazo ou economia.

Oferecer a demonstração correspondente usando o acesso existente aos serviços.
Na consultoria, abrir a explicação de abordagem. Não iniciar downloads ou executar
uma demonstração antes do clique explícito.

## Briefing e contato

Resultado reúne assunto, situação atual e objetivo em uma área de texto editável.
O usuário pode copiar ou levar ao contato. Nada é enviado automaticamente.
Não sobrescrever nome ou mensagem já digitados no contato. Se houver mensagem,
oferecer acrescentar o briefing ou manter a mensagem atual, com escolha explícita.
Após inclusão, não repetir o briefing por duplo clique. Respeitar o limite de
2.000 caracteres do contato e informar quando o texto precisa ser encurtado.

Dados ficam somente na memória da aba. Fechar/minimizar e mudar idioma preservam
as respostas; recarregar limpa o diagnóstico. Recomeçar pede confirmação se houver
respostas ou briefing editado. Clipboard indisponível oferece seleção manual,
sem perder o texto. Não alterar rádio, editor, CSP ou integrações externas.

## Acessibilidade e apresentação

Rótulos e instruções PT/EN/ES autorais; navegação por teclado, foco no título de
cada etapa e retorno previsível ao voltar. Progresso textual “Pergunta 1 de 3”.
Usar fieldset/legend para opções, botões nativos e status para copiar/incluir.
Não avançar ao selecionar uma opção: avanço somente pelo botão Continuar.
Tema claro/escuro, reduced motion e tela pequena preservados; conteúdo longo
rola dentro da janela sem esconder ações ou foco. Sem decoração de dashboard.

## Critérios de aceitação

- As quatro escolhas geram orientação e acesso ao serviço correto.
- Voltar, fechar, minimizar e reabrir preservam respostas e briefing editado.
- Contato existente não é sobrescrito; inclusão é explícita e não duplicada.
- Clipboard negado, respostas vazias e limite de texto têm alternativa clara.
- Teclado, PT/EN/ES, temas, celular e paisagem validados no navegador.
- Check/build/artefatos e regressões de contato, editor e segurança aprovados.
- Sem backend, rastreamento, envio automático, dados comerciais inventados ou deploy.

Revisão do desenho: escopo limitado à necessidade → orientação → briefing;
demais etapas continuam preservadas. Implementação e verificações registradas em
`docs/validation/guided-diagnosis/REVIEW.md`. Sem commit, merge, push ou deploy da etapa 5.
