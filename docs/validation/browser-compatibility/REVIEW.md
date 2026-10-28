# Compatibilidade entre navegadores

22/10/2026, branch `evolution/07-browser-compatibility`, base publicada `fd25aa9`.
Retomada autorizada pelo usuário após a interrupção. Sem redesenho para celulares.

## Publicação confirmada

Main enviada ao origin em `fd25aa9189695a814113dcad155940158464f484`.
Vercel Ready: https://loui-7m4e4u9sb-matheusesdevs-projects.vercel.app,
alias https://loui-phi.vercel.app. CI Quality concluído com sucesso:
https://github.com/matheusesdev/loui/actions/runs/39851230536.

No endereço público: 200, canonical, CSP aplicada, diagnóstico, mensagem original
preservada, decisão explícita de acrescentar, Enter bloqueado durante pendência,
robots/sitemap/PNG/manifest e prévia noindex. Sem mensagem real enviada ou erros
de runtime/CSP nos fluxos testados. Nada desta nova branch foi publicado.

## Execução local multiengine

Binários correspondentes ao Playwright existente no cache foram instalados;
nenhuma dependência de runtime ou configuração do produto foi alterada.
Playwright utilizado: 1.64.0-alpha-1790635538000, cache de ferramentas já existente.
Versões dos motores estão em `experiences.json`.

Chrome, Firefox e WebKit passaram em 1440×900 e 390×844:

- Diagnóstico com animações ativas, minimizar/retomar, ampliar/restaurar no desktop,
  briefing preservado, contato/decisão de acrescentar, Enter seguro, idioma e layout.
- Três editores lazy, três prévias reais abertas e renderizadas, preenchimento,
  minimizar/reabrir sem perda de código e Escape.
- MP3 local realmente reproduzido, pausa, volume pelo teclado, mute e recolhimento
  da rádio. Sem usar uma estação externa como prova de disponibilidade.
- Capturas de editor no WebKit em tela estreita e diagnóstico no Firefox desktop
  revisadas. Conteúdo longo rola internamente; código largo mantém rolagem própria.

`verify-release-smoke.cjs` agora aceita RELEASE_VALIDATION_DIR, para guardar
evidências separadas sem sobrescrever o histórico de preparação da publicação.
Novo `verify-browser-experiences.cjs` falha se qualquer motor/cenário não passar.

## Limites

WebKit testado no Windows não é o Safari comercial nem um iPhone físico. Os
binários Playwright usam patches; recursos dependentes do sistema podem variar.
Referência: https://playwright.dev/docs/browsers#webkit.
As janelas estreitas são simulações de viewport; não substituem testes físicos.
Diagnóstico foi conferido em português/inglês nesta matriz multiengine; a matriz
completa PT/EN/ES e temas já está na revisão da etapa 5 em Chrome.

Não houve falha encontrada que exigisse correção no código do site. Mudanças desta
branch limitadas aos testes e documentação; ainda sem commit, merge ou publicação.
O redesenho de experiência para celulares continua reservado para uma próxima conversa.

## Revalidação para publicação, 28/10/2026

O site agora tem uma experiência mobile própria. O script `verify-browser-experiences.cjs`
foi atualizado: em 1440×900 testa os três editores, o código preservado, três prévias
e a rádio; em 390×844 testa a navegação mobile e as três prévias reais. Chrome,
Firefox e WebKit passaram nos dois tamanhos no build atual. Os resultados novos
estão em `experiences.json` e nas capturas correspondentes. A matriz antiga em
`browser.json` permanece como evidência histórica da etapa anterior.
