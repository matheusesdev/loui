# Dock de janelas

Pedido aprovado: barra flutuante inspirada na imagem do macOS enviada pelo
usuário, contendo ícones das janelas abertas e minimizadas, inclusive editores.

Referências: imagem anexada (material translúcido, ícones e indicador de app),
https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/ (setas e foco no grupo),
Web Interface Guidelines (áreas de toque, nomes, movimento reduzido e foco).
Sem copiar ícones proprietários: SVGs do projeto e cores dos tokens existentes.

Direção refinada: barra de 54px de altura, neutra, seguindo os tokens
existentes do loui. SVGs de 20px com traços de 1,5px e alvos de 44px.
Sem azulejos coloridos, gradientes, brilho, contornos de seleção ou ampliação
no hover. Fundo suave indica a janela ativa; ponto discreto indica abertura
e um pequeno traço indica minimização. Terminal à esquerda, janelas em ordem
de abertura, preferências à direita. Tooltip e nome acessível identificam os
itens sem acrescentar texto permanente à barra.

Refinamento de cor: somente os traços dos ícones recebem azul, âmbar, coral,
verde ou petróleo. Intensidade inspirada nos controles das janelas, adaptada
para contraste nos dois temas, sem fundos coloridos nem aumento de tamanho.
Terminal e preferências permanecem neutros.

Interação observável: abrir adiciona; minimizar mantém; fechar remove;
clicar recupera a instância e os dados. Fechar editor retorna o foco ao
próximo editor ou janela. Terminal recolhe todas as janelas e editores.
Movimento de minimizar usa o ícone correspondente como destino.
Em tela cheia, dock se recolhe e reaparece no limite inferior ou pelo teclado.
Atualização: preferências agora são controles diretos no topo, conforme
DESKTOP-TOP-CONTROLS.md. A engrenagem e o organizador intermediário saíram;
o Dock continua sendo o acesso às janelas abertas e minimizadas.

Arquitetura: estado de janelas existente e registro reativo dos editores,
com o mesmo proprietário de camadas. Editores são janelas não modais montadas
diretamente no ambiente, para permitir alternância real entre elas pelo dock.
Diálogos transitórios de preferências continuam modais.

Limite: gerencia superfícies internas da página. Prévias em outra aba continuam
em página separada e são gerenciadas pelo navegador; não simular seu estado
de abertura/minimização no dock. Não altera a experiência mobile aprovada.
