# loui — ambiente explorável

Histórico: para a versão atual com stacks, contato e rádio, ver [desktop-review.md](desktop-review.md).

Data: 20/10/2026. Modelo aprovado pelo usuário após análise da referência orbitadev.com.br: um ambiente para explorar, mais minimalista, com identidade própria e sem reproduzir o site de referência.

## Resultado

- Home com dois caminhos principais e navegação persistente para Serviços, Laboratório, A loui, Contato e Terminal.
- Superfícies não modais: abrir, fechar, minimizar, retomar e ampliar. Desktop permite mover pelo título; celular usa a área útil como uma tela, com rolagem interna.
- Estado das experiências preservado ao minimizar. Controles de reset separados e teclado funcional.
- Laboratório reutiliza as quatro demonstrações conceituais. Serviços têm acesso direto à experiência correspondente.
- Terminal de navegação, sem execução de código ou comandos do sistema; histórico e sugestões. Texto inserido é renderizado com textContent.
- PT/EN/ES, temas, desfoque mais lento, movimento reduzido e introdução mantidos.
- Projetos ocultos enquanto a coleção estiver vazia. Nenhum dado de contato fictício ou formulário que simule envio.
- Fallback institucional em HTML disponível sem JavaScript.

## Revisão independente

O agente `ui_finish_review` avaliou as novas capturas sob o perfil UI Finish-Gate Reviewer. A composição foi considerada compatível com o novo modelo, com um HOLD inicial por tradução/codificação na prévia do formulário. A string foi corrigida; testes passaram a conferir a home, o CTA e a prévia em espanhol. A revisão final retornou **PASS para composição e usabilidade estática**, sem afirmar aprovação do gosto do usuário ou avaliação completa do movimento.

O agente pediu evidência de acesso ao fim da demonstração no celular. O teste agora rola o conteúdo e verifica a legenda dentro da área visível enquanto fechar/minimizar continuam disponíveis. A lista de retomadas fica oculta em mobile quando uma superfície está ativa, liberando altura.

## Evidência funcional

`node scripts/verify-workspace.cjs` concluiu com saída 0 e 12 verificações agrupadas, em `workspace-results.json`, sem erro JavaScript ou resposta HTTP de erro na página monitorada:

- Quatro demonstrações por teclado, reset separado e navegação de Serviços ao Laboratório.
- Minimização e retomada preservam a cena; ampliar/restaurar e arrastar funcionam.
- Terminal rejeita execução de HTML, aceita navegação, tema e idioma.
- Texto espanhol da home e da prévia de formulário conferido.
- Sete tamanhos: 360×800, 390×844, 768×1024, 1024×768, 1440×1000, 844×390 e 720×500.
- Reabertura após redimensionar mantém a janela dentro da tela.
- Link direto, entrada animada, desfoque, execução normal e movimento reduzido.
- Projetos temporários apenas em memória, URL insegura rejeitada e retorno ao estado vazio.
- Toque emulado para navegação, experimento, minimizar e retomar.
- Leitura institucional acessível sem JavaScript.

Capturas: `workspace-home-dark.png`, `workspace-lab-dark.png`, `workspace-contact-light-es.png`, `workspace-mobile-home.png`, `workspace-mobile-lab.png`.

## Limites

Edge/Chromium headless; toque emulado. Sem testes em aparelhos físicos, Safari, Firefox ou leitor de tela. Reflow em 720 px não equivale a teste do controle nativo de zoom a 200%. Não houve deploy, commit ou push. Esta revisão substitui as decisões de aceite relativas à antiga página contínua.
