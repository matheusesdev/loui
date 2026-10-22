# Etapa 4a — revisão

Branch local `evolution/04-security`. Ainda sem commit, merge ou publicação.

Implementados: mapa de conexões e dados, CSP, bloqueio de incorporação, nosniff,
Referrer-Policy e Permissions-Policy. Inicialização de tema movida para arquivo
local síncrono, permitindo bloquear scripts inline sem alterar a preferência salva.

## Verificação

- Check sem erros ou avisos; build aprovado.
- `verify-security.cjs` serve os arquivos de `dist` com os headers de `vercel.json`.
- Seis combinações de contato (três idiomas e dois temas), três tamanhos, foco,
  erros e restauração de tema; 18 prévias com interação nas três experiências.
- Catálogo com falha no primeiro servidor e alternativa no segundo; reprodução
  real do áudio local e áudio de fixture servido por rota HTTPS interceptada.
- Nome de emissora e texto com tags permanecem texto; JavaScript arbitrário na
  prévia é recusado; script inline e fetch não autorizado bloqueados pelo navegador.
- Abertura inicial com intro, screenshots de abertura e prévia inspecionadas.
- Zero erros de execução e zero violações CSP nos fluxos legítimos.

Os bloqueios negativos geram as violações esperadas em `results.json`. Não houve
envio real de contato, consulta a catálogo real nem reprodução de emissora real
nesta suíte. Chrome automatizado; sem dispositivos físicos ou leitor de tela.

O Vite informa que o script clássico de tema não é empacotado como módulo. Isso é
intencional: ele precisa executar antes dos estilos; é copiado para `dist/public`
e carregado com sucesso nos testes. Os demais scripts continuam empacotados.

Headers Vercel ainda precisam ser conferidos no ambiente publicado quando esta
etapa for autorizada para produção. Estilos inline e áudio HTTPS variável são
exceções documentadas, não permissões globais para scripts ou fetch.
