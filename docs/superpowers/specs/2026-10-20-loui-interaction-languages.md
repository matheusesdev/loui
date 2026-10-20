# loui — evolução aprovada e implementada

Em 20/10/2026, o usuário aprovou a evolução da experiência preservando a identidade minimalista, as cores e os dois temas existentes.

## Escopo aprovado

- Entrada tipográfica responsiva ao ponteiro e ao toque; convergência de letras e linhas ao entrar, com continuidade visual para a apresentação principal.
- Quatro demonstrações conceituais, acionadas pelo visitante: organização de uma interface, execução de um fluxo, conexão entre sistemas e organização de um caminho.
- Idiomas português, inglês e espanhol, com seletor próximo ao tema na introdução e no cabeçalho.
- Transição breve de desfoque no texto ao trocar o idioma, preservando a posição de rolagem e a escolha do visitante.
- Teclado, toque e movimento reduzido contemplados. Sem introduzir serviços externos, APIs de IA, backend ou conteúdo fictício.

## Implementação

- `src/locales.js`: traduções autorais dos textos da interface e metadados.
- `src/i18n.js`: tradução de textos e atributos, seletores sincronizados, persistência tolerante a falha e anúncio acessível. Trocas sucessivas aplicam a última escolha. Português é o padrão; não usar inferência por IP nem trocar o idioma sem escolha explícita.
- `src/experiences.js`: demonstrações e tipografia reativa. Estados de conclusão são traduzidos e anunciados; repetir reinicia a experiência. As cenas não enviam informações.
- `src/styles/experience.css`: movimento tipográfico, diagramas, seletor e desfoque; movimento reduzido aplica mudanças imediatas.
- `src/main.js` e `src/theme.js`: atualização dos controles, contatos e projetos quando o idioma muda.

## Sequência de execução

- [x] Preservar a versão atual e separar idiomas e experiências em módulos próprios.
- [x] Traduzir navegação, conteúdo, botões, campos, estados, atributos acessíveis, título e descrição.
- [x] Implementar troca de idioma, persistência, desfoque e preferência de movimento reduzido.
- [x] Implementar as quatro cenas com controles nativos acionáveis por teclado/toque.
- [x] Evoluir a tipografia da introdução e a transição de entrada.
- [x] Executar regressão da primeira versão e suíte específica de idiomas/interação.
- [x] Inspecionar capturas desktop/mobile e documentar resultado e limites.

## Projetos futuros

As descrições de projetos reais aceitam `translations.en` e `translations.es`, com campos título, resumo, categoria e descrição da imagem. Sem tradução específica, usar o conteúdo original, sem tradução automática inventada. A coleção continua vazia.

## Evidência e limites

Ver `docs/validation/experience-results.json` e `docs/validation/review.md`. Não houve publicação, commit ou push. Inspeção em navegador Chromium e toque emulado não equivale a testes em dispositivo físico, Safari ou leitor de tela.
