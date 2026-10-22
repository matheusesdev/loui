# Segurança e conexões da loui

Site estático Svelte/Vite com demonstração Vue. Não há backend, autenticação,
recebimento de formulário ou credenciais de API na aplicação. Isso descreve a
arquitetura atual, não uma certificação ou garantia de ausência de vulnerabilidades.

## Mapa de conexões

| Destino | Quando ocorre | Dados e limites |
| --- | --- | --- |
| Própria origem | Ao abrir o site e usar recursos | HTML, JS, CSS, fonte, logos e áudio locais. Hospedagem pode manter logs de acesso conforme suas políticas. |
| de1.api.radio-browser.info e de2.api.radio-browser.info | Apenas ao escolher rádio online e buscar | Gênero limitado a 40 caracteres, filtros de catálogo e dados usuais de rede. Segundo servidor é alternativa em falha. Cache só em memória. |
| Emissora HTTPS selecionada | Ao escolher e tocar uma estação | Requisição de áudio e dados de rede ao operador independente. Endereços variam; disponibilidade e privacidade dependem do operador. |
| wa.me / WhatsApp | Ao continuar no contato válido ou abrir o canal direto | Nome, assunto e ideia entram na URL da conversa preparada. O visitante revisa e envia no WhatsApp. Podem constar no histórico do navegador e serviço externo. |
| GitHub, LinkedIn, site da emissora, fontes e licenças | Ao abrir seus links | Navegação externa explícita, sem carregar widgets no site. |
| Cliente de e-mail | Ao ativar mailto | Abre o aplicativo escolhido pelo visitante. Sem envio automático. |

Não há analytics ou gravação de sessão adicionados. Tema, idioma e preferência
de som usam armazenamento local; nome e ideia ficam no estado da página, sem
persistência própria. As prévias levam código de exemplo no fragmento da URL,
que não faz parte da requisição HTTP, mas pode permanecer no histórico. Não use
informações pessoais reais nas demonstrações.

## Política de recursos

`vercel.json` aplica CSP e headers às duas páginas e aos demais caminhos.
Scripts são locais, sem `unsafe-inline` ou `unsafe-eval`. O tema inicial roda de
arquivo próprio antes dos estilos. Estilos inline são necessários para dimensões,
arraste e atualizações dos componentes; essa permissão não se estende a scripts.
Áudio permite hosts HTTPS variáveis, pois faz parte do catálogo independente.
Fetch fica limitado à própria origem e aos dois servidores do catálogo.

Objetos, frames, incorporação por outros sites, base externa e envio nativo de
formulário são bloqueados. Câmera, microfone, geolocalização e pagamento não são
autorizados. Referrer é omitido; novas abas externas usam noopener/noreferrer.
HTTPS e HSTS são administrados pela Vercel no ambiente publicado.

O laboratório valida sintaxe e limites em `compileLabCode`; não executa JavaScript
arbitrário digitado. As prévias revalidam o fragmento antes de renderizar. Strings
de exemplo são texto, não HTML inserido pelo usuário.

Para novos provedores ou funcionalidades, atualize este mapa e os testes antes de
ampliar a CSP. O servidor de desenvolvimento Vite não representa os headers de
produção. `scripts/verify-security.cjs` aplica os headers reais ao build local.
