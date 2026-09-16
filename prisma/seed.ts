import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with mock data...");

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.tailoredResume.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.personalInfo.deleteMany();

  // ─── Personal Info ───────────────────────────────────────────────────────────
  await prisma.personalInfo.create({
    data: {
      fullName: "Vinícius Casarin",
      email: "vinicius.casarin@gmail.com",
      phone: "+55 (11) 98765-4321",
      location: "São Paulo, SP – Brasil",
      summary:
        "Engenheiro de Software com 6+ anos de experiência em desenvolvimento full-stack, especializado em React, TypeScript e Node.js. Apaixonado por criar interfaces intuitivas e sistemas escaláveis. Experiência com metodologias ágeis e liderança técnica de equipes de 4–8 pessoas. Forte background em otimização de performance, acessibilidade web e arquitetura de micro-frontends.",
    },
  });

  // ─── Experiences ─────────────────────────────────────────────────────────────
  await prisma.experience.createMany({
    data: [
      {
        company: "Orion Fintech",
        position: "Senior Software Engineer",
        startDate: "2023-03",
        endDate: null,
        current: true,
        description:
          "Liderança técnica da squad de Experiência do Cliente em uma fintech de crédito pessoal. Responsável pelo fluxo de onboarding de novos usuários — reduzimos o tempo de conclusão em 35% após refatoração do fluxo com React e animações de transição. Implementei design system compartilhado adotado por 5 times diferentes. Realizei code reviews diários e mentoria de 3 devs plenos. Tecnologias: React Native, TypeScript, GraphQL, Kotlin.",
      },
      {
        company: "Nexum Systems",
        position: "Software Engineer",
        startDate: "2021-06",
        endDate: "2023-02",
        current: false,
        description:
          "Desenvolvimento de plataforma SaaS para gestão de RH e folha de pagamento utilizada por mais de 1.200 empresas. Migrei módulos legados de Angular.js para React com TypeScript, reduzindo bugs reportados em 60% nos primeiros 3 meses. Participei ativamente do processo de CI/CD com GitHub Actions. Colaborei com time de produto e design para lançamento de 12 novas features em 18 meses. Tecnologias: React, TypeScript, Node.js, PostgreSQL, Docker.",
      },
      {
        company: "Vortex Digital",
        position: "Desenvolvedor Full-Stack",
        startDate: "2020-01",
        endDate: "2021-05",
        current: false,
        description:
          "Consultoria de tecnologia atendendo clientes enterprise dos setores bancário e de seguros. Construí APIs RESTful e integrei com sistemas legados SOAP de clientes. Implementei dashboards analíticos com visualizações de dados em tempo real processando mais de 100k eventos/dia. Trabalhei em equipe distribuída com membros em 3 países. Tecnologias: Vue.js, Node.js, Express, MySQL, Azure.",
      },
      {
        company: "Códex Labs",
        position: "Desenvolvedor Front-end",
        startDate: "2018-06",
        endDate: "2019-12",
        current: false,
        description:
          "Startup de e-commerce B2B focada em moda e lifestyle. Desenvolvimento do painel administrativo e da vitrine do cliente usando React e CSS Modules. Integrei gateways de pagamento e sistemas de frete. Participei do crescimento do time de 3 para 12 pessoas ao longo de 18 meses. Tecnologias: React, Redux, Node.js, MongoDB.",
      },
    ],
  });

  // ─── Education ───────────────────────────────────────────────────────────────
  await prisma.education.createMany({
    data: [
      {
        institution: "Universidade Federal de São Paulo",
        degree: "Bacharelado",
        fieldOfStudy: "Ciência da Computação",
        startDate: "2014",
        endDate: "2018",
      },
      {
        institution: "Instituto Ágil de Tecnologia",
        degree: "Especialização",
        fieldOfStudy: "Engenharia de Software e Arquitetura de Sistemas",
        startDate: "2020",
        endDate: "2021",
      },
      {
        institution: "Plataforma Devrise",
        degree: "Bootcamp",
        fieldOfStudy: "React, TypeScript e Node.js",
        startDate: "2019",
        endDate: "2019",
      },
    ],
  });

  // ─── Skills ──────────────────────────────────────────────────────────────────
  await prisma.skill.createMany({
    data: [
      {
        name: "React / React Native",
        description:
          "6 anos de experiência. Desenvolvimento de SPAs, apps mobile e design systems. Proficiente em hooks, context API, Redux Toolkit, Zustand e React Query. Experiência com testes unitários e de integração com Testing Library.",
      },
      {
        name: "TypeScript",
        description:
          "Utilizo TypeScript em todos os projetos profissionais há 5 anos. Criação de tipos complexos, generics, utility types e integração com frameworks populares. Configuração avançada de tsconfig.",
      },
      {
        name: "Node.js",
        description:
          "Desenvolvimento de APIs RESTful e GraphQL com Express, Fastify e NestJS. Experiência com autenticação JWT/OAuth, middlewares, filas com BullMQ e integração com bancos de dados relacionais e não-relacionais.",
      },
      {
        name: "PostgreSQL / SQL",
        description:
          "Modelagem de dados, queries complexas, CTEs, índices e otimização de performance. Experiência com migrations, views materializadas e ORMs como Prisma e TypeORM.",
      },
      {
        name: "Docker & CI/CD",
        description:
          "Containerização de aplicações com Docker e Docker Compose para ambientes locais e produção. Pipelines de CI/CD com GitHub Actions e GitLab CI. Experiência básica com Kubernetes.",
      },
      {
        name: "Next.js",
        description:
          "Desenvolvimento de aplicações full-stack com SSR, SSG e ISR. Experiência com App Router, Server Components, Server Actions e otimização de Web Vitals.",
      },
      {
        name: "Testes Automatizados",
        description:
          "Escrita de testes unitários com Jest, testes de integração com Supertest e testes end-to-end com Playwright e Cypress. TDD aplicado no dia a dia em projetos críticos.",
      },
      {
        name: "Design Systems & Acessibilidade",
        description:
          "Criação e manutenção de design systems com Storybook. Implementação de componentes acessíveis seguindo WCAG 2.1 AA. Auditorias com Lighthouse e axe-core.",
      },
    ],
  });

  // ─── Job Applications ────────────────────────────────────────────────────────

  // 1. HIRED
  const app1 = await prisma.jobApplication.create({
    data: {
      title: "Senior Frontend Engineer",
      company: "Lumora Commerce",
      link: "https://lumora.io/careers",
      status: "HIRED",
      description: `## Sobre a vaga
Somos uma plataforma de e-commerce para marcas DTC (direct-to-consumer) com operação em 12 países. Buscamos um Senior Frontend Engineer para compor nosso time de Checkout, responsável por uma das partes mais críticas e de maior impacto no negócio.

## Responsabilidades
- Construir e manter componentes React de alta performance para o fluxo de checkout
- Colaborar com designers e PMs para entregar novas funcionalidades
- Liderar iniciativas de performance e acessibilidade
- Mentorear engenheiros juniores e participar de code reviews

## Requisitos
- 5+ anos de experiência com React e JavaScript moderno
- Proficiência em TypeScript
- Sólido entendimento de performance web e Core Web Vitals
- Experiência com testes automatizados (Jest, Testing Library)`,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        jobApplicationId: app1.id,
        content: "Apliquei pelo site deles. Resposta em 2 dias úteis — processo com 4 etapas.",
      },
      {
        jobApplicationId: app1.id,
        content: "Take-home test: construir um mini checkout funcional em React com validação e resumo do pedido. Levou ~5h. Feedback positivo sobre a organização do código.",
      },
      {
        jobApplicationId: app1.id,
        content: "Entrevista técnica com 2 engenheiros seniores. Foco em performance (Lighthouse, lazy loading, bundle splitting) e acessibilidade (WCAG, ARIA).",
      },
      {
        jobApplicationId: app1.id,
        content: "Entrevista cultural com o Head de Engenharia. Conversa muito boa sobre cultura de feedback e ownership.",
      },
      {
        jobApplicationId: app1.id,
        content: "✅ OFERTA RECEBIDA! Salário + bônus trimestral + stock options. Aceitei. Início em 15/04.",
      },
    ],
  });

  // 2. INTERVIEWING
  const app2 = await prisma.jobApplication.create({
    data: {
      title: "Staff Software Engineer",
      company: "Veltrix Cloud",
      link: "https://veltrix.io/jobs",
      status: "INTERVIEWING",
      description: `## O papel
A Veltrix é uma empresa de infraestrutura cloud voltada para times de engenharia. Como Staff Engineer você vai liderar decisões arquiteturais que impactam centenas de empresas clientes.

## O que você vai fazer
- Conduzir estratégia técnica entre múltiplos times
- Projetar sistemas distribuídos escaláveis para nossa infraestrutura global
- Parceiro estratégico do VP de Engenharia no roadmap
- Participar do processo de hiring e cultura técnica

## Qualificações
- 8+ anos de experiência em engenharia de software
- Histórico comprovado de liderança em projetos técnicos complexos
- Experiência com sistemas distribuídos em escala
- Inglês fluente`,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        jobApplicationId: app2.id,
        content: "Indicado por um ex-colega da Nexum que trabalha lá há 1 ano. Processo iniciado sem passar pelo screening inicial.",
      },
      {
        jobApplicationId: app2.id,
        content: "Phone screen de 30min com o Recruiter. Perguntas sobre motivação e expectativa salarial. Passou para etapa técnica.",
      },
      {
        jobApplicationId: app2.id,
        content: "1ª entrevista técnica: system design de um sistema de filas distribuídas com garantia de entrega. Durou 90min. Correu bem — explorei trade-offs de Kafka vs SQS.",
      },
      {
        jobApplicationId: app2.id,
        content: "Aguardando agendamento da 2ª entrevista técnica com o CTO.",
      },
    ],
  });

  // 3. INTERVIEWING
  const app3 = await prisma.jobApplication.create({
    data: {
      title: "Tech Lead Front-end",
      company: "Kredify",
      link: "https://kredify.com.br/carreiras",
      status: "INTERVIEWING",
      description: `## A vaga
A Kredify está buscando um Tech Lead para liderar o time de Originação de Crédito. Você vai guiar tecnicamente uma equipe de 6 engenheiros e colaborar diretamente com o Head de Engenharia.

## Responsabilidades
- Liderança técnica do time de front-end
- Definição de arquitetura e padrões de código
- Desenvolvimento de features de alto impacto no produto
- Mentoria de desenvolvedores juniores e plenos
- Participação no processo seletivo do time

## Requisitos
- Sólida experiência com React e TypeScript (5+ anos)
- Experiência prévia em liderança técnica ou como tech lead
- Boa comunicação e habilidade para influenciar sem autoridade formal
- Conhecimento de micro-frontends é um diferencial`,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        jobApplicationId: app3.id,
        content: "Processo com 3 etapas: técnica, cultural e com o Head de Engenharia. RH foi super transparente sobre cada etapa.",
      },
      {
        jobApplicationId: app3.id,
        content: "Entrevista técnica (2h): code review de um PR com problemas de performance, acessibilidade e acoplamento excessivo. Depois pair programming para refatorar o componente ao vivo. Correu muito bem!",
      },
      {
        jobApplicationId: app3.id,
        content: "Entrevista cultural com PM e designer do time. Gostei muito da dinâmica da equipe. Próximo passo: conversa com o Head.",
      },
    ],
  });

  // 4. APPLIED
  await prisma.jobApplication.create({
    data: {
      title: "Senior React Developer",
      company: "Deployr",
      link: "https://deployr.dev/careers",
      status: "APPLIED",
      description: `## Sobre a Deployr
Somos uma plataforma de deploy contínuo para times de front-end. Pense em nós como o lugar onde os desenvolvedores empurram código e a magia acontece. Usado por mais de 80.000 projetos.

## O papel
- Contribuir com o dashboard principal e experiência do desenvolvedor
- Construir ferramentas internas e painéis de analytics
- Participar da comunidade open source em volta da plataforma

## Skills desejadas
- Conhecimento profundo de React e estratégias de renderização
- Experiência com bundlers modernos (webpack, esbuild, Vite)
- Contribuições open source são um grande diferencial`,
    },
  });

  // 5. APPLIED
  await prisma.jobApplication.create({
    data: {
      title: "Engenheiro de Software Sênior – Front-end",
      company: "Rappi Clone BR",
      link: "https://rclonebr.com.br/vagas",
      status: "APPLIED",
      description: `## Sobre a vaga
Startup de delivery com operação em 8 estados brasileiros e crescimento de 200% ao ano. Buscamos engenheiros apaixonados por escala e experiência do usuário.

## Suas responsabilidades
- Desenvolver e manter features críticas para o app com milhões de usuários ativos
- Liderar discussões técnicas e revisões de código
- Atuar em squads multidisciplinares com PM, design e dados
- Contribuir com a cultura de engenharia e boas práticas

## Requisitos
- Experiência com React Native ou desenvolvimento mobile híbrido
- Familiaridade com micro-frontends e arquitetura modular
- Inglês intermediário ou avançado`,
    },
  });

  // 6. APPLIED
  await prisma.jobApplication.create({
    data: {
      title: "Frontend Engineer – Plataforma de Dados",
      company: "Dataflow Analytics",
      link: "https://dataflow.ai/careers",
      status: "APPLIED",
      description: `## Sobre a Dataflow
Construímos ferramentas de analytics e visualização de dados para times de produto e dados. Nossa plataforma é usada por engenheiros, PMs e analistas para entender comportamento de usuários em tempo real.

## Responsabilidades
- Construir interfaces de visualização de dados complexas e interativas
- Trabalhar com datasets grandes e garantir boa performance de renderização
- Colaborar com time de dados para expor insights de forma clara e acionável

## Tech Stack
- React, TypeScript, D3.js, Apache ECharts
- GraphQL, Postgres, Clickhouse
- Figma para design handoff`,
    },
  });

  // 7. INTERESTED
  await prisma.jobApplication.create({
    data: {
      title: "Frontend Engineer",
      company: "Planify",
      link: "https://planify.app/jobs",
      status: "INTERESTED",
      description: `## Sobre a Planify
Ferramenta de gestão de projetos construída para times modernos de software. Nos importamos profundamente com craft e qualidade — nosso produto é frequentemente citado como referência de UX no setor.

## O papel
Você vai trabalhar no aplicativo web da Planify, um dos produtos mais polidos do mercado SaaS. Nos importamos profundamente com performance, acessibilidade e experiência do desenvolvedor.

## O que buscamos
- Atenção excepcional a detalhes na implementação de UI
- Experiência construindo features colaborativas em tempo real
- Paixão por qualidade de produto e craftsmanship`,
    },
  });

  // 8. INTERESTED
  await prisma.jobApplication.create({
    data: {
      title: "Senior Full-Stack Engineer",
      company: "Pagesync",
      link: "https://pagesync.io/careers",
      status: "INTERESTED",
      description: `## Sobre a Pagesync
Estamos em uma missão de tornar possível para qualquer pessoa, time e empresa adaptar seu software para resolver qualquer problema. Ferramenta de colaboração com 2M+ de usuários ativos.

## Sobre o papel
- Construir features usadas por milhões de pessoas diariamente
- Trabalhar em otimização de performance web e mobile
- Colaborar com um time de design de classe mundial
- Participar de decisões de arquitetura e produto

## Requisitos
- Experiência com React e gerenciamento de estado complexo
- Background em apps colaborativos ou em tempo real (WebSocket, CRDT)
- Capacidade de trabalhar em toda a stack`,
    },
  });

  // 9. INTERESTED
  await prisma.jobApplication.create({
    data: {
      title: "Engenheiro Full-Stack",
      company: "Helix Bank",
      link: "https://helixbank.io/vagas",
      status: "INTERESTED",
      description: `## Sobre o Helix Bank
Banco digital focado em pessoas físicas e MEIs. Crescemos de 0 para 500k clientes em 2 anos e estamos em fase de aceleração com novos produtos de crédito e investimentos.

## A vaga
Buscamos engenheiros fullstack para trabalhar nos produtos centrais do banco — conta digital, transferências, cartão e crédito. Time pequeno, alto impacto.

## Stack
- Front: React, TypeScript, Next.js
- Back: Node.js, NestJS, PostgreSQL
- Infra: AWS, Kubernetes, Terraform

## Diferencial
- Conhecimento de Open Finance / Open Banking
- Experiência com regulatório financeiro (BACEN, PIX)`,
    },
  });

  // 10. REJECTED
  const app10 = await prisma.jobApplication.create({
    data: {
      title: "Senior Software Engineer",
      company: "Arcturus Tech",
      link: "https://arcturus.tech/jobs",
      status: "REJECTED",
      description: `## Sobre a Arcturus
Empresa de infraestrutura de IA com foco em modelos de linguagem para o mercado enterprise. Nosso produto é usado por Fortune 500 para automação de processos internos.

## Responsabilidades
- Projetar e implementar sistemas distribuídos de grande escala
- Trabalhar com Go, Rust ou C++
- Possuir componentes-chave da plataforma de inferência

## Qualificações mínimas
- 5+ anos de experiência em desenvolvimento de software
- Experiência com algoritmos e estruturas de dados
- Background em sistemas distribuídos ou infraestrutura de grande escala
- Inglês fluente`,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        jobApplicationId: app10.id,
        content: "Processo longo: 5 entrevistas ao longo de 3 semanas. Incluindo system design, algoritmos, coding e cultural fit.",
      },
      {
        jobApplicationId: app10.id,
        content: "Entrevista de algoritmos foi pesada — duas questões difíceis de grafos com restrição de tempo. Resolvi uma completamente e cheguei na solução O(n log n) na segunda mas não terminei.",
      },
      {
        jobApplicationId: app10.id,
        content: "❌ Rejeitado após a etapa de system design. Feedback: precisava de mais profundidade em sistemas de cache distribuído. Anotei para estudar Consistent Hashing e Redis internals.",
      },
    ],
  });

  // 11. REJECTED
  const app11 = await prisma.jobApplication.create({
    data: {
      title: "Frontend Engineer",
      company: "Nimbus UI",
      link: "https://nimbusui.com/careers",
      status: "REJECTED",
      description: `## Sobre a Nimbus UI
Startup que constrói um design system e biblioteca de componentes open source com foco em acessibilidade e performance. Nosso produto é usado por mais de 5.000 projetos no GitHub.

## A vaga
Contribuir com o desenvolvimento e evolução da biblioteca core, criação de novos componentes e documentação interativa com Storybook.

## Requisitos
- Profundo conhecimento de CSS, animações e acessibilidade
- Experiência com Web Components ou bibliotecas headless como Radix UI
- Contribuições open source relevantes`,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        jobApplicationId: app11.id,
        content: "Processo curto: take-home + 1 entrevista técnica.",
      },
      {
        jobApplicationId: app11.id,
        content: "Take-home: construir um componente Combobox acessível do zero, sem bibliotecas de UI, com suporte a teclado e ARIA. Achei bem interessante.",
      },
      {
        jobApplicationId: app11.id,
        content: "❌ Rejeitado. Feedback construtivo: minha implementação de gerenciamento de foco estava incompleta para alguns edge cases com leitores de tela. Boa lição — preciso aprofundar em ARIA live regions.",
      },
    ],
  });

  // 12. APPLIED
  await prisma.jobApplication.create({
    data: {
      title: "Engenheiro de Software – Plataforma",
      company: "Zenit Payments",
      link: "https://zenitpayments.com/vagas",
      status: "APPLIED",
      description: `## Sobre a Zenit
Gateway de pagamentos focado em e-commerce de alto volume. Processamos mais de R$ 2 bilhões por mês com SLA de 99.99% de uptime.

## A vaga
Buscamos um engenheiro para o time de Plataforma, responsável pelas APIs e SDKs consumidos por nossos clientes.

## Responsabilidades
- Manter e evoluir APIs RESTful e SDKs (JS, Python, PHP)
- Garantir backward compatibility e versionamento de APIs
- Documentação técnica e developer experience
- Participar do on-call rotation

## Stack
- Node.js, TypeScript, PostgreSQL, Redis
- AWS (Lambda, SQS, RDS)
- Terraform, GitHub Actions`,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("   → 1 perfil pessoal");
  console.log("   → 4 experiências profissionais");
  console.log("   → 3 formações acadêmicas");
  console.log("   → 8 habilidades");
  console.log("   → 12 candidaturas distribuídas em todos os status");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
