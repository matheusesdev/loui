# Validação para publicação

Destino confirmado: matheusesdev/loui, main, projeto Vercel loui (prj_aNHdVEgRrTk6BvVJuiwn8UgYg5u2), equipe matheusesdevs-projects. Sem variáveis de ambiente de produção neste site estático.

npm run validate aprovado: Svelte check, build e descoberta. Testes finais do header e do hero aprovados. Teste do artefato compilado com os headers reais aprovado: 6 combinações de contato, 18 prévias, temas, layouts, fallback de catálogo, reprodução local/fixture, bloqueio de script inline e conexão não autorizada.

A validação do artefato encontrou diferença na ordem de CSS entre desenvolvimento e produção. As folhas de hero e header agora são declaradas no HTML depois das bases existentes, sem importações duplicadas de estilos em módulos compartilhados. As regras dos controles foram delimitadas pelo header; o header desktop também se compacta quando a janela é reduzida. O teste de segurança passou após a correção.

As alterações preexistentes em verify-release-smoke.cjs, verify-browser-experiences.cjs, docs/validation/browser-compatibility, skills-lock.json e .agents/skills/antiwebslop não pertencem ao commit desta publicação.
