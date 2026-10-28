// Contatos são públicos. Nunca coloque credenciais neste arquivo.
import { caseStudies } from './case-studies.js';
export const site = {
  contacts: { whatsapp: '5577991639190', email: 'matheuses18@icloud.com' },
  socials: { github: 'https://github.com/matheusesdev', linkedin: 'https://www.linkedin.com/in/matheusessantos/' },
  radio: { tracks: [
    { title: 'Lo-fi', artist: 'PetroVenus', file: '/public/audio/petrovenus-lofi.mp3', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Lo-fi_by_PetroVenus.mp3' },
    { title: 'Perspective', artist: 'Sappheiros', file: '/public/audio/perspective.mp3', license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Sappheiros_-_Perspective_(Lofi_Hip_Hop).ogg' },
    { title: 'Lofi Hip Hop Upbeat', artist: 'raspberrymusic', file: '/public/audio/upbeat.mp3', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Raspberrymusic_-_Lofi_Hip_Hop_Upbeat.ogg' },
    { title: 'Study And Relax', artist: 'Kevin MacLeod', file: '/public/audio/study-and-relax.mp3', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Study_And_Relax_by_Kevin_MacLeod.ogg' },
    { title: 'Lofi', artist: 'Caden Currie', file: '/public/audio/lofi.mp3', license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Lofi_by_Caden_Currie.mp3' },
  ] },
  stacks: [
    { name: 'Vue.js', logo: 'vue', group: 'Interfaces', detail: 'Seleção de sessão e cálculo de preço na agenda Luz' },
    { name: 'Next.js', logo: 'nextjs', group: 'Interfaces', detail: 'Opção para aplicações com páginas e dados no servidor' },
    { name: 'Node.js', logo: 'nodejs', group: 'Sistemas & dados', detail: 'Serviços para receber e validar dados entre sistemas' },
    { name: 'Python', logo: 'python', group: 'Sistemas & dados', detail: 'Rotinas para transformar arquivos e conferir dados' },
    { name: 'Supabase', logo: 'supabase', group: 'Sistemas & dados', detail: 'Banco de dados e acesso de usuários, conforme o projeto' },
    { name: 'n8n', logo: 'n8n', group: 'Automações & IA', detail: 'Fluxos entre ferramentas, definidos pelas regras da operação' },
    { name: 'Claude Code', logo: 'claude', group: 'Automações & IA', detail: 'Apoio à implementação, com revisão do código' },
    { name: 'Codex', logo: 'codex', group: 'Automações & IA', detail: 'Apoio à implementação, com revisão do código' },
  ],
  projects: caseStudies,
};
