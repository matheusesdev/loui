# QA visual e auditoria da UI

Página: http://127.0.0.1:5173/#inicio . Branch: design/conteudo-e-demonstracoes.
Diretrizes consultadas: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

## Achados corrigidos no hero (referências ao código final)

- src/styles/content-first.css:121 — alto: em 844×390 a abertura mobile herdava a composição desktop. O CTA começava em y=443, abaixo da navegação fixa em y=329. Criada composição própria para o mobile em paisagem, com ação e seletores ao lado do texto.
- src/styles/content-first.css:112 — médio: em 320×568 o CTA terminava em y=494.02 e a navegação começava em y=495. O contorno de foco de 6px não tinha folga. Seletores curtos em uma linha e texto conciso recuperaram espaço sem reduzir corpo ou alvo de toque.
- src/styles/content-first.css:87 — médio, julgamento visual: em 768×1024 a screenshot tinha só 363px de largura dentro da composição desktop e pouco ajudava a entender o fluxo. Agora usa 720px, com texto e controles acima. O terminal continua alcançável pela rolagem interna; não é obrigatório que todo o conteúdo caiba no primeiro viewport.
- src/components/StudioHero.svelte:8 — médio: a seleção vivia apenas em memória e voltava ao CRM ao recarregar. Agora a query demo mantém a seleção e permite compartilhar a mesma demonstração. Valor inválido volta ao CRM.

## Achados pendentes fora do hero

- src/components/ContactForm.svelte:43 — médio: o formulário começa em H3; na rota mobile de contato ele vem depois de H1 sem H2. Ajustar o nível por contexto, preservando a hierarquia da versão desktop.
- src/components/MobileApp.svelte:26 — baixo: o link de pular conteúdo usa o rótulo de explorar serviços, mas aponta para o conteúdo principal. Usar rótulo próprio de pular conteúdo nos três idiomas.

## Verificação executada

Playwright com Chromium local, sem instalar dependências. Screenshots antes/depois em 1440×900, 1024×768, 768×1024, 390×844, 320×568 e 844×390, temas claro e escuro. Testes automatizados em três idiomas e três seleções por tamanho/tema, total de 108 combinações.

Conferidos: contorno de foco, estado aria-pressed, imagem carregada, destino e idioma do CTA, botão sem sobreposição e com folga de 6px em relação à navegação, tema pelo controle real, meta theme-color e recarga da seleção. Sem overflow horizontal ou erros JavaScript.

Três demonstrações abertas e renderizadas em desktop e mobile, total de seis prévias reais. Serviços, projetos e contato capturados nos dois tamanhos. Formulário vazio focou o primeiro campo inválido sem abrir serviço externo.

npm run check e npm run build aprovados. Aviso preexistente do script clássico theme-init.js mantido por executar antes da pintura. slop-lint do hero e de seu stylesheet sem ocorrências. git diff --check aprovado.

Capturas de referência: before/844-390-light.png e after/844-390-light.png; before/320-568-light.png e after/320-568-light.png; before/768-1024-light.png e after/768-1024-light.png. Os contornos visíveis nas capturas depois são o foco intencional exercitado pelo teste.

## Reproduzir

Com o servidor de desenvolvimento ativo, executar scripts/verify-hero-audit.cjs. PLAYWRIGHT_PATH aponta para um módulo Playwright existente; BROWSER_PATH pode apontar para o Chrome instalado; SITE_URL aceita outro servidor local de desenvolvimento. O teste importa /src/i18n.js e é destinado ao servidor de desenvolvimento, não a produção.

## Limites

Não é certificação WCAG nem auditoria exaustiva de cada estado. Testes desta tarefa em Chromium com reduced motion e viewports emulados, sem aparelho físico, Firefox ou WebKit. O hero não adiciona animação. Os screenshots das demonstrações retratam seu tema original, inclusive quando a página externa está escura. Alterações preexistentes preservadas; sem commit, push ou deploy.
