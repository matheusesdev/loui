# loui — redesenho editorial

Data: 20/10/2026. Direção corretiva aprovada pelo usuário após os pareceres de dois agentes independentes.

## Implementado

- Cabeçalho plano e navegação tipográfica, sem moldura, cápsulas ou círculo dentro do CTA. Idioma em lista alinhada ao controle; menu compacto em celular/tablet.
- Arquivo tipográfico Archivo variável, hospedado localmente com licença OFL. Larguras e pesos diferentes entre marca, títulos e conteúdo.
- Uma demonstração de serviço aberta por vez, com índice e palco compartilhado em desktop. No celular, a cena aparece junto ao serviço escolhido. HTML nativo mantém acesso sem JavaScript.
- Comandos separados para Experimentar e Recomeçar. O reset cancela temporizadores, volta ao início e devolve foco ao comando de início.
- Um traço azul atravessa a introdução, reaparece na apresentação, índice de serviços e sequência do processo. Órbitas removidas.
- Cores dos títulos neutralizadas; azul usado em traço, estado ativo e sinalização.
- Processo conectado e vertical no celular. Contato indisponível com formulário em prévia expansível. Rodapé reduzido.
- Entrada, PT/EN/ES, desfoque mais lento, dark/light e preferência de movimento reduzido preservados.

## Estrutura de estilos

`index.html` carrega apenas `tokens.css` e `editorial.css`. `site.css`, `motion.css`, `experience.css` e `polish.css` são arquivos históricos não carregados; não editar esses arquivos para modificar a versão atual.

## Revisão independente

O agente `ui_finish_review`, aplicando o perfil UI Finish-Gate Reviewer indicado pelo usuário, revisou capturas desktop/mobile e os estados inicial/final. Primeiro manteve HOLD por contraste insuficiente dos desenhos. Foi criado `--diagram`, com contraste medido de **5,06:1 em dark** e **4,10:1 em light**, e as capturas foram repetidas.

O parecer final foi **PASS para revisão visual estática**, encerrando os HOLDs de cápsulas, palco confinado, hierarquia repetida e ritmo mobile. Esse resultado não representa aprovação do gosto do usuário ou avaliação completa da experiência temporal.

## Evidência

- `editorial-desktop-dark.png`, `editorial-mobile-dark.png`: composição completa.
- `editorial-intro-dark.png`, `editorial-mobile-menu.png`: entrada e menu.
- `editorial-stage-dark.png`, `editorial-stage-light-es.png`: palco e texto espanhol.
- `editorial-demo-desktop-complete.png`, `editorial-demo-mobile-initial.png`, `editorial-demo-mobile-complete.png`: estados da cena.
- `editorial-results.json`: seleção de palco, teclado, reset separado, reflow e contato.

Limites: Edge/Chromium headless e toque emulado. Sem teste em Safari, Firefox, aparelhos físicos ou leitores de tela. Sem deploy, commit ou push. UI/UX Pro Max não foi instalado nem teve seu motor executado; os perfis e referências utilizados estão documentados em `2026-10-20-design-hold.md`.
