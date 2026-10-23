# Controles diretos no topo — 23/10/2026

Engrenagem e diálogo de preferências removidos. Idioma, aparência, som e redução
de movimento agora têm acesso direto no topo, com espaços fixos por controle.
O Dock continua responsável por recuperar janelas; a lista intermediária antiga
foi retirada. Nenhuma alteração na experiência de celular.

Check sem erros/avisos Svelte e build aprovados. Aviso clássico de theme-init
preexistente preservado. Chrome, Firefox e WebKit passaram por PT/EN/ES,
claro/escuro, 1440px e 768px, sem deslocamento dos slots ao trocar idioma.
Verificados persistência de som e redução de animações após recarregar,
teclado no seletor de idiomas, respeito à redução de movimento do sistema,
limites da barra e ausência destes controles no modo celular.

Teste de regressão verify-desktop-discovery-edge aprovado nos três engines:
predições do terminal, prévia real separada, recuperar contato pelo Dock e
preferências persistidas. No Chrome, animações de sol/lua verificadas em execução
e após finalizar. Capturas finais claras/escuras em 1440px e 768px inspecionadas.

Revisão das Web Interface Guidelines: botões nomeados, switch com aria-checked,
SVGs decorativos, foco visível, feedback apenas por ação e reduced motion.
O teste animado encontrou sobreposição inicial com o minimizar do editor;
corrigida reservando 64px no ambiente e iniciando o editor abaixo dos controles.
Em expansão completa, os controles do topo se recolhem para liberar a janela.
Regressão do Dock aprovada nas nove combinações de engine/viewport; teste
animado e sons aprovados. Teste final nos três engines confirmou reserva do
topo, expansão do editor sem sobreposição, minimizar/recuperar e fechar.
Testes locais em Windows; WebKit não é teste físico de Safari/iPhone.
