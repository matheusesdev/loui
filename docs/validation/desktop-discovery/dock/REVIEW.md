# Dock flutuante — 23/10/2026

Implementado na branch evolution/09-desktop-discovery, sem commit ou publicação.
Referência principal: imagem do Dock do macOS enviada pelo usuário. Direção e
decisões registradas em docs/design/FLOATING-DOCK.md.

## Resultado

- Terminal e preferências fixos; cada janela aberta/minimizada e cada editor
  ganha ícone próprio, ordenado pela abertura. Fechar remove o item da barra.
- Foco, estado aberto e minimizado possuem indicadores visuais e nomes acessíveis
  traduzidos. Toolbar com um ponto de entrada por Tab, setas e Home/End.
- Recuperar mantém formulário, código, resultado e expansão. Terminal recolhe
  janelas e editores juntos. Minimizar usa o próprio ícone como destino.
- Editores não modais permitem alternar entre projetos e janelas pelo Dock.
  São montados fora do conteúdo das seções, dentro do mesmo contexto de camadas
  do ambiente. Fechar/minimizar retorna foco a outra superfície disponível.
- Preferências fica no Dock; o organizador anterior fica dentro de preferências.
  Rádio reposicionada acima da barra, sem colisão com seus controles.
- Em tela cheia a barra se recolhe, retornando pela borda inferior ou teclado.
  A área de revelação é de 14px; não bloqueia uma faixa invisível sobre conteúdo.
- Não inclui abas externas de prévia, gerenciadas pelo navegador. Mobile mantido.

## Verificação executada

`npm run validate`: check sem erros/avisos Svelte, build e discovery aprovados.
Aviso preexistente de theme-init clássico no build preservado.
`git diff --check`: aprovado.

`verify-floating-dock.cjs`: aprovado em Chrome, Firefox e WebKit, com 1440×900,
1024×720 e 768×1024. Nove combinações engine/viewport, com PT/EN/ES e dois temas.
Abrir/minimizar/fechar as seis seções, recuperar contato, três editores juntos,
ausência de duplicatas, código preservado, foco após fechar editor, navegação
por teclado, tradução de labels, bounds do Dock e acesso em janela expandida.
Sem erros JavaScript; ausência do Dock e dos editores no modo mobile.

`verify-dock-motion.cjs`: aprovado em Chrome com animações reais. Minimizar e
recuperar durante a animação, recuperar após fim, código preservado, Escape
prioriza editor, foco revela o Dock em tela cheia e conteúdo acima da faixa
inferior continua recebendo interação.

Teste adicional com editor expandido: alternar entre editor e Serviços pelo
Dock, minimizar/recuperar mantendo viewport completo e código; aprovado nos
três engines.

`verify-mobile.cjs`: aprovado com resultados isolados em mobile-regression.
Nove combinações de engine/viewport, três idiomas e dois temas; entrada,
navegação, diagnóstico/contato e três prévias reais. Sem alteração da experiência
de celular e sem envio de mensagens externas.

`verify-soft-sounds.cjs`: aprovado; pistas reais, mute persistido e sinais sem
clipping. O plin aprovado na etapa anterior permanece.

Capturas revisadas: Dock claro em 1440px, escuro em 768px e três editores abertos.
A revisão corrigiu camadas do editor sobre o Dock, nomes de tooltip sem revisão
de idioma, grid de projetos em tablet e área invisível de captura em tela cheia.

## Limites

Refinamento cromático: cores aplicadas apenas aos traços, preservando ícones
de 20px e barra de 54px. Check/build aprovados; capturas color-light.png e
color-dark.png revisadas. Verificados recuperação de contato, setas do teclado
e limites da barra em tablet no Chromium. Nenhuma lógica de janela alterada.

Testes em Windows; WebKit não equivale a teste físico de Safari/macOS/iPhone.
Sem leitor de tela físico. Estado das janelas dura na sessão da página, sem
promessa de restaurar código/formulário após recarregar. Nenhuma aba externa é
anunciada como aberta ou minimizada sem informação confiável do navegador.

## Refinamento minimalista

Barra reduzida para 54px de altura, SVGs de 20px e alvos de clique de 44px.
Removidos os blocos coloridos, gradientes, brilho, contornos ativos e aumento
no hover. Superfície, linha e estados usam os tokens do projeto.
Capturas claras e escuras revisadas em 1440px. Nova execução de validate e
verify-floating-dock aprovada nas nove combinações de engine/viewport.
