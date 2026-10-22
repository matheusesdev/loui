# Ambiente compacto sem navbar

Correção solicitada pelo usuário após a captura de notebook. Esta orientação
substitui a decisão anterior de aceitar rolagem na abertura.

## Problema e evidência

Na reprodução em 1348×591, a abertura tinha 517 px de altura útil e 709 px de
conteúdo. Os atalhos de serviços e contato começavam em y=593, abaixo da tela.
Navbar, título dimensionado pela largura, margens e blocos repetidos consumiam
a altura disponível. Acrescentar rolagem não atendia à intenção do produto.

## Decisão

- Remover a navbar do HTML e sua dependência no controlador de projetos.
- Conservar a marca na introdução e no terminal; manter a frase institucional.
- Agrupar apresentação e terminal, com tamanhos que consideram largura e altura.
- Em paisagem baixa, usar duas colunas; em telas estreitas, empilhar com espaços menores.
- Reunir instrução e referência ao help em uma linha, sem repetir chamadas de exploração.
- Idioma, tema e retorno ao terminal em controles utilitários de 44 px no canto inferior.
- Rádio em estado inicial compacto, com faixa e reprodução; lista, volume e demais
  controles disponíveis ao expandir. Preservar estado e reprodução.
- Manter redes sociais discretas fora das áreas ocupadas pelo terminal e pela rádio.
- Preservar conteúdo de serviços, formulários, código e prévias. Conteúdo longo dentro
  das janelas continua com rolagem própria; a abertura não exige rolagem.

Tipografia: Archivo para apresentação, Menlo/sistema no terminal e controles.
Paleta mantida: claro #efeee9, janela #f6f5f0, texto #20292d, acento #245c73;
escuro #14191d, texto #f1f0eb. Sem nova família visual ou efeitos decorativos.

## Referências e critério observável

- Captura do usuário: referência de falha no notebook, não de composição desejada.
- Terminal e rádio do próprio projeto: manter materiais e comportamento, reduzir
  ocupação inicial. Fontes: src/styles/macos-terminal.css e floating-radio.css.
- Web Interface Guidelines: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
  para foco, rótulos, toque, áreas seguras e navegação.
- UI/UX Pro Max: consulta de viewport confirmou uso de dvh para altura dinâmica.

Interação observável: entrar e alcançar todos os comandos sem rolar; abrir uma
janela, voltar ao terminal e conservar a mensagem; trocar idioma/tema e expandir
a rádio sem sair dos limites da tela. Alvos principais não podem se sobrepor.

## Verificação

Teste de reprodução falhou antes da correção com a medição 709 > 517.
Nova matriz verifica 13 tamanhos, três idiomas e dois temas (78 cenários),
sem corte, rolagem da abertura ou sobreposição do terminal com controles/radio/redes.
Inclui 1348×591, 320×480 e 568×320. Também verifica redimensionamento sem recarregar,
rádio expandida, comandos de tema e navegação, movimento normal e preservação de campos.
Evidências: docs/validation/compact-workspace.

Trabalho mantido na branch evolution/01-commercial-clarity como correção da etapa
ainda não integrada; alterações anteriores preservadas. Sem commit ou publicação.
