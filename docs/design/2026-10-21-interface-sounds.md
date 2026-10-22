# Sons da interface

Objetivo: acompanhar abrir, fechar, minimizar, maximizar e restaurar com sons
originais, discretos e coerentes com os movimentos inspirados no macOS.
Não usar gravações ou arquivos proprietários da Apple.

Referências: a direção Apple e os movimentos documentados neste projeto;
[MDN Web Audio best practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
para gesto do usuário e controle; [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)
para identificação e foco do botão.

Decisão antes de codificar: síntese local de ruído filtrado e tom suave, sem rede
ou dependências. Abertura ascendente, minimização descendente mais longa,
fechamento descendente curto, maximização/restauração com variações mais leves.
Expandir/recolher a rádio compartilha essa família. Não sonorizar cada clique.

Sons ativos por padrão, conforme solicitado, somente após interação real.
Carga inicial e restauração por URL/histórico permanecem silenciosas. Controle
de alto-falante na barra do terminal, com nome acessível PT/EN/ES e preferência
persistida em `loui-interface-sounds`. Não adicionar controle ao cabeçalho global.
O volume e o mute da rádio permanecem independentes.

Volume baixo, envelopes suaves para evitar estalos e substituição da voz anterior
em ações rápidas. Silenciar interrompe o efeito atual; página oculta interrompe e
suspende o contexto. Falta de suporte, autoplay bloqueado e armazenamento negado
não podem interromper navegação. Movimento reduzido não implica ausência de som:
o controle independente continua disponível.

Validação: `npm run check` e `npm run build` aprovados.
`verify-interface-sounds.cjs` confirmou os cinco eventos, expansão/recolhimento da
rádio, silêncio inicial e em histórico, preferência persistida, independência da
rádio, navegação com armazenamento negado/áudio ausente/resume rejeitado.
Renderização OfflineAudioContext dos mesmos presets: sinal presente, picos abaixo
de 0.2 e término em silêncio, sem clipping. Amostra WAV em
`docs/validation/interface-sounds/loui-interface-sounds.wav`, na ordem abrir,
fechar, minimizar, maximizar, restaurar. A qualidade subjetiva permanece para
avaliação do usuário na prévia; não foi feita audição humana nesta execução.

`verify-interface-sound-control.cjs` passou em 1440×900, 768×1024, 320×568 e
844×390, com PT/EN/ES e os dois temas: limites, ausência de sobreposição com o
título, foco por teclado e abertura por sugestão com animação. Captura do celular
revisada. Nenhum commit ou deploy.
