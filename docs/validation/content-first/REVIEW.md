# Validação da proposta de conteúdo

Branch: `design/conteudo-e-demonstracoes`.

- `npm run check`: sem erros ou avisos.
- `npm run build`: aprovado. Mantido o aviso sobre o script clássico `theme-init.js`, que precisa executar antes da pintura inicial.
- Chromium: 1440×900, 768×1024, 390×844, 320×568 e 844×390; três idiomas e dois temas; sem overflow horizontal e com três acessos às demos.
- Capturas inspecionadas: abertura desktop, tablet e celular pequeno. As capturas de página inteira no celular incluem a navegação fixa na posição do viewport, não representam sua posição durante toda a rolagem.
- Fluxo: foco visível no primeiro link; três demonstrações abriram páginas funcionais; comando `servicos` abriu a janela; editor abriu e recebeu código pelo controle de preenchimento.
- Lint dos componentes e stylesheet da proposta: sem erros ou avisos. Três informações sobre quebra de títulos são falsos positivos de escopo: `mobile.css` aplica `text-wrap:balance` aos títulos.
- Revisão baseada nas Web Interface Guidelines: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md . Novas imagens com dimensões e alt localizado; novos controles com foco visível; links externos com noopener; novos estilos sem movimento automático.

Limites: esta validação usou Chromium local e reduced motion. Não constitui teste em aparelho físico nem nova cobertura de Firefox/WebKit. Os ajustes de materiais e tracking nas prévias precisam também de avaliação estética do usuário.

Os arquivos que já estavam modificados antes desta tarefa foram preservados. Sem commit, push ou deploy.
