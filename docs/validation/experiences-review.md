# Revisão das experiências

20/10/2026 — branch `feat/laboratorio-previa-pagina-dedicada`.

Skills aplicadas: frontend-design (direção específica), UI/UX Pro Max (consulta de
seleção de datas, foco e ciclo de vida Svelte), web-design-guidelines (revisão).
Direção registrada antes de implementar em `docs/design/EXPERIENCES.md`.

## Achados corrigidos

- `src/components/LabPreview.svelte:29` — modal recebeu nome e descrição acessíveis;
  fechamento por botão e Escape; foco segue para o primeiro controle do resultado.
- `src/components/LabPreview.svelte:14` — idioma inválido no fragmento agora usa PT
  para que a página de erro continue funcionando.
- `src/vue-demo.js:18` — ausência de horário gera orientação junto ao formulário e
  move foco para a seleção; a confirmação não é um botão permanentemente desativado.
- `src/vue-demo.js:37` — nome tem label, limite, atributo name e indicação de exemplo.
- `src/components/LabWorkbench.svelte:14` — código de leitura agora corresponde à
  implementação real usada pelo resultado, inclusive para automação e integração.
- `src/components/ProcessSimulation.svelte:11` — dados traduzidos derivados do idioma.
- `src/styles/preview.css` — modos claro/escuro, foco e contenção de rolagem no modal.
- `src/styles/simulations.css` — controles sem dependência de hover, seleção de etapas,
  layout em colunas no desktop e sequência de leitura no celular; reduced motion.

## Evidências

- `npm run check`: sem erros ou avisos.
- `npm run build`: concluído.
- `scripts/verify-experiences.cjs`: reserva e confirmação, alterações de valores,
  atendimento e encaminhamento, mapeamento alternativo e reenvio, três idiomas,
  dois temas, cinco dimensões de prévia e dimensões do editor.
- `scripts/verify-experience-timing.cjs`: execução automática, pausa e retomada.
- `scripts/verify-external-preview.cjs`: nova aba sem opener, preservação do editor,
  recarga e tratamento de payload inválido.
- Capturas `experience-0/1/2-desktop.png`, `experience-0/1/2-mobile.png` e
  `experience-0/1/2-dark.png`, geradas; amostras inspecionadas para composição e legibilidade.

As prévias podem rolar para revelar todo o produto; o laboratório mantém missão,
trecho editável e terminal juntos. Arquivos completos de leitura e a área de código
podem ter rolagem interna. Não cortar o código completo para disfarçar falta de espaço.

Validação em Edge/Chromium automatizado. Não representa certificação WCAG nem teste
em todos os aparelhos físicos ou motores de navegador. Reservas, WhatsApp, loja e CRM
são demonstrações no navegador, sem envio externo, pagamento ou persistência remota.
O reenvio ilustra atualização de um registro identificado pelo pedido, sem backend real.
