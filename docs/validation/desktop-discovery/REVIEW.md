# Descoberta desktop — 23/10/2026

Branch: evolution/09-desktop-discovery, base 79b1a03.
Sem commit, merge, push ou deploy. Pendências anteriores de compatibilidade
entre navegadores preservadas fora deste escopo.

## Resultado implementado

- Serviços: Experimentar abre a demonstração local diretamente em outra aba.
  Explorar o código continua carregando o editor sob demanda. Convite explica
  os dois caminhos; diagnóstico também pode levar diretamente ao resultado.
- Projetos: capturas reais das três demonstrações, descrição, autoria e limites,
  com ações de experimentar e explorar código antes do estudo técnico.
  Imagens geradas por scripts/capture-project-previews.cjs com dados de exemplo.
- Terminal: previsões por idioma com descrição, setas, Enter, Tab e Escape.
  Opção ativa rola para dentro da lista; histórico continua acessível quando
  ela está fechada. Sem execução automática só por digitar.
- Janelas: painel lista abertas/minimizadas, permite recuperar e organizar as
  abertas sem recriar componentes nem apagar dados do formulário/editor.
- Preferências: idioma, tema e som existentes reunidos em diálogo; redução de
  movimento persistida, respeitando também a preferência do sistema. Aplica-se
  às janelas, terminal, entrada, acordeão e efeitos do ambiente.
- Mobile: sem novos controles desktop; prévias e conteúdo compartilhados mantidos.

## Evidências de verificação

`npm run validate`: svelte-check sem erros/avisos; build e discovery aprovados.
Aviso preexistente do script clássico theme-init permanece intencional.
`git diff --check`: aprovado.

`scripts/verify-desktop-discovery.cjs`: 27 combinações de engine/largura/idioma,
cada uma em claro/escuro. Chrome, Firefox e WebKit; 1440×900, 1280×720 e 768×1024;
PT/EN/ES. Sugestões por teclado, imagens carregadas, editor sob demanda,
preservação do contato, painel de janelas, preferências e isolamento mobile.

`scripts/verify-desktop-discovery-edge.cjs`: aprovado nos três engines.
Escape/Tab/histórico, seleção da última previsão, popup real da demonstração
sem modal de código, duas janelas organizadas com posições distintas e texto
preservado, recarga das preferências, Escape do diálogo sem fechar a janela.
Sons testados quando disponíveis: WebKit neste ambiente retornou indisponível
e manteve o botão desabilitado, sem bloquear o restante da interface.

`scripts/verify-mobile.cjs`, com MOBILE_VALIDATION_DIR apontando para
mobile-regression neste diretório: nove combinações de engine/viewport,
PT/EN/ES e claro/escuro, incluindo entrada, diagnóstico/contato e as três
prévias reais. Sem envio de mensagens externas. Evidências anteriores preservadas.

Verificação adicional na versão final: preferência de movimento reduzido salva,
entrada com foco no título e acordeão sem animação; aprovado em Chrome.

Capturas revisadas: projetos claro, preferências escuro, sugestões do terminal,
serviços e painel de janelas. Revisão pelas Web Interface Guidelines corrigiu
largura dos botões herdada do toolbar, previsão ativa fora da área rolável,
ações abaixo de detalhes extensos e marcadores duplicados da lista do convite.

## Limites

Teste automatizado e revisão visual em Windows. WebKit não substitui Safari
em macOS/iPhone. Sem leitor de tela físico, sem estudo com usuários externos
e sem medição de conversão. Demonstrações continuam locais; não há novas
integrações externas ativas. Esta versão aguarda avaliação visual do usuário.
