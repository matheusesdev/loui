# Recolhimento das janelas

Objetivo: tornar minimizar e fechar observáveis na navegação por janelas da loui.
Referência de interação: [Desktop & Dock do macOS](https://support.apple.com/guide/mac-help/change-desktop-dock-settings-mchlp1119/mac),
com recolhimento em direção a um destino. Referência visual: a própria janela e o
botão Terminal da loui. Referência de movimento responsivo: [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md),
com interrupção e respeito a movimento reduzido; consulta local UI/UX Pro Max
`animation interrupted reduced motion`.

Decisão antes de implementar: preservar paleta, Archivo e composição. Minimizar
usa perspectiva, afunilamento e compressão progressiva até o botão Terminal, em
520 ms (420 ms em telas pequenas). Fechar usa afunilamento local de 360 ms.
É uma adaptação do gesto, sem reproduzir a malha curva do efeito Gênio nativo.
Sem clones do conteúdo, bibliotecas novas ou alterações no editor e nas prévias.

O estado e o foco mudam imediatamente; a janela em saída fica inerte. Reabrir
interrompe a saída. Redimensionar ou ativar movimento reduzido encerra movimentos
pendentes; com movimento reduzido, a saída é imediata.

Complemento: abrir por comando, sugestão ou histórico percorre o afunilamento
no sentido inverso, partindo do Terminal. Ativar uma janela já aberta não repete
a entrada. Maximizar e restaurar usam interpolação da posição e escala entre os
retângulos anterior e final em 340 ms. Cliques sucessivos partem do retângulo
visual corrente. Os três movimentos compartilham cancelamento e movimento reduzido.

Refino do fechamento: a saída de 200 ms com escala final de 86% ficou pouco
perceptível na avaliação do usuário. Ampliar para 360 ms, com afunilamento local
até quase um ponto e opacidade alta durante a maior parte do percurso. Preservar
abertura, minimização, maximização, foco imediato e movimento reduzido.

Validação: `npm run check` sem erros ou avisos e `npm run build` aprovado.
`scripts/verify-window-motion.cjs` passou em 1440×900, 768×1024, 320×568 e
844×390, com os três idiomas e ambos os temas. Verificados destino no Terminal,
fechamento, reabertura durante a saída, resize, mudança de movimento reduzido,
Escape e foco. Verificação adicional confirmou foco entre janelas sobrepostas,
preservação do formulário e minimização de janela maximizada.

O workspace agora delimita suas camadas, preservando o seletor de idioma acima
das janelas. Capturas e gravação em `docs/validation/window-motion/`.
Revisão visual por capturas de desktop e celular; a fidelidade ao efeito nativo
continua limitada à adaptação de perspectiva descrita acima. Sem publicação.

Validação do complemento: `scripts/verify-window-transitions.cjs` passou nos mesmos
quatro tamanhos, três idiomas e dois temas. Verificados origem da abertura no
Terminal, abertura por comando digitado, maximizar/restaurar no desktop, retorno
ao retângulo original, alternância rápida, fechar durante a entrada, resize e
movimento reduzido ativado durante e antes da animação. A suíte anterior de saída
também passou novamente. A animação CSS antiga foi desativada para não reiniciar
depois das transições. Capturas de abertura em desktop e celular e estado
maximizado revisados; gravação `video/loui-window-transitions.webm` disponível.
