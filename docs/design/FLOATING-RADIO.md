# Terminal móvel e rádio

Branch: `feat/terminal-radio-moveis`. Sem alteração de produção nesta etapa.

## Direção

Aplicar frontend-design, UI/UX Pro Max e web-design-guidelines. Manter o terminal macOS
e a rádio pequena. Referências: a hierarquia das próprias janelas da loui, controles
de um pequeno receptor de rádio e seleção de listas de produto já adotada no projeto.
Paleta e tipografia usam os tokens existentes. Evitar ondas decorativas grandes,
capas inventadas, gradientes e uma nova navegação principal.

Rádio: cabeçalho de movimento, identificação do que toca, ação principal circular,
estado legível e volume. A expansão revela a escolha de fonte, gênero e emissora.
Indicador animado existe somente durante reprodução, respeitando movimento reduzido.

## Movimento

Terminal é arrastável pelo cabeçalho em desktop; no celular mantém o encaixe de
leitura, como as outras janelas. Rádio pode ser movida também por toque. Cabeçalho
focável aceita setas (10 px), Shift+setas (40 px) e Home para restaurar. Botão de
restauração fornece alternativa de clique. Posições ficam limitadas à tela e são
recalculadas quando a janela muda de tamanho ou o player expande. Sem persistência
de posição nesta etapa, evitando recuperar coordenadas de outro dispositivo.

## Fonte online

[Radio Browser API](https://docs.radio-browser.info/) consultada em 20/10/2026.
Busca pública por tags/gêneros; não requer chave no fluxo implementado. Primeiro
servidor de1, alternativa de2, timeout e cancelamento de consultas antigas.
Filtrar streams HTTPS MP3 e excluir HLS; não assumir suporte de todo navegador.
Resultados em cache na sessão. Consulta de lofi ao vivo retornou HTTP 200 e CORS `*`.

Buscar um gênero não inicia reprodução nem interrompe a fonte atual. Selecionar uma
emissora é ação explícita. Informar catálogo vazio, indisponível e falha de reprodução;
manter a seleção lofi local disponível com créditos. Não inventar título da música
atual: a API fornece o nome da emissora, não metadados de cada música.

As emissoras são independentes e podem ter anúncios, restrições territoriais ou
ficar indisponíveis. Não baixar/retransmitir os arquivos nem prometer disponibilidade
contínua. A reprodução usa o stream da emissora diretamente no navegador.
