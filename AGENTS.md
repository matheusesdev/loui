# loui — instruções para agentes

## Leitura antes de agir

Antes de iniciar cada tarefa neste repositório, leia este arquivo e
[docs/design/WORKFLOW.md](docs/design/WORKFLOW.md). Consulte o estado do Git e
preserve alterações existentes. Não repita a leitura a cada comando da mesma tarefa,
mas releia quando o escopo mudar ou o contexto for perdido.

Para qualquer alteração de interface, leia integralmente as skills locais relevantes:

1. Direção visual e implementação: [.agents/skills/frontend-design/SKILL.md](.agents/skills/frontend-design/SKILL.md).
2. UX, interação, responsividade e orientação Svelte/Vue: [.agents/skills/ui-ux-pro-max/SKILL.md](.agents/skills/ui-ux-pro-max/SKILL.md).
3. Revisão da interface pronta: [.agents/skills/web-design-guidelines/SKILL.md](.agents/skills/web-design-guidelines/SKILL.md).

Use o menor conjunto pertinente à tarefa. Em tarefas sem interface, não force skills
de design. Leia referências adicionais sob demanda, conforme cada skill.
As cópias locais são a referência deste projeto; não substitua silenciosamente por
uma skill global homônima. Instruções explícitas do usuário têm precedência.

## Contrato do produto

- Marca: `loui`, sempre minúscula. Estúdio de desenvolvimento, automação e integrações.
- Svelte no site; Vue na experiência web. Não migrar framework por estética.
- Terminal inspirado no macOS é a navegação central; menus enxutos, rádio discreta.
- Tema claro inicial; modo escuro e português, inglês e espanhol preservados.
- Manter a frase: “Entre a ideia e o possível, existe código.”
- Não adicionar footer institucional ou navegação redundante.
- Experiências são demonstrações locais, identificadas como tal. Não inventar clientes,
  resultados, depoimentos, certificações ou integrações externas ativas.
- Prévia em página separada; explicação em modal acessível; código do editor preservado.
- Não usar roxo, templates genéricos ou a mesma composição para todas as experiências.

## Critério de entrega

Leia [docs/design/REFERENCES.md](docs/design/REFERENCES.md) antes de reformular as
experiências. Registre objetivo, referência, decisão e interação observável antes de
codificar. Skills e referências não substituem julgamento nem validação visual.
Verifique screenshots, teclado, toque, temas, idiomas e tamanhos relevantes.
Reporte o que foi implementado, o que foi testado e o que permanece pendente.
Não faça commit, push, merge ou deploy sem autorização correspondente.
