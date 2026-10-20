# Laboratório ? editor guiado no navegador

20/10/2026. Implementação da direção aprovada: convite antes da experiência; janela dedicada inspirada em Safari/VS Code com arquivos, trechos destacados, orientação e terminal; prévias elaboradas para web, automação e integrações. Consultoria permanece explicativa.

O visitante completa um campo de configuração destacado, com ajuda opcional, e usa executar/run/npm run dev ou o botão equivalente. Os arquivos index.html e styles.css exibem o documento real da prévia gerada; o JSON mostra a configuração da experiência. O editor é uma simulação guiada, não VS Code incorporado nem shell real. Código fonte de leitura; campo orientado editável. Sem backend, chamadas de IA ou conexão a CRM real. O fluxo e o CRM são demonstrações locais.

A prévia usa iframe sandbox sem permissão de scripts ou acesso à página hospedeira. Texto do visitante escapado. Nenhum eval, instalação ou execução arbitrária. Links internos da landing permitem explorar a seção inferior.

Verificação: npm run check (zero erros/avisos), npm run build e scripts/verify-workbench.cjs contra preview compilado. Cobertura: convite, três arquivos, validação de campo/comando, três resultados reais, retorno ao fonte, reset/ajuda, Escape/foco e contenção móvel. Evidências workbench-results.json, workbench-result-0/1/2.png e workbench-mobile.png. Sem teste em dispositivos físicos ou leitor de tela. Nenhum deploy.


Revisão seguinte: substituído campo de nome por trecho real editável HTML/JSON no centro do editor. Validador de gramática limitada (sem eval), efeitos reais no título/link, prioridade/ação de fluxo e mapeamento de origem/destino. Explicação "Sabe o que você fez?" por experiência. Navegação redundante oculta na home; marca, idioma e tema preservados. Teste atual: verify-code-lab.cjs, contra build, aprovou código editável, sintaxe inválida, resultados, explicação e mobile. verify-workbench.cjs registra o fluxo anterior.


Revisão de processos: automação e integração agora usam ProcessSimulation.svelte em vez de páginas estáticas. Simulação de conversa WhatsApp com chegada, prioridade, resposta ou encaminhamento conforme JSON; simulação de formulário -> mapeamento -> registro CRM. Etapas temporizadas, pausa/continuar, próxima etapa e replay. Com movimento reduzido, progresso manual. Fechar o editor desmonta e cancela timers. Nenhuma chamada WhatsApp/CRM real. Teste atual verify-process-simulation.cjs; verify-code-lab.cjs anterior esperava iframes em todas as experiências. Evidências process-results.json e screenshots automation-chat-simulation/integration-running-simulation/integration-simulation-mobile.
