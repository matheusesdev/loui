# loui

## 1. Product truth
Estúdio de desenvolvimento, automação e integrações. Visitantes avaliam entregas por demonstrações locais. Não apresentar essas demos como operações externas ativas. Preservar terminal central, três idiomas, dois temas e navegação mobile. Sucesso: selecionar uma tarefa e abrir sua demonstração sem passar pelo editor.

## 2. Design Read e superfícies
Hero showcase para quem avalia desenvolvimento de sistemas. Linguagem de mesa de trabalho, Svelte no site e Vue na agenda. V8 M2 D4: composição assimétrica e um resultado em destaque, sem coreografia automática.

## 3. Direção visual
Conteúdo e screenshots reais antes do chrome. Uma demonstração por vez. Seleção altera título, imagem, legenda e destino da ação. Terminal funcional é exceção intencional ao veto a mock terminals. Não introduzir roxo, claims inventados ou footer institucional.

## 4. Tokens de cor
Os tokens em código permanecem a fonte de verdade; este bloco descreve a abertura.
```design-tokens
fonts: Archivo, Helvetica Neue, Helvetica, Arial, sans-serif
colors: #efeee9, #20292d, #576565, #245c73, #b4bfbe, #14191d, #f1f0eb, #b3b8b7, #b1d9e9, #3d474a
radii: 0, 8px, 12px
```
`--bg`: fundo. `--text`: conteúdo. `--muted`: apoio. `--accent`: ação principal e seleção. `--surface`: suporte de imagem. Paleta clara e escura herdada de desktop.css, sem novas cores.

## 5. Tipografia
Fonte Archivo, pesos 500 e 560. Escala do hero: 12, 13, 16, 20, 32, 40, 52px. Corpo 16px/1.6. Tracking do título -0.025em; descrições com text-wrap pretty.

## 6. Espaçamento e layout
Base de 4px. Colunas .9/1.2, intervalo 48px, largura máxima 1240px. Em tablet, texto e controles dividem uma linha acima da screenshot em largura total. Mobile em uma coluna com intervalo 24px e alvos de pelo menos 44px; em paisagem, CTA e seleção ficam ao lado do texto. Telas baixas podem rolar, sem cortar controles.

## 7. Componentes
Ação principal com preenchimento e raio 8px. Seletores textuais com aria-pressed e sublinhado para seleção. Imagem com raio 12px, sem sombra decorativa. Sem kit adicional.

## 8. Movimento
Nenhum avanço automático. Mudança imediata por escolha do usuário. Sem carregamento animado ou hover que desloque o layout. Respeitar reduced motion das superfícies existentes.

## 9. Imagens e conteúdo
Screenshots do próprio repositório em public/images/studies. Não gerar mockups ou imagens abstratas. Legenda e indicação de demonstração local acompanham a ação.

## 10. Fazer e evitar
Mostrar a tarefa concreta que a pessoa pode testar. Evitar slogan que só repita a lista de serviços. Manter a assinatura obrigatória em posição secundária.

## 11. Decisões
### 2026-10-28: uma tarefa por vez na abertura
Contexto: a abertura anterior descrevia serviços sem mostrar o resultado. Decisão: alternador de três demonstrações compartilhado entre desktop e mobile. Motivo: dar evidência à promessa e permitir ação imediata. Não substituir screenshot por ilustração abstrata. Superfície: showcase. Validação: docs/validation/hero.

## 12. Referências
Curadoria existente em docs/design/REFERENCES.md: https://linear.app/features para relação entre conteúdo e ação; https://n8n.io/ para estado da seleção e fluxo; https://stripe.com/payments para ligação entre origem e destino. Referências documentadas, sem afirmar novos testes interativos desses sites.

### 2026-10-28: hero após QA visual
Contexto: CTA fora do primeiro viewport em 844×390; foco sem folga em 320×568; screenshot pequena em tablet. Decisão: seletores curtos em uma linha, screenshot com coluna maior no desktop e largura total em tablet, controles em coluna própria no mobile em paisagem. Estado da demonstração na query demo para permitir recarga e compartilhamento. Referências mantidas: Linear para conteúdo e ação; n8n para estado de fluxo; Stripe para origem e destino dos dados. Verificação: docs/validation/hero-audit.

### 2026-10-28: header com controles por ícone
Objetivo: reduzir texto fixo e distribuir preferências sem competir com o hero. Marca à esquerda; idioma, aparência, som e movimento à direita; redes em grupo separado por divisor. Referências existentes: Linear para controles discretos, n8n para estado observável e Stripe para hierarquia. Preservar os próprios ícones de linha, sem dependências. Movimento usa interruptor com posição, play/pause, estado acessível e tooltip localizado. A preferência do sistema tem prioridade, com estado explicativo; nenhuma animação de confirmação necessária. No mobile, manter seletor nativo de idioma e acrescentar o mesmo controle de movimento. Interação observável: clicar ou pressionar Space altera estado, dica e preferência persistida; sistemas com movimento reduzido mantêm animações pausadas.

### 2026-10-28: bandeiras no seletor de idioma
Pedido explícito: trocar o globo pela bandeira do idioma ativo, mantendo tamanho e cores originais. Associação adotada: português brasileiro → Brasil, inglês → Estados Unidos, espanhol → Espanha. Usar SVGs locais de flag-icons, licença MIT em public/flags/LICENSE, com largura de 20px e proporção 4:3 preservada; alvo continua 44px. Nomes dos idiomas permanecem nas opções e nos nomes acessíveis. Mobile mantém select nativo sobre o mesmo ícone de bandeira; não usar emojis nem filtros de tema na arte. Sem alteração das traduções ou publicação automática.

### 2026-10-28: idioma das evidências e ações das demonstrações
Objetivo: a troca de idioma precisa incluir os textos do hero e as imagens das demonstrações. Causa: o hero Svelte não tinha a classe localized usada pelo blur, e todas as imagens usavam uma única captura pt. Decisão: aplicar o mesmo blur aos textos relevantes, habilitar a transição no seletor mobile e respeitar tanto o sistema quanto o interruptor de animações. Capturar imagens reais nos três idiomas, compartilhando a resolução entre hero e projetos. Referências existentes: Linear para ação contextual, n8n para atendimento por etapas e Stripe para mapeamento. A ação passa a ser uma linha de abertura com ícone funcional, tarefa, nome do projeto e seta de nova aba; sem nova animação de atenção. Preservar o código editado pelos visitantes; traduzir apenas o pedido do exemplo padrão de atendimento.

### 2026-10-28: controles de janela e primeiro quadro
Objetivo: manter as três bolinhas de janela limpas e apresentar a tela Entrar desde o primeiro quadro. Referências mantidas: terminal macOS para as cores e funções, Linear para controles discretos, diretrizes de interface da Vercel para nomes acessíveis e foco. Decisão: remover apenas os desenhos internos das bolinhas do workspace e editor, preservando botões, ações, nomes acessíveis e foco visível. O site permanece oculto até a inicialização decidir entre a entrada e um link direto. Interação observável: abrir, minimizar e ampliar continuam operando pelos botões; a primeira pintura não expõe o conteúdo atrás da entrada.

### 2026-10-28: saída visível da tela cheia
Objetivo: tornar fechar, minimizar e restaurar tamanho compreensíveis quando uma janela ocupa a tela inteira. Causa observada: o header interceptava os cliques na faixa superior da janela ampliada; as bolinhas isoladas não explicavam as ações. Referências mantidas: a barra de janela do macOS para a posição das cores, Linear para a hierarquia discreta e diretrizes de interface da Vercel para foco e nomes acessíveis. Decisão: manter as bolinhas sem símbolos no tamanho normal; em tela cheia, mostrar rótulos ao lado das cores e alvos de pelo menos 44px. O header cede à janela ampliada, inclusive após redimensionamento para tablet. Interação observável: Fechar, Minimizar e Restaurar tamanho funcionam por clique e teclado, sem abandonar a tela cheia como opção.

### 2026-10-28: contraste no hover de ações
Objetivo: manter o texto dos botões legível ao passar o mouse nos temas claro e escuro. Causa: o hover genérico do diagnóstico trocava o fundo do botão principal por `--soft`, preservando a cor clara do texto; o estado desabilitado ainda perdia contraste pela opacidade. Decisão: o hover da ação principal conserva o par `--accent`/`--bg`, enquanto o botão desabilitado usa `--soft`/`--muted` sem opacidade. Referências mantidas: as diretrizes da Vercel para estados de interação e o mínimo de contraste 4,5:1 da busca local UI/UX Pro Max. Interação observável: “Continuar” permanece legível antes e depois da escolha, inclusive em hover e foco. Verificação: varredura de 304 estados de botões e links de ação visíveis no desktop, celular e editor, nos dois temas.

### 2026-10-28: ações textuais do diagnóstico
Objetivo: impedir que “Recomeçar” e “Atualizar texto” pareçam botões com conteúdo colado à borda. Causa observada: essas ações herdavam o hover com fundo de botão preenchido, mas tinham padding esquerdo zero e direito de 15px. Decisão: tratá-las como ações textuais em todos os estados, com padding horizontal simétrico, sublinhado e mudança de cor no hover. Referências mantidas: hierarquia de controles discretos do Linear e diretrizes de interação da Vercel. Verificação: clique, confirmação e hover nos três idiomas, nos temas claro e escuro, em desktop e celular; inspecionar capturas reais e geometria dos alvos.
