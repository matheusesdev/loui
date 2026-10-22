# Serviços e editor no macOS

Objetivo: remover a navegação duplicada entre serviços e suas demonstrações.
Serviços mantém descrição, exemplos locais e o acesso ao editor no mesmo lugar.
Aliases e links antigos do laboratório levam a Serviços, preservando o acesso.

Referências: [VS Code](https://code.visualstudio.com/docs/editing/getting-started/userinterface)
para explorador, abas e terminal; controles de janela do macOS já usados pela loui;
[Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)
para foco, diálogo e controles acessíveis.

Decisão: substituir a moldura Safari por uma barra de janela com controles à
esquerda e projeto central. Menlo no código, fonte do sistema na moldura.
Claro: editor #ffffff, painéis #f3f3f3, texto #242424, seleção #e4eaf2.
Escuro: editor #1f1f1f, painéis #181818, texto #cccccc, seleção #30343b.
Azul #007acc identifica foco e arquivo ativo. Nada de controles decorativos falsos.

Interação observável: abrir uma oferta em Serviços e iniciar sua demonstração;
editar e executar mantém a prévia separada. Fechar/minimizar devolve o foco
à oferta e preserva o código; ampliar/restaurar altera o tamanho do editor.
No celular, arquivos ficam em uma faixa horizontal, com missão acima do código.

Validação: check sem erros/avisos, build aprovado. Teste no navegador em
1440×900, 768×1024, 320×568 e 844×390; PT/EN/ES e claro/escuro.
Conferidos: redirecionamento antigo, três editores, preenchimento, erro,
execução e prévia em aba separada, ampliar/restaurar, minimizar/fechar,
Escape, foco de retorno e código preservado. Capturas de desktop e celular
revisadas; ajustado contraste do explorador e terminal no tema claro.
As demonstrações continuam locais. Nenhuma publicação nesta branch.
