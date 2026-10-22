# Etapa 4b — carregar o necessário

Base: segurança commit `cbde32c`, merge `bb3e142`, publicada na Vercel como Ready.
Branch de trabalho `evolution/04-performance`.

Medição inicial: três contextos Chrome sem cache, build local, notebook 1348×591.
Cada abertura solicita 214.532 bytes de JavaScript e 658.596 bytes de fonte;
há 1.179 elementos no DOM, incluindo três editores fechados. Sem CPU/rede simuladas;
isso não representa métricas de visitantes reais nem promessa de tempo de carga.

## Decisões antes de implementar

- Manter convites e previews visuais nos serviços. Carregar e montar o editor
  apenas ao começar uma experiência; manter a instância depois para preservar código.
- O módulo de carregamento apresenta status acessível, permite tentar novamente
  e não abre um modal atrasado se a pessoa já deixou o serviço. Retorno de foco
  sempre para o botão original. Nenhum HTML vazio ou nova tela de carregamento.
- Três editores compartilham o mesmo módulo baixado, mas seus textos continuam
  independentes. Não antecipar download por hover em dispositivos móveis.
- Converter a própria fonte Archivo variável de TTF para WOFF2, sem remover
  glifos ou eixos. Preservar arquivo original e licença; atualizar site e prévia.
- Medir bytes solicitados e DOM antes/depois com o mesmo script e três execuções.
- Não remover estilos por suposição, alterar layout ou introduzir novas dependências
  de runtime. Ferramenta de conversão da fonte fica no diretório temporário.

Referências: componentes atuais (identidade e composição), documentação oficial
Svelte 5 de componentes dinâmicos, bind:this e tick (ciclo de vida), consulta local
UX Pro Max sobre feedback de loading e nova tentativa, Web Interface Guidelines
para status acessível e estabilidade de layout. Skills locais de frontend e UX
orientam somente os estados de carregamento, sem redesenho.

Validar três idiomas e dois temas; teclado, tela pequena e paisagem; falha de
download, clique repetido, saída durante carregamento, nova tentativa, código
preservado, popup da prévia, CSP, contato, abertura e rádio.

## Resultado da implementação

LabLauncher conserva o convite inicial; LabWorkbench só é importado após o clique.
A instância fica montada para preservar o código. Carregamento usa aria-busy;
erro oferece nova tentativa, sem recarregar a página. Um observador cancela a
intenção de abrir ao sair do serviço ou recolher sua descrição. Promessa compartilhada
evita downloads paralelos do mesmo editor.

Chrome guarda a rejeição de um import que falhou: simplesmente limpar a promessa
não bastava. A recuperação consulta o manifest do build Vite e importa o mesmo
entry com uma query de tentativa nova. Continua sendo recurso da própria origem,
sem eval, blobs ou relaxamento da CSP. O manifest só é solicitado após uma falha.

Três medições com o mesmo script, contexto limpo e cache desativado:

| Medida inicial | Antes | Depois |
| --- | ---: | ---: |
| JavaScript solicitado, bytes sem compressão | 214.532 | 157.672 |
| Fonte solicitada, bytes | 658.596 | 189.412 |
| Elementos no DOM | 1.179 | 867 |
| Editores montados | 3 | 0 |

Redução de aproximadamente 26,5% no JavaScript inicial e 71,2% na fonte.
Glifos, mapa de caracteres e eixos variáveis conferidos com FontTools; original
TTF e licença mantidos. A ferramenta foi executada no cache temporário do uv,
sem dependência nova no projeto. Build mantém o aviso preexistente do script
clássico theme-init.js; check sem erros ou avisos.

Teste de navegador em 1440×900, 768×1024, 320×568 e 844×390, PT/EN/ES e ambos os
temas: um único download, três instâncias independentes, código preservado,
foco de retorno, prévias separadas, falha de rede e retry, saída durante download.
Capturas de celular revisadas. Regressão de segurança: headers/CSP, contato,
18 prévias e reprodução local/fixture aprovados; evidência isolada neste diretório.

Limites: medições locais de bytes/DOM; não são Core Web Vitals de campo nem teste
de banda móvel. Recuperação validada para falha do entry do editor; falha persistente
de rede continua exibindo erro. Não houve commit, merge, push ou deploy desta etapa.
