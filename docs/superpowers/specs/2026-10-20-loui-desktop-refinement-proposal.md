# loui — proposta de evolução do ambiente

Status: implementada localmente em 20/10/2026. Ver docs/validation/desktop-review.md para resultado atual. O texto abaixo registra a proposta original; a rádio final usa faixas locais licenciadas após bloqueio de incorporação do YouTube.

## Direção

Ambiente inspirado na linguagem do macOS, com identidade loui: janelas de cantos suaves, barras de título com controles familiares e funcionais, hierarquia mais forte, ícones e profundidade moderada. Fundo com variação discreta de tons azulados e neutros aquecidos; sem roxo. Dock com acessos visuais e rótulos acessíveis. O terminal permanece como acessório opcional.

Não usar marca Apple, dados de sistema fictícios, notificações inventadas ou indicadores falsos de disponibilidade. Preservar PT/EN/ES, claro/escuro, teclado, toque e movimento reduzido.

## Áreas

- Serviços e Laboratório: preservar conteúdo e demonstrações existentes, ajustando composição e peso dos controles.
- Stacks: superfície com nomes e logos das tecnologias confirmadas pelo usuário, agrupadas por finalidade. Sem indicadores de domínio, anos de experiência ou ferramentas presumidas.
- Contato: WhatsApp direto e e-mail visível com copiar/abrir. Dependem dos dados reais ainda solicitados; canais não configurados continuam sinalizados e sem destinos inventados.
- Redes: acessos para LinkedIn e GitHub com URLs confirmadas, abrindo em nova aba. Outras redes podem ser configuradas posteriormente.
- Projetos: superfície sempre acessível, com estado vazio deliberado e honesto. Estrutura preparada para adicionar projetos; sem exemplos que pareçam trabalhos reais.
- Rádio: player com play/pausa, volume e identificação da fonte. Estado preservado ao navegar. A fonte/playlist foi solicitada ao usuário; integração deve respeitar o modo de reprodução permitido pela fonte. Sem promessa de continuidade se o serviço externo estiver indisponível; mostrar erro recuperável.

## Entrada

Primeiro preparar recursos essenciais do ambiente e apresentar uma breve sequência da marca; depois liberar Entrar. Não criar porcentagem fictícia, depender de resposta da rádio para entrar ou manter bloqueio indefinido. Se recurso opcional falhar, o ambiente continua acessível. Sem JavaScript, preservar a página institucional.

## Execução proposta

1. Confirmar dados de contatos, redes, stacks e fonte musical.
2. Consolidar a direção visual e revisar com os perfis UI Designer e UI Finish-Gate Reviewer.
3. Separar configuração, player e novas superfícies do controlador de janelas para evitar concentrar novas responsabilidades em workspace.js.
4. Implementar nova apresentação do shell e novas superfícies.
5. Validar carregamento, falhas de fonte musical, player, links, cópia de e-mail, estado vazio de projetos, idiomas, teclado, toque e reflow.
6. Revisar capturas desktop/mobile e estados de interação, distinguindo resultado funcional de avaliação estética.

## Dados confirmados pelo usuário

- WhatsApp: (77) 99163-9190. Link normalizado: https://wa.me/5577991639190.
- E-mail: matheuses18@icloud.com.
- GitHub: https://github.com/matheusesdev.
- LinkedIn: pendente; não criar destino fictício.
- Stacks: Supabase, Claude Code, Codex, Python, n8n, Node.js, Vue.js e Next.js. Claude Code e Codex devem aparecer como ferramentas de IA, sem alegações de parceria ou certificação.
- Rádio: usuário pediu uma sugestão. Proposta: transmissão oficial Lofi Girl em player oficial do YouTube, com identificação e controles preservados. Confirmar disponibilidade de incorporação antes de implementar e não tratar uma transmissão externa como recurso necessário à entrada.

O usuário solicitou explicitamente concluir as stacks e os demais pontos após a migração para Svelte. Implementação e verificação registradas na revisão atual.
