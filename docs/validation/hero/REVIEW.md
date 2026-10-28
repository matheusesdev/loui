# Hero de demonstração

Implementado em `StudioHero.svelte`, compartilhado entre abertura desktop e mobile. Selecionar agenda, atendimento ou CRM atualiza título, imagem, legenda e links sem movimento automático. Screenshot real, sem mockup inventado. Terminal preservado.

Validação:
- Svelte check e build aprovados. Aviso conhecido do script clássico theme-init.js mantido para execução antes da primeira pintura.
- Chromium: 1440×900, 1024×768, 768×1024, 390×844, 320×568 e 844×390; português, inglês e espanhol; temas claro e escuro; três seleções em cada combinação.
- Imagens carregaram, sem overflow horizontal nem erros JavaScript.
- Seleção pelo teclado, abertura real das três demos e comando de serviços no terminal verificados.
- CTA conferido acima da navegação fixa nos celulares de 320 e 390px nos três idiomas.
- Screenshots inspecionados em desktop, tablet e mobile. As capturas full-page incluem a navegação fixa na posição inicial do viewport.
- Revisão contra Web Interface Guidelines: nomes acessíveis, estado aria-pressed, foco visível, legenda com anúncio polite, links com indicação de nova aba e imagens com dimensões.

Limites: testes desta tarefa em Chromium local; não representam dispositivo físico ou teste em Firefox/WebKit. Testes principais com reduced motion. O hero não introduz animações.
