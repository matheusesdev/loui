# Rádio ? pesquisa e UX (20/10/2026)

Implementado: submit do terminal como ícone de retorno com nome acessível; rádio com status compacto visível, mudo, cancelamento de carregamento, timeout recuperável e Escape devolvendo foco ao expansor. Cinco faixas locais com passagem automática e reinício da seleção, mantendo créditos/licenças por faixa em public/audio/CREDITS.md. Novas faixas PetroVenus, Sappheiros e raspberrymusic. Sem autoplay, sem conta externa, nenhuma assinatura contratada.

Opções pesquisadas:

- Jamendo oferece API de rádios, requer client_id e licença comercial para atividades comerciais diretas ou indiretas. Não integrada nem contratada: https://developer.jamendo.com/v3.0/radios e https://devportal.jamendo.com/api_terms_of_use.
- Lofi Cafe oferece embed público de seis estações, com início pelo visitante. Sem confirmação específica das condições comerciais para esta empresa; não integrado: https://loficafe.net/embed.
- Open Lo-Fi oferece catálogo CC0, mas declara faixas geradas com Suno. Não usado nesta seleção: https://github.com/btahir/open-lofi.

A implementação atual é uma playlist em repetição, não transmissão ao vivo nem catálogo infinito. Pode tocar enquanto a aba e o navegador permitirem; dispositivos podem suspender áudio em segundo plano.

Revisão: frontend-design, orientações UI/UX Pro e agente UI Finish-Gate Reviewer. Pontos corrigidos: erro antes oculto no modo compacto, cancelamento de play pendente e foco ao fechar detalhes.

Verificação: npm run check, build, verify-terminal.cjs e verify-radio-ux.cjs. Este último reproduz as cinco faixas reais, verifica loop, mudo, Escape/foco, erro compacto e cancelamento com rede atrasada. Evidência: radio-ux-results.json. Sem audição humana ou dispositivo físico.
