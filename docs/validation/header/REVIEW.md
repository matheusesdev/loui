# Header compacto

Branch: design/conteudo-e-demonstracoes.

Marca à esquerda; preferências por ícone à direita; links sociais separados por divisor. Idioma usa globo no desktop e seletor nativo no mobile. Aparência, som e animações preservam nomes acessíveis e apresentam dicas no hover/foco. As dicas acompanham as mudanças de estado e idioma, e podem ser dispensadas com Escape.

Movimento passou a usar interruptor com posição, play/pause e estado aria-checked correspondente a animações ativadas. Clique e Space alternam, com anúncio acessível e persistência local. A preferência prefers-reduced-motion tem prioridade; nesse caso, o controle continua focável, informa por que está pausado e não ativa movimento. A mesma implementação está disponível no mobile.

Validação: npm run check e npm run build aprovados. Mantido o aviso conhecido de theme-init.js, script clássico anterior à pintura. slop-lint dos controles e CSS sem ocorrências; git diff --check aprovado.

Playwright/Chromium: 1440×900, 1024×768, 768×1024, 390×844, 320×568 e 844×390; português, inglês e espanhol efetivamente aplicados; claro e escuro. Sem overflow horizontal ou erros JavaScript. Testados teclado, dicas no foco, tamanho mínimo de 44px, ligar/desligar, recarga, mudança dinâmica da preferência do sistema, som e retorno ao terminal pela marca.

Capturas neste diretório, com estados claro/escuro e dicas. Scripts reproduzíveis: scripts/verify-header.cjs, com PLAYWRIGHT_PATH e BROWSER_PATH apontando para instalações existentes. O servidor local usa a porta 5173.

Revisão pelas Web Interface Guidelines: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md . Ícones decorativos ocultos da árvore acessível; controles com nome e estado; foco visível; tooltip legível; tamanho de toque; sem novas animações de atenção.

Limites: Chromium com viewports emulados, sem aparelho físico ou nova cobertura de Firefox/WebKit. Nenhum commit, push ou deploy; alterações anteriores preservadas.
