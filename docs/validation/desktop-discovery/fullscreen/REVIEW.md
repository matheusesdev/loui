# Controles, expansão e plin

Referência visual: imagem enviada pelo usuário, com pontos vermelho, amarelo e
verde saturados. Aplicados #ff5f57, #febc2e e #28c840 aos controles, sem
preenchimento ou borda em volta dos botões. Janelas inativas não dessaturam os
pontos. Editor usa a mesma família de cores.

Expansão ocupa o viewport da página, sem margens, bordas ou limites de altura
anteriores. Não aciona a Fullscreen API nem altera a interface do navegador.
Controles externos e rádio ficam visualmente recolhidos durante a expansão;
restaurar/minimizar devolve o ambiente. Dados e instâncias permanecem montados.

Conteúdo adaptado: serviços distribuem texto e demonstração em colunas;
projetos usam três colunas (duas em larguras intermediárias); contato divide
apresentação e formulário; sobre/processo e stacks usam a largura por grupos;
diagnóstico distribui pergunta e resposta. Editor expandido ocupa todo o
viewport e preserva áreas flexíveis de código, guia e terminal.

Validação: npm run validate aprovado. verify-fullscreen-windows.cjs passou 108
combinações (Chrome/Firefox/WebKit; 1024×720, 1440×900 e 1920×1080; claro/escuro;
seis janelas), além do editor expandido nos três engines. Verificadas dimensões
exatas do viewport, ausência de overflow horizontal, cores, preservação do
contato e fluxo completo do diagnóstico. Teste adicional EN/ES passou nos três
engines; PT coberto pela matriz principal.

Teste adicional com animações reais no Chrome: ampliar, minimizar, recuperar
pelo painel e restaurar mantiveram dimensões e texto do formulário. Controles
externos reapareceram ao restaurar. Capturas reais de serviços, projetos,
contato e diagnóstico foram revisadas. Sem testes em aparelhos físicos.

Som: substituído o sopro por um plin original de duas notas, com ataque curto
suave, final gradual e harmônico discreto. Não utiliza gravações de jogos.
verify-soft-sounds.cjs passou ações reais, início silencioso e mute persistido.
A amostra e as métricas atuais estão em ../sounds. Sem commit ou publicação.
