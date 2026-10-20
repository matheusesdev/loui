# loui — evolução do desktop

20/10/2026. Implementação local dos pedidos de stacks, contatos, redes, projetos, rádio e carregamento, após a adoção de Svelte.

## Implementado

- Stacks: Supabase, Claude Code, Codex, Python, n8n, Node.js, Vue.js e Next.js, com nomes e SVGs locais. Agrupamento por finalidade, sem métricas ou parcerias inventadas.
- Contato: WhatsApp direto +55 (77) 99163-9190, e-mail matheuses18@icloud.com com abrir/copiar e mensagem de falha de clipboard.
- Redes: GitHub matheusesdev e LinkedIn pendente, sem URL fictícia.
- Projetos: janela sempre disponível e estado vazio honesto; renderização segura preservada para futuras entregas.
- Entrada: preparação da fonte essencial com limite de espera, sequência breve da marca, depois Entrar. Sem porcentagem fictícia; preferência de movimento reduzido respeitada.
- Refinamento visual: carvão/branco quente, azul-gelo, peso tipográfico maior, dock com ícones e nomes, controles circulares, cantos suaves e profundidade moderada.
- Rádio: duas faixas lofi locais em repetição, play/pausa, volume, próxima/anterior, progresso, créditos e player compacto durante navegação. Fechar pausa. Nenhum áudio é baixado antes da ação do visitante.

## Fonte musical e mudança de integração

O teste real dos streams Lofi Girl X4VbdwhkE10 e jfKfPfyJRdk retornou erro 150 (incorporação recusada). Não foram extraídos áudios do YouTube. A versão final usa Study And Relax, Kevin MacLeod (CC BY 4.0), e Lofi, Caden Currie (CC BY 3.0), com fontes e atribuições em public/audio/CREDITS.md e créditos visíveis no aplicativo. Ogg original convertido a MP3 para compatibilidade, sem edição musical. A seleção inicial tem duas faixas e não é transmissão ao vivo.

## Verificação

- `npm run check`: zero erros/avisos.
- `npm run build`: compilação estática aprovada.
- `verify-workspace.cjs`: 12 grupos de regressão, sete tamanhos, teclado/toque emulado, PT/EN/ES, drag, reset, minimizar/retomar e fallback sem JS.
- `verify-desktop.cjs`: oito stacks/logos, clipboard real, links, vazio de projetos, idiomas, cinco tamanhos e reprodução MP3 real no navegador, volume, troca/loop, persistência, mini player e fechamento. Falha de áudio simulada não bloqueia ambiente. Ver desktop-results.json.
- `verify-build.cjs`: entrada compilada, tradução, laboratório, assets/logos e reprodução local no build. Ver svelte-build-results.json.
- UI Designer e UI Finish-Gate Reviewer revisaram direção/composição. A primeira revisão encontrou baixo contraste do número WhatsApp e ordem DOM diferente da visual nos controles; ambos corrigidos. Revisão complementar com web-design-guidelines e conector UI/UX Pro: foco visível, ordem de teclado, movimento reduzido e controles de mídia.

Limites: reprodução validada por estado de mídia/decodificação e avanço do tempo em Edge headless; não houve audição humana nem teste em dispositivos físicos/leitor de tela. Nenhum deploy, commit ou push.
