# Validação do ambiente compacto

22/10/2026 — branch evolution/01-commercial-clarity, execução local.

## Resultado

Navbar removida, controles utilitários preservados e abertura composta para caber
na viewport. Título e espaços usam largura e altura; paisagem baixa usa colunas.
Rádio recolhida por padrão, com controles adicionais ao expandir.

## Evidência

- Antes, em 1348×591: home.clientHeight=517, home.scrollHeight=709; atalhos abaixo da tela.
- scripts/verify-compact-workspace.cjs: 78 cenários aprovados. Viewports: 1348×591,
  1366×768, 1280×600, 1024×600, 1920×1080, 768×1024, 390×844, 360×640, 320×568,
  320×480, 844×390, 667×375 e 568×320; PT/EN/ES e claro/escuro.
- Verifica dimensões reais, falta de rolagem da abertura, elementos inteiros dentro
  da tela, ausência da navbar, ações sem cobertura por outros elementos e separação
  entre terminal, rádio, redes e utilitários.
- Redimensionamento sem recarregar, rádio expandida, movimento normal, comando de
  tema e retorno ao terminal aprovados. Histórico não expande a abertura.
- Entrada pelo modal inicial aprovada em 1348×591, sem erros de JavaScript.
- scripts/verify-services-editor.cjs: quatro viewports, três idiomas, dois temas,
  três editores/prévias, controles e preservação do código aprovados.
- scripts/verify-commercial-clarity.cjs: contato por serviço, remoção de contexto,
  histórico, idiomas e preservação do briefing aprovados.
- npm run check: zero erros e avisos. npm run build: aprovado. git diff --check: limpo.

Capturas de notebook claro/escuro, celular e paisagem foram inspecionadas. Os testes
de regressão usam os controles novos e gravam suas capturas neste diretório,
preservando a evidência anterior.

## Revisão de interface

- index.html: barra de navegação removida do documento, sem um menu substituto redundante.
- src/workspace.js: controles semânticos, rótulos traduzidos, foco e estado preservados.
- src/styles/compact-workspace.css: dvh, áreas seguras e alvos principais de 44 px;
  composição por altura/largura, com separação geométrica verificada.
- src/projects.js: removida a referência ao link da navbar que deixou de existir.

Não é uma garantia de todas as resoluções ou dispositivos existentes. Validação
automatizada em Google Chrome, sem aparelhos físicos ou teste de teclado virtual
real. Conteúdo longo de janelas e listas da rádio pode ter rolagem interna ao ser
aberto; a abertura inteira fica visível nos cenários documentados.

Nenhum commit, push, merge ou deploy realizado.
