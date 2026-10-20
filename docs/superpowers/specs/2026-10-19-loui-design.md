# loui — especificação de design

Status: direção aprovada pelo usuário em 19/10/2026; documento consolidado para revisão.

## Objetivo

Criar a primeira presença institucional da loui, empresa em início de atividade que oferece desenvolvimento web, automações e agentes de IA, integrações e consultoria em tecnologia, sem restrição a um setor de clientes. O site deve comunicar a oferta e demonstrar cuidado técnico e criativo por meio da própria experiência.

## Identidade e referências

- Escrever a marca sempre como `loui`.
- Referência escolhida: https://unseen.co/projects/ — entrada, tipografia, interação, movimento e continuidade. Criar composição, código e recursos próprios; não reproduzir sua temática ou seus materiais.
- 14islands foi rejeitada como referência.
- Direção: estúdio interativo, com tipografia viva e comportamentos inspirados em conexões e sistemas.
- Tema escuro atmosférico com efeitos contidos; tema claro com o mesmo nível de acabamento.
- Azul-gelo inicial; laranja e monocromático como alternativas substituíveis por tokens.
- Não usar roxo, estética de template genérico, depoimentos, clientes ou resultados inventados.

## Introdução

Exibir `loui`, a frase exata `Entre a ideia e o possível, existe código.` e um botão `Entrar`.

A marca se revela em uma sequência breve; o botão fica utilizável desde a primeira renderização, sem depender da animação ou de espera artificial. O seletor de tema aparece também nessa tela. Entrar transforma a composição na página principal e transfere o foco para seu título. Sem áudio.

Decisão técnica proposta: introdução como melhoria progressiva, não como bloqueio de carregamento; sem JavaScript, conteúdo e navegação permanecem disponíveis. Âncoras diretas devem levar ao conteúdo sem forçar a introdução. Mostrar a introdução a cada acesso inicial à raiz; não repeti-la ao trocar o tema ou navegar por âncoras.

## Página contínua

1. Apresentação: oferta clara e chamada `Vamos conversar`, ligada ao contato.
2. Serviços: desenvolvimento web; automações e agentes de IA; integrações; consultoria em tecnologia. Explicar aplicações sem prometer resultados medidos.
3. Como trabalhamos: entendimento do problema, definição da solução, desenvolvimento e acompanhamento da entrega. Apresentar como proposta de trabalho, sem alegar histórico inexistente.
4. Sobre: apresentação breve de uma empresa em início de atividade, sem linguagem de equipe numerosa ou experiência não comprovada.
5. Contato: previsão de WhatsApp, e-mail e formulário.

Navegação com âncoras para serviços, processo, sobre e contato. Cabeçalho compacto com marca e seletor de tema. Rodapé com marca e ano, sem links fictícios.

Projetos: coleção inicialmente vazia. Só renderizar seção e link de navegação quando houver um projeto preenchido. Cada projeto futuro contém título, resumo, categoria, imagem opcional e URL opcional; apenas renderizar links e imagens válidos. Documentar a edição desse conteúdo.

## Movimento e interação

Rolagem nativa, sem scroll hijacking, cursor obrigatório ou seções que prendam o visitante. Transições entre seções usando mudanças de composição, linhas e tipografia. Movimento de entrada curto, sem loops agressivos. Interações decorativas de ponteiro são opcionais e não carregam informação exclusiva.

Toque e teclado oferecem as mesmas ações. Respeitar `prefers-reduced-motion`: retirar deslocamentos amplos, parallax e sequências; manter conteúdo legível e ações imediatas. Sem flashes, áudio automático ou dependência de 3D.

## Temas

Primeira visita respeita a preferência do sistema, como proposto na conversa. O visitante pode escolher claro ou escuro; persistir a escolha quando armazenamento estiver disponível. Falha do armazenamento não impede alternância. Evitar flash de tema na carga.

Paleta técnica inicial proposta: escuro #0b1014, texto #edf4f7, azul-gelo #a8d8ed; claro #f5f6f4, texto #111a20, azul de destaque #245c73. Usar cores distintas por tema para legibilidade. Tokens permitem substituir toda a família de destaque por laranja ou neutros. Não oferecer três paletas públicas nesta versão.

## Contatos e formulário

Usuário ainda não definiu WhatsApp ou e-mail. Usar configuração nula, nunca dados fictícios acionáveis. Mostrar aviso `Canais de contato em preparação.` e desativar os canais indisponíveis com explicação visível.

Formulário previsto: nome, e-mail e mensagem. Enquanto não houver destino real, exibir uma prévia desativada, com aviso de indisponibilidade e sem coletar, armazenar ou enviar dados. Não simular sucesso. Integração de envio e política de tratamento de dados serão definidas quando existir um destino real; não fazem parte desta implementação.

## Arquitetura proposta

Base estática em HTML, CSS e JavaScript modular, sem framework ou backend, adequada ao conteúdo desta primeira versão. Conteúdo e contatos em um módulo próprio; tokens separados do layout; controlador de tema independente das animações. Fontes com licença adequada, preferencialmente locais, e fallback seguro. Não instalar dependências ou adicionar serviços externos para funções que o navegador já atende.

## Critérios de aceite

- Introdução contém marca, frase exata, Entrar e troca de tema; teclado e foco funcionam.
- Conteúdo acessível sem JavaScript e sem recursos de movimento.
- Temas coerentes; textos normais com contraste mínimo 4,5:1 e controles identificáveis.
- Validar 360, 390, 768, 1024 e 1440 px, além de celular em paisagem e zoom de 200%; sem sobreposição ou rolagem horizontal não intencional.
- Botões têm alvo de toque confortável; foco visível; formulário com rótulos explícitos.
- Projetos vazios não produzem seção, link morto ou prova social inventada.
- Contatos não configurados não abrem destinos fictícios nem enviam dados.
- Sem erros de console ou recursos locais quebrados; nenhum anúncio de envio falso.
- Sem commit, push ou deploy nesta etapa; publicação depende de autorização explícita.

## Limites e revisão

O usuário aprovou a direção visual e o escopo. A stack estática, os valores de cores, a apresentação do contato indisponível e os detalhes de foco/entrada são decisões propostas neste documento, sujeitas à revisão. Resultado desta etapa: especificação e plano, sem implementação.
