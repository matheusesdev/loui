# Etapa 3 — contato e navegação previsíveis

Base: main publicada no merge bc9aea5, com etapa 2 no commit 335c19a.
Branch de trabalho: evolution/03-usability. Continuação do roteiro autorizado.

## Objetivo

Dar feedback ao tentar continuar com campos vazios, aceitar o fluxo por teclado
e restaurar o foco ao iniciador ao fechar uma janela. Preservar a abertura compacta,
as mensagens, os editores e os três idiomas. Sem backend ou envio automático.

## Decisões e interação

- Manter nome e ideia como únicos campos; orientação curta sobre objetivo,
  processo atual e ferramentas, sem tornar obrigatório conhecer termos técnicos.
- Validar apenas após tentativa de continuar; erros junto ao campo e aria-invalid,
  com associação por aria-describedby e foco no primeiro erro.
- Corrigir o campo remove seu erro; trocar idioma atualiza erros e orientações.
- Link do WhatsApp permanece visível e acionável. Entrada inválida impede navegação
  e explica o motivo. Entrada válida abre WhatsApp para revisão pelo visitante.
- Enter no nome e ativação do link por teclado seguem a mesma validação.
- Não mostrar “mensagem enviada”; o site apenas prepara e abre a conversa externa.
- Fechar uma janela retorna ao elemento que a abriu quando ainda disponível;
  caso contrário, usa o terminal. Ao haver outra janela aberta, reativá-la e
  restaurar o iniciador nela quando possível. Minimizar mantém o fluxo atual.
- Campos de contato em 16 px no celular; novas mensagens respeitam temas e contraste.

Referências: formulário e controlador atuais (composição e estado), mecanismos de
retorno de foco dos editores (interação), Web Interface Guidelines (erros, rótulos,
foco e campos), consulta UX Pro Max sobre validação. Usar Archivo e tokens existentes.

## Plano

1. ContactForm.svelte: validação, descrição, erros derivados e continuação por Enter.
2. locales.js: PT/EN/ES para orientações e estados; commercial.css para erros e toque.
3. workspace.js: usar a referência de foco já armazenada, sem refatorar a navegação.
4. Testar entradas vazias, espaços, correção, idiomas, mensagens longas, contexto,
   link externo interceptado, foco, fechar/minimizar, temas e tamanhos relevantes.
5. Executar check/build e regressões de contato e abertura compacta. Inspecionar capturas.

Sem mudanças de serviços externos, dependências ou persistência de dados pessoais.
