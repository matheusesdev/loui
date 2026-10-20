# loui — revisão da primeira implementação

**Versão atual: ambiente explorável**, aprovado conceitualmente pelo usuário e implementado após a referência Órbita. Parecer estático independente, evidências e limites em `workspace-review.md`. As avaliações abaixo são históricas da página contínua e não substituem a revisão do novo ambiente.

Data: 20/10/2026. Escopo: versão local estática; sem publicação.

## Decisão de acabamento: PASS para revisão visual pelo usuário

A página implementa o contrato aprovado: marca em destaque na introdução, frase exata, ação Entrar, oferta comercial na primeira seção, serviços, processo, sobre e contato. O movimento se relaciona com conexões e tipografia. Não há conteúdo de projetos, clientes ou métricas inventados.

## Evidências

- Execução de `scripts/verify.cjs`: 21 verificações agrupadas aprovadas, sem erro de página ou recurso HTTP com erro. Resultado detalhado em `results.json`.
- Sete tamanhos: 360×800, 390×844, 768×1024, 1024×768, 1440×1000, 844×390 e 720×500; dois temas; sem rolagem horizontal no documento ou na introdução.
- Capturas `intro-*` e `site-*` registram desktop e celular nos dois temas. Composição da introdução e página foi inspecionada visualmente.
- Contraste medido das cores de texto, texto secundário e destaque contra o fundo principal: mínimo 5,92:1 na paleta inicial.
- Entrada animada, transferência de foco, accordion por teclado, âncora direta, tema persistido, armazenamento bloqueado e ausência de JavaScript verificados.
- Projetos: teste temporário de renderização em memória, URL insegura rejeitada e retorno a coleção vazia. Nenhum exemplo permanece no conteúdo.
- Contatos nulos: formulário desativado, sem envio simulado. Mudança de tema continua disponível antes e depois da entrada.

## Correções feitas na revisão

- Limitado o transbordamento do anel decorativo na seção Sobre, que criava excesso horizontal em 360 px.
- Removida captura de ponteiro pelas letras decorativas: durante a animação inicial elas podiam sobrepor a região clicável de Entrar em desktop.
- Movimento automático da introdução limitado a 4,5 segundos. Depois permanece estático, respondendo apenas à interação. Movimento reduzido elimina a sequência.
- Saída da introdução conclui tanto pelo encerramento da animação quanto por temporizador de segurança.

## Limites da validação

- Navegador utilizado: Edge/Chromium headless. Firefox, Safari, leitores de tela e dispositivos físicos não foram testados.
- 720 px cobre reflow de largura equivalente a 1440 px com ampliação de 200%, mas não constitui teste do controle nativo de zoom do navegador.
- As capturas completas usam movimento reduzido para registrar todo o conteúdo. A saída com movimento normal tem verificação funcional separada.
- Não há medição de Core Web Vitals em produção, teste de envio real, backend, domínio ou deploy. O formulário requer integração futura.
- O PASS se aplica à entrega local para avaliação do usuário; não é certificação de acessibilidade ou desempenho em produção.

## Execução e manutenção

Consultar `README.md` para servir localmente, editar projetos, configurar canais reais e experimentar paletas alternativas.

## Evolução: idiomas e experiências — 20/10/2026

Decisão: **PASS para revisão pelo usuário**, mantendo os limites de navegador e acessibilidade descritos acima.

- Regressão da primeira versão: as 21 verificações agrupadas continuam aprovadas.
- Suíte de evolução: 24 verificações agrupadas aprovadas, registradas em `experience-results.json`, sem erro JavaScript na página monitorada.
- Idiomas PT/EN/ES verificados em 360, 390, 768, 1024 e 1440 px, nos dois temas; sem excesso horizontal. Título, campos, textos e nomes acessíveis de controles traduzidos.
- Transição de desfoque verificada com movimento normal; mudanças imediatas com movimento reduzido. Troca rápida preserva a última escolha e ambos os seletores permanecem sincronizados.
- Idioma salvo entre recargas; mudança funcional também com armazenamento bloqueado.
- Quatro cenas concluídas e repetidas por teclado; interação por toque emulado validada na entrada, idioma e demonstração.
- Tipografia reativa, convergência ao entrar e apresentação seguinte verificadas. A assinatura continua baseada em letras e conexões, sem efeitos de cor ou conteúdo fictício acrescentados.
- Capturas adicionais: `experience-mobile-en.png`, `experience-desktop-en.png` e `demo-complete-en.png`.
- Demonstrações são conceituais: não executam automações reais, não chamam IA e não representam projetos de clientes.
- Não houve backend, publicação, commit ou push nesta evolução.

## Acabamento e correção de reinício — 20/10/2026

- Seletor nativo substituído por um painel com nomes completos, código e indicação de seleção, acionável por teclado; Escape fecha o painel sem fechar a introdução.
- Transição de idioma estendida: troca do conteúdo após 520 ms, sustentação de 220 ms e retorno de nitidez em 580 ms. Movimento reduzido continua imediato; mudanças sucessivas continuam protegidas pelo identificador de revisão.
- Cabeçalho flutuante com navegação compacta, indicação da seção atual e menu para celular/tablet; botões, campos, processo e serviços receberam revisão visual.
- Demonstrações posicionadas ao lado da descrição em desktop e abaixo em mobile; nós com ícones próprios, fios de conexão e peças de interface com mais detalhe.
- Causa do problema de reinício: o mesmo clique removia e reaplicava o estado de execução, retornando imediatamente ao estado concluído com movimento reduzido. Agora Recomeçar limpa estados e temporizadores e permanece em idle; Experimentar inicia novamente.
- Regressão específica reproduziu a falha antes da correção e passou após a mudança. As quatro cenas foram verificadas, incluindo cancelamento durante a execução sem conclusão tardia.
- `verify.cjs`, `verify-experience.cjs` e `verify-polish.cjs` concluíram com saída 0 após as mudanças. Escopo continua Edge/Chromium headless e toque emulado; sem alegação de testes em aparelhos físicos ou leitores de tela.
- Evidências adicionais: `polish-services-desktop.png`, `polish-language-menu.png`, `polish-mobile.png`. Capturas em movimento podem registrar etapas intermediárias da transição, não apenas o estado estático.
