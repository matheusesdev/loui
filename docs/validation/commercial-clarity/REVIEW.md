# Etapa 1 — clareza comercial

Registro da primeira entrega. A aceitação de rolagem na abertura foi posteriormente
rejeitada pelo usuário e corrigida; o estado atual está documentado em
../compact-workspace/REVIEW.md. Capturas deste diretório permanecem como histórico.

Branch: evolution/01-commercial-clarity. Validação local em 22/10/2026.

## Implementado

- Proposta de valor junto ao terminal para público amplo.
- Quatro necessidades, com descrições, entregas possíveis e limites de escopo.
- Contato por serviço via controlador atual do workspace, mantendo histórico e foco.
- Assunto visível e removível no formulário, incluído no link do WhatsApp.
- Nome e texto livre preservados ao mudar serviço, idioma ou janela.
- Traduções autorais PT/EN/ES; cores e tipografia existentes.
- Espaço inferior de rolagem no celular para acessar atalhos acima da rádio.

## Verificado

- npm run check: zero erros e zero avisos.
- npm run build: aprovado.
- scripts/verify-commercial-clarity.cjs: 24 combinações de viewport, idioma e tema;
  quatro serviços por combinação, navegação por teclado, histórico, contexto removível,
  codificação do link externo e preservação dos campos. Sem envio de mensagens.
- Verificação adicional com movimento normal: troca de idioma com assunto selecionado
  e mensagem preservada; código do editor preservado após visitar o contato.
- scripts/verify-services-editor.cjs: quatro tamanhos, temas e idiomas, rota antiga,
  três editores e respectivas prévias, ampliar/restaurar, minimizar/fechar e código.
- Capturas reais inspecionadas: abertura e serviços no desktop, abertura e contato no
  celular pequeno, terminal rolado em celular e paisagem. A página usa rolagem interna
  em telas baixas; não se exige que todo o conteúdo caiba simultaneamente.
- Sem overflow horizontal nas superfícies verificadas; atalhos acessíveis sem cobertura
  pela rádio ao final da rolagem nas telas menores.
- git diff --check: sem problemas.

Viewports: 1440×900, 768×1024, 320×568 e 844×390. A matriz está em results.json.
Navegador: Google Chrome via Playwright; ferramenta instalada temporariamente fora
do projeto, sem mudanças de dependências ou lockfile.

## Revisão de interface

Referência consultada: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

- src/components/ContactForm.svelte: contexto associado ao formulário com aria-describedby;
  labels visíveis e botão semântico para remoção; campos preservados.
- src/workspace.js: ação contextual usa o controlador existente e mantém links modificados
  para abertura nativa em outra aba; foco segue para o formulário por ação explícita.
- src/styles/commercial.css: alvos de 44 px nas novas ações, foco visível e rolagem
  sem animação quando há preferência por redução de movimento.
- index.html e src/locales.js: conteúdo novo traduzido, sem resultados comerciais inventados.

## Limites

Não é auditoria global de acessibilidade ou segurança. Sem teste em aparelhos físicos,
Safari ou Firefox nesta etapa. Validação de contato verifica o link preparado, sem
enviar mensagens. Sem backend, rastreamento, domínio ou e-mail novo. As demais etapas
do roteiro continuam pendentes; mudanças locais sem commit, integração ou publicação.
