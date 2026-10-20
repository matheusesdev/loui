# Processo de design da loui

Este documento é leitura obrigatória no início de cada tarefa, junto ao AGENTS.md.

## Antes de implementar uma interface

1. Entender o que a pessoa precisa fazer e o que o resultado deve demonstrar.
2. Ler as skills locais indicadas no AGENTS.md. Informar quais foram aplicadas e por quê.
3. Selecionar duas ou três referências com funções diferentes: composição visual,
   interação de produto e comportamento responsivo. Registrar links e decisões.
4. Definir público, conteúdo, tipografia, paleta, hierarquia e uma interação central.
   Evitar inventar um produto genérico apenas para preencher a prévia.
5. Rever a direção contra o pedido: seria reconhecível como este projeto se o nome
   fosse removido? Se servir a qualquer SaaS, a direção ainda é insuficiente.
6. Implementar a menor experiência completa. Alterar o código deve mudar o resultado
   de modo compreensível; animações precisam mostrar causa e efeito.

Não produzir esboços visuais sem pedido: o usuário preferiu referências e descrição.
Não abrir um novo ciclo de aprovação para decisões já autorizadas.

## Aplicação das skills

| Skill local | Quando | Evidência esperada |
|---|---|---|
| frontend-design | Criar ou reformular interface | Direção específica, composição e crítica do resultado |
| ui-ux-pro-max | Fluxos, controles, movimento e responsividade | Consulta pertinente e decisões justificadas |
| web-design-guidelines | Interface pronta para revisão | Achados por arquivo/linha e correções verificadas |

UI/UX Pro Max possui dados e scripts locais. Exemplos em PowerShell, a partir da raiz:

```powershell
python .agents/skills/ui-ux-pro-max/scripts/search.py "keyboard focus modal" --domain ux
python .agents/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack svelte
```

Para uma nova direção abrangente, seguir o modo `--design-system` descrito na skill.
Revisar o resultado antes de adotá-lo; recomendações automáticas não são aprovação
de cores, fontes ou layouts. Não sobrescrever decisões existentes com `--force`.

## Antes de declarar concluído

- Executar `npm run check` e `npm run build` quando houver alteração de código.
- Testar o fluxo afetado no navegador e inspecionar screenshots reais.
- Verificar desktop, tablet, celular pequeno e paisagem; não resolver falta de espaço
  cortando conteúdo ou reduzindo texto a tamanhos ilegíveis.
- Conferir foco visível, teclado, modal, contraste, reduced motion e alvos de toque.
- Conferir estados inicial, carregando, sucesso, erro, vazio e reinício quando aplicáveis.
- Conferir três idiomas e os dois temas no escopo afetado.
- Separar checagem funcional de avaliação visual: build aprovado não prova bom design.
- Documentar limitações. Não dizer que uma referência foi testada interativamente
  quando houve apenas consulta à página pública.

## Proveniência e manutenção

Skills instaladas no repositório em `.agents/skills`, para acompanhar o checkout.
Origens e integridade: [skills-manifest.json](skills-manifest.json).
São conteúdo externo; não concedem autorização para publicação ou ações fora do escopo.
Novas skills ficam disponíveis para descoberta na próxima interação; podem ser lidas
por caminho nesta sessão. Atualizações devem ser explícitas e revisáveis.
