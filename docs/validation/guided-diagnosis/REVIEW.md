# Diagnóstico guiado — revisão local

Branch `evolution/05-guided-diagnosis`, sobre o merge local `cc52712` da etapa 4c.
Desenho aprovado pelo usuário; implementação sem nova dependência ou backend.

## Implementado

Comando e sugestão diagnostico/diagnosis no terminal, três perguntas, quatro
recomendações determinísticas e demonstração correspondente. Respostas opcionais
até 600 caracteres; briefing editável até 2.000. Idioma não reescreve texto livre.
Atualizar com respostas é uma ação explícita; volta o foco ao briefing.

Contato recebe o briefing por uma exportação pequena do componente existente.
Mensagem já preenchida fica intacta até a escolha acrescentar/manter. Nome sempre
preservado, prevenção de duplicação e limite combinados em módulo puro.
Clipboard negado seleciona o texto para cópia manual. Recomeçar pede confirmação.
Nada é enviado automaticamente; dados ficam em memória e desaparecem ao recarregar.

## Verificado

- `npm run validate`: Svelte sem erros/avisos, build e artefatos de descoberta.
- `verify-diagnosis-rules.cjs`: formatação, respostas opcionais, preservação,
  duplicação, fronteiras 2.000/2.001 e HTML tratado como texto literal.
- `verify-guided-diagnosis.cjs`: 24 combinações em 1440×900, 768×1024, 320×568 e
  844×390, nos três idiomas e dois temas. Quatro demonstrações, três editores,
  clique/teclado, foco, minimizar/retomar, confirmar/cancelar reinício, clipboard,
  acrescentar/manter, não duplicar e excesso de caracteres. Nenhuma requisição externa.
- `verify-guided-diagnosis-edge.cjs`: 320×480 sem overflow da abertura, limite de
  600, voltar preserva respostas, mudança de idioma mantém texto manual,
  atualização explícita retorna foco, fechar/reabrir preserva briefing.
- `verify-lazy-workbench.cjs`: editores sob demanda, um chunk compartilhado,
  código preservado, três prévias, erro/retry e sair durante carregamento.
- `verify-security.cjs`: headers/CSP, seis combinações de contato, 18 prévias,
  reprodução local/fixture, bloqueio de script inline e fetch externo não permitido.

Capturas reais revisadas: resultado/abertura no celular e desktop, contato no
celular. Resultado longo usa rolagem interna da janela; ações foram alcançadas
por teclado e clique, sem overflow horizontal. Fonte, cores e controles seguem
o workspace e formulário existentes. Sem cartões de métricas ou nova navegação.

Revisão Web Interface Guidelines: rótulos e radios nativos, foco visível nos
controles, status anunciado, limite indicado, confirmação antes de apagar,
layout fluido e tema/reduced motion preservados. Headings de etapa recebem foco
programático para anunciar a pergunta; não são controles interativos.

## Limites

Recomendação é uma associação explícita à escolha do usuário, não avaliação por
IA, viabilidade, orçamento ou prazo. WhatsApp não foi enviado; testes verificam
a preparação da mensagem. Testes locais Chrome; sem alegar auditoria completa
em Safari ou outros sistemas. Build mantém aviso preexistente sobre theme-init.js.
Etapa 5 sem commit ou publicação. Etapa 4c continua integrada somente na main local.
