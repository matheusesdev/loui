# Etapa 4c — qualidade e descoberta

Base: desempenho `8a2228a`, merge `aa3d168`, push confirmado e deploy automático Ready.
Branch: evolution/04-quality-discovery.

Diagnóstico: título/descrição e idioma existem, mas não há canonical, Open Graph,
imagem social, robots.txt ou sitemap na raiz. Prévia já tem noindex. Idiomas são
preferências no mesmo endereço, sem páginas próprias: não inventar hreflang.
Sem Search Console conectado, não afirmar indexação nem resultados de pesquisa.

Decisões: usar o alias público atual https://loui-phi.vercel.app/ como canonical;
metadata de compartilhamento em português no HTML entregue, descrição coerente
com idioma no navegador. Imagem original com marca, frase preservada e terminal
estilizado, sem dados inventados. Fonte e paleta existentes, 1200×630, contraste
e margens de segurança. Não redesenhar as páginas nesta etapa.

Robots permite rastrear e informa sitemap com somente a home. Prévia fica fora
do sitemap e mantém noindex, sem bloqueio de crawling que impeça ler a diretiva.
Metadata usa uma fonte de configuração. Não criar rotas fictícias por hash ou idioma.

Referências: [Google canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls),
[robots](https://developers.google.com/search/docs/crawling-indexing/robots/intro),
[Open Graph](https://ogp.me/). Contexto comercial: spec aprovada e conteúdo atual.

Qualidade: comando de validação repetível e CI de check/build/artefatos, sem
segredos, novas dependências ou publicação automática pela workflow adicionada.
Verificar HTML servido, fonte/imagem, sitemap, prévia noindex, PT/EN/ES,
CSP e navegação existente. Indexação real e domínio próprio permanecem externos.

## Verificação

`npm run validate` passou: Svelte sem erros/avisos, build e validação dos artefatos.
Conferidos no navegador: canonical único, três descrições autorais conforme idioma,
robots/sitemap/PNG servidos com 200 e prévia com noindex. Imagem de compartilhamento
revisada em 1200×630. HTML inicial de compartilhamento independe de JavaScript.

Workflow preparada usando as versões v7 documentadas de checkout/setup-node,
Node 24 e permissão somente de leitura. Execução remota do CI ainda não ocorreu:
essa etapa permanece sem commit/push. A medição e o editor lazy da etapa 4b
foram conferidos no alias de produção após o deploy Ready.

Limites: não foi solicitada indexação ao Google, acessado Search Console ou
testado cache de cards em redes sociais. Canonical usa o alias atual; domínio
próprio requer atualizar a configuração quando existir. Sem schema ou hreflang
inventados, nem novas páginas ou rastreamento. Não há promessa de ranking.
