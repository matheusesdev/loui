# Ordem das janelas — correção

Problema reproduzido ao clicar em Serviços → Experimentar no laboratório:
laboratório recebia foco e estado ativo, mas z-index 5 ficava atrás de Serviços,
com z-index 152. Dois contadores independentes controlavam a mesma sobreposição.

Correção: `bringToFront` centraliza o contador compartilhado. A ativação de janelas
e a interação com superfícies móveis passam pelo mesmo controle. A abertura do
laboratório mantém foco e continuidade visual, inclusive ao reabrir uma janela.

`scripts/verify-window-order.cjs` falhou antes da correção com os valores acima e
passou depois nas três experiências. Checagem Svelte e build aprovados; teste de
movimento do terminal e rádio, controles e estados da API também aprovado.

Branch `fix/ordem-janelas-laboratorio`. Correção local, sem publicação nesta etapa.
