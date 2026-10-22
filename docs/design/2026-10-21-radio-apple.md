# Rádio: direção Apple

O usuário rejeitou a direção plana anterior e pediu aparência Apple. Esta direção
substitui a proposta de lista editorial de `2026-10-21-radio.md`.

Referências consultadas: [Music MiniPlayer](https://support.apple.com/en-ae/guide/music/mus71d7dcfce/mac)
para música e controles agrupados; [Central de Controle do macOS Tahoe](https://www.apple.com/newsroom/2025/06/macos-tahoe-26-makes-the-mac-more-capable-productive-and-intelligent-than-ever/)
para material translúcido, cantos e separação por camadas. A imagem oficial da
Central de Controle foi inspecionada. São referências, sem usar assets da Apple
na entrega nem afirmar reprodução exata do Liquid Glass nativo.

Decisão antes de implementar: fonte de sistema no player, vidro fosco com fallback
opaco, borda luminosa fina, raio de 24 px e sombra difusa. Claro: superfície
#f4f4f6, texto #202124, secundário #55585f; escuro: superfície #23262a,
texto #f5f5f7 e secundário #b6bac1. A cor de destaque continua a da loui.
Arte própria com a marca loui identifica a seleção, sem fingir ser capa do artista.

Composição compacta: arte, música/artista e play na mesma linha. Expandida: arte
maior, transporte centralizado (anterior, play e próxima), volume deslizante,
seletor segmentado e lista em superfície suave. Seleção por fundo translúcido e
check, sem linhas de navegação editorial. Créditos e rolagem única preservados.

Interações: anterior/próxima usam a sequência local já existente; ficam desativados
em emissoras. Preservar áudio, busca, arraste, foco, traduções e limites de tela.
Em paisagem curta, transporte compacto para preservar área de lista. Com redução
de transparência, aumentar a opacidade; com movimento reduzido, sem equalizador.

Validação: `npm run check` sem erros/avisos e `npm run build` aprovado.
`verify-radio-refinement.cjs` passou em 1440×900, 768×1024, 320×568 e 844×390,
com PT/EN/ES e claro/escuro: limites, rolagem, foco, créditos, áudio local,
mute/volume e catálogo com respostas controladas de resultado/vazio/erro.
`verify-radio-apple.cjs` confirmou anterior/próxima com MP3 real, estado desativado
em uma emissora de teste, preenchimento do volume e redução de transparência,
em desktop/celular e nos dois temas. A emissora de teste usa áudio local
interceptado; não representa validação de streams externos.

Capturas finais em `docs/validation/radio-apple/final-*`, revisadas em claro e
escuro. O material é uma aproximação CSS; não há refração óptica nativa.
Nenhuma publicação ou alteração no framework.
