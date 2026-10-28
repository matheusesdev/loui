# Responsividade da abertura em telas baixas

Objetivo: manter a demonstração e o terminal visíveis em notebooks sem criar uma barra de rolagem quando há espaço para os dois. Em telas menores, permitir rolagem real sem encobrir a assinatura ou os controles.

Referências: a composição de demonstração concreta e navegação por terminal segue `docs/design/2026-10-28-content-first.md`. A orientação local de UX para layouts responsivos recomenda evitar rolagem horizontal e adaptar o layout às dimensões da janela; as [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) recomendam corrigir a origem de barras indesejadas e preferir CSS Grid a medições por JavaScript.

Decisão: em desktops com altura até 850 px, a apresentação e o terminal ocupam a coluna esquerda, enquanto a prévia fica à direita. A imagem mantém sua proporção e reduz a largura em telas mais baixas. A grade usa linhas de conteúdo para impedir que terminal e assinatura se sobreponham quando a largura é menor. Em tablets baixos, a prévia acompanha o texto em duas colunas; a rolagem continua disponível quando a leitura exige mais altura.

Interação observável: em 1343×598, as três escolhas de demonstração, a prévia, o terminal e a assinatura permanecem visíveis sem rolagem na abertura. O terminal continua operável por teclado, e a prévia continua abrindo em outra página. A estrutura móvel permanece uma página rolável.

Verificação: 1343×598, 1366×768, 1280×720 e 1024×768 sem rolagem interna da home em português, inglês e espanhol; 800×600 com apenas 49 px de rolagem necessária, contra 622 px antes da mudança. Chrome, Firefox e WebKit passaram nas larguras 320, 390, 800, 1024, 1280, 1343 e 1366 px, além de 844×390 em paisagem, sem rolagem horizontal ou erros de execução. O smoke test de diagnóstico, contato, idioma e janelas passou nos três motores. Capturas visuais em tema claro e escuro foram inspecionadas.

Limite: as dimensões foram emuladas no navegador; nenhum notebook ou celular físico foi testado. A rolagem vertical continua necessária em tablet baixo e celular em paisagem para preservar legibilidade e acesso ao terminal.
