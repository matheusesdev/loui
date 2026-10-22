# Clareza comercial — plano de implementação

> Execução nesta sessão, seguindo a especificação aprovada. Não fazer commit,
> merge, push ou deploy. Usar a branch evolution/01-commercial-clarity existente.

**Objetivo:** explicar a atuação da loui e conectar cada serviço ao contato sem
perda de texto ou mudança da identidade visual.

**Arquitetura:** conteúdo estático e traduções autorais no padrão atual; estado
reativo do workspace guarda somente o serviço escolhido. O formulário mantém
nome e mensagem locais e compõe o link externo com o contexto visível e removível.

**Stack:** Svelte 5, JavaScript, CSS e Vite existentes. Sem dependências novas.

## 1. Conteúdo e abertura

- [x] Atualizar index.html: pergunta por necessidade, descrição, entregas possíveis
  e limite de escopo em cada serviço; acesso real href="#contato" por serviço.
- [x] Em src/workspace.js, adicionar a mensagem aprovada antes do terminal.
- [x] Em src/locales.js, incluir PT/EN/ES para cada texto adicionado.

## 2. Contato contextual

- [x] Adicionar contactService no modelo em src/workspace-state.svelte.js.
- [x] No controlador src/workspace.js, usar open('contato') para os links de serviço;
  respeitar abertura de links em nova aba; selecionar contexto sem alterar campos.
- [x] Em ContactForm.svelte, derivar o contexto traduzido e o link do WhatsApp.
  Contexto visível, removível e independente da mensagem; preservá-la ao navegar.
  Usar somente identificadores conhecidos e não enviar nada automaticamente.

## 3. Apresentação

- [x] Acrescentar src/styles/commercial.css usando os tokens existentes e carregá-lo
  após os estilos atuais. Texto legível, largura limitada e ação de 44 px ou mais.
  Garantir rolagem vertical da abertura e ausência de corte em telas baixas.
- [x] Preservar demonstrações, código, prévias e navegação por comandos.

Referências: composição do próprio terminal em src/styles/macos-terminal.css;
interação contextual do contato existente; regras de foco, formulários e toque em
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md.
Reutilizar Archivo, paleta e superfícies existentes; sem novos efeitos ou cards.

## 4. Verificação e entrega

- [x] Executar npm run check e npm run build, com saída sem falhas.
- [x] Verificar no navegador: quatro serviços, contexto removível, texto preservado,
  link externo com mensagem correta, histórico, teclado e previews existentes.
- [x] Conferir 1440×900, 768×1024, 320×568 e 844×390, PT/EN/ES e ambos os temas,
  redução de movimento; inspecionar screenshots reais.
- [x] Registrar resultados em docs/validation e atualizar o estado da especificação.
  Revisar git diff --check e o escopo final; manter o trabalho local na branch.
