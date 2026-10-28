# Bandeiras no seletor de idioma

Branch: ui/bandeiras-idioma. Associação: pt → Brasil; en → Estados Unidos; es → Espanha. SVGs locais de flag-icons, licença MIT preservada em public/flags/LICENSE. Fonte: https://github.com/lipis/flag-icons/tree/main/flags/4x3 .

A bandeira ativa aparece no header, mobile e tela de entrada. As opções desktop mantêm nomes dos idiomas e incluem suas bandeiras. No mobile, o seletor continua nativo, com nomes completos, foco visível e alvo 44×44px; a aparência mostra apenas a bandeira. Arte a 20×15px (mesma largura do ícone anterior), sem filtros e com proporção 4:3.

Verificação no artefato compilado servido em 4174: Chromium, seis tamanhos (1440×900, 1024×768, 768×1024, 390×844, 320×568, 844×390), três idiomas e dois temas. Bandeiras carregadas, dimensões e filter/opacity conferidos em cada combinação; sem overflow horizontal nem erros JavaScript. Troca por teclado no desktop e pelo select nativo no mobile; seletor da entrada também conferido. Capturas inspecionadas em desktop escuro e celular de 320px.

npm run check e npm run build aprovados; aviso conhecido do script clássico theme-init.js mantido. git diff --check aprovado. Nenhum commit, merge, push ou deploy nesta tarefa. Alterações preexistentes preservadas. Testes em Chromium emulado, sem nova cobertura de aparelhos físicos ou outros motores.
