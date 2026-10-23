# Sons discretos de janela

Pedido: efeitos de abertura, fechamento, minimizar e expansão menos agressivos.
Mudança na branch desktop atual, sem commit ou publicação.

Direção final solicitada: plin suave, com caráter de jogo. Síntese original de
duas notas curtas, sem ruído de sopro, com harmônico discreto e saída gradual.
Mantidas cinco pistas originais, sem samples de jogos/sistema ou assets externos.

Verificação: check/build/discovery aprovados; script verify-soft-sounds.cjs
exercitou as cinco ações no navegador, inicialização silenciosa, desligamento e
persistência após reload. Renderização OfflineAudioContext comparada à versão
79b1a03: RMS de 12,1 a 14,1dB abaixo do anterior, picos menores, sem clipping e
com término silencioso. metrics.json contém os valores. Isso é medição do sinal,
não medição acústica em alto-falantes nem avaliação subjetiva de conforto.

Amostra soft-window-cues.wav: abrir, fechar, minimizar, maximizar e restaurar,
nessa ordem. A aprovação do timbre depende da escuta do usuário no seu aparelho.
