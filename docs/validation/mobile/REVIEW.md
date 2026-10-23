# Primeira experiência mobile — 23/10/2026

Branch: `evolution/08-mobile-experience`, partindo de `fd25aa9`.
Alterações anteriores de compatibilidade entre navegadores foram preservadas,
sem commit, merge ou publicação.

## Implementado

- Entrada mobile com o mesmo modal e botão Entrar do desktop, sem terminal,
  editor ou rádio na navegação. Logo ampliada removida do conteúdo inicial.
- Quatro destinos com navegação inferior: início/sobre, serviços, projetos, contato.
- Detalhes com voltar e histórico; links diretos por hash.
- Diagnóstico e contato compartilham componentes e regras existentes, mantendo
  respostas e texto ao navegar entre destinos.
- Prévia separada das três demonstrações, sem etapa de edição nem confirmação
  de que a pessoa escreveu código. Fluxo desktop de prévia preservado.
- Conteúdo dos serviços extraído da fonte existente; estudos dos projetos,
  contatos, idiomas e preferências de tema compartilhados.
- CSS mobile em chunk separado; inicialização do workspace só no modo desktop.

## Verificação executada

`npm run validate`: check sem erros/avisos Svelte, build e discovery aprovados.
Permanece aviso preexistente do script clássico theme-init no build.

`scripts/verify-mobile.cjs`: Chrome, Firefox e WebKit, em 320×568, 390×844 e
844×390 com toque, PT/EN/ES e claro/escuro. Nove combinações de engine/viewport.
Rotas principais, seleção de serviço, briefing até contato e preservação ao
navegar, ausência de overflow horizontal de documento, ausência de terminal,
editor e rádio, sem erros JavaScript.

Em 390px por engine: histórico voltar, textos longos, foco por teclado no
contato e carregamento real das três prévias com movimento reduzido, sem modal
de revelação nem overflow horizontal. Inicialização desktop preservada em
768px com toque e 1440px. Nenhuma mensagem externa foi enviada.

Capturas reais revisadas: início claro, serviços escuro, contato escuro e
demonstração de reservas. Evidências e resultados neste diretório.
Revisão pelas Web Interface Guidelines: labels, controles semânticos, foco,
estado atual de navegação, áreas seguras e movimento reduzido. Corrigidos
foco de navegação, estilo herdado de nav e frase de serviços sem tradução.

## Limites para a próxima avaliação

Esta é uma primeira direção para revisão visual do usuário. Não foi publicada.
Não houve teste físico em iPhone/Android, leitor de tela ou teclado virtual;
WebKit no Windows não equivale a Safari em aparelho real. O modo é escolhido
no carregamento e mantido ao girar o aparelho ou abrir o teclado. Ao testar
redimensionando um navegador desktop, recarregar após escolher a largura.
Validação com fonte ampliada pelo sistema ainda pendente.
