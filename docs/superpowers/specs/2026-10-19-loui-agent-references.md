# loui — referências de agentes e contrato de acabamento

Perfis enviados pelo usuário, consultados em 19/10/2026 no repositório https://github.com/msitarzewski/agency-agents. O link de Senior Developer foi enviado duas vezes e representa uma única referência. Estes arquivos descrevem papéis e critérios; não são plugins instalados nem agentes executados automaticamente.

## Aplicação ao escopo atual

| Perfil | Uso na loui |
| --- | --- |
| [Frontend Developer](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-frontend-developer.md) | Implementação responsiva, HTML semântico, teclado, degradação funcional e desempenho das animações. Exemplos React não obrigam adoção do framework. |
| [Senior Developer](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-senior-developer.md) | Revisão da implementação, limites entre módulos e manutenção. Escolhas técnicas subordinadas ao site estático planejado. |
| [UI Designer](https://github.com/msitarzewski/agency-agents/blob/main/design/design-ui-designer.md) | Tokens, hierarquia tipográfica, estados de interação e coerência entre temas. A cor do metadado do perfil não é uma cor de marca. |
| [UX Architect](https://github.com/msitarzewski/agency-agents/blob/main/design/design-ux-architect.md) | Estrutura da página, comportamento de temas, navegação e progressão entre serviços e contato. |
| [UX Researcher](https://github.com/msitarzewski/agency-agents/blob/main/design/design-ux-researcher.md) | Formular hipóteses de usabilidade e roteiros de verificação. Inspeção interna não equivale a pesquisa com clientes; não inventar entrevistas, dados ou personas validadas. |
| [UI Finish-Gate Reviewer](https://github.com/msitarzewski/agency-agents/blob/main/design/design-ui-finish-gate-reviewer.md) | Revisar telas implementadas e estados reais; emitir PASS ou HOLD, com problemas observáveis e condições de correção. |
| [Backend Architect](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-backend-architect.md) | Reservado à integração futura do formulário ou outro recurso com servidor; não adicionar infraestrutura à primeira versão por causa do perfil. |
| [AI Engineer](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-ai-engineer.md) | Reservado a uma funcionalidade real de IA futura. Oferecer serviços de IA não exige incorporar um modelo ao site. |
| [Prompt Engineer](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-prompt-engineer.md) | Aplicável se houver prompts de uma funcionalidade futura; sem chatbot ou API de IA nesta entrega. |

## Contrato de design

**Visitante e objetivo:** potencial cliente de qualquer setor que precisa compreender a oferta da loui e avaliar sua adequação a um problema de desenvolvimento, integração ou automação.

**Primeira leitura:** na introdução, loui e a frase aprovada; na página principal, a oferta concreta de desenvolvimento e automação.

**Ação principal:** Entrar na introdução; explorar os serviços e chegar ao contato na página. Enquanto canais estiverem indisponíveis, comunicar o estado sem simular contratação ou envio.

**Densidade:** abertura espaçosa e expressiva; explicações dos serviços concisas e legíveis, sem grandes vazios que obriguem rolagem excessiva no celular.

**Hierarquia:** marca, mensagem, ação; depois títulos dos serviços, aplicações e processo. Tipografia expressiva não substitui explicação comercial.

**Interação:** rolagem contínua nativa, revelação tipográfica, conexões e transições contidas; sem dependência de cursor ou áudio.

**Prioridades responsivas:** manter texto, navegação, Entrar e seletor de tema utilizáveis. Simplificar decoração e movimento antes de reduzir legibilidade ou esconder conteúdo.

**Referência transferível:** Unseen inspira a continuidade entre entrada, letras e interação. Sua temática, recursos e composição não serão copiados. O usuário rejeitou 14islands; não recolocá-la como direção visual.

**Padrões proibidos:** roxo; gradientes ou vidro decorativos sem função; grade indiferenciada de cartões como solução automática para tudo; métricas, clientes e depoimentos fictícios; falsa conversa de IA; projetos inventados; formulário com falso sucesso.

## Revisão final

Registrar evidências em desktop e celular, nos dois temas, incluindo introdução, seção de serviços, contato indisponível, foco por teclado e movimento reduzido.

Emitir **HOLD** se a oferta não for compreensível, se a interação bloquear conteúdo, se houver identidade genérica sem relação com a loui ou falha crítica de acessibilidade/responsividade. Cada achado deve indicar tela/estado, impacto, correção e como verificar.

Emitir **PASS** somente após verificar os critérios da especificação no navegador e resolver achados críticos. Registrar limitações de verificação; não alegar validação por tecnologia assistiva ou dispositivo físico sem executá-la.

Não criar agentes separados, instalar ferramentas, incluir backend, contratar serviços ou publicar por consequência destes perfis. A direção aprovada e as autorizações explícitas do usuário governam o trabalho.
