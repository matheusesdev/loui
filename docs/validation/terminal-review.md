# Terminal como entrada principal

20/10/2026. Direção aprovada pelo usuário: remover excesso de menus, centralizar a exploração no terminal, rádio compacta flutuante e logos nas cores originais.

Implementado: terminal na home, sem dock; sete comandos sugeridos clicáveis; entrada por teclado com histórico e saída segura; retorno no cabeçalho e foco na entrada ao fechar. Conteúdos permanecem em janelas. Rádio flutuante sem item de menu, expansão para playlist e créditos, volume sempre disponível, continuidade de reprodução. Logos locais coloridos Devicon/Simple Icons, sem filtros; atribuições em public/logos.

Validação fresca: npm run check sem erros/avisos; npm run build aprovado; scripts/verify-terminal.cjs aprovado contra Vite e preview compilado. Cobertura: sugestões/teclado, retorno/foco, histórico, injeção como texto, oito logos, idiomas, tema, reprodução real MP3 persistente, expansão/créditos, seis tamanhos e contenção acima da rádio. Evidências: terminal-results.json e terminal-*.png.

Suítes workspace/desktop/build anteriores que dependem de dock são históricas. Limites: navegador emulado, sem dispositivos físicos ou leitor de tela. Sem publicação.
