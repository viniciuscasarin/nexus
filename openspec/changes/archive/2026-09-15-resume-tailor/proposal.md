## Why

Criar currículos otimizados para cada vaga é um processo manual, lento e sujeito a erros. Este projeto resolve isso automatizando a análise de compatibilidade e a geração de currículos sob medida a partir de uma "Fonte de Verdade" única e de um texto descritivo de vaga, reduzindo o tempo de aplicação e aumentando as chances de sucesso do candidato.

## What Changes

- **Frontend & Backend (Fullstack)**: Criação de um app local usando Next.js (App Router), `shadcn/ui` e TailwindCSS.
- **Gestão da Fonte de Verdade**: Implementação de um formulário completo (Master Form) gerenciado via `react-hook-form` e persistido em um banco de dados SQLite (via Prisma).
- **Análise de Vagas**: Criação de um módulo que recebe o texto de uma vaga e avalia a compatibilidade com a "Fonte de Verdade".
- **Geração por IA**: Integração com IA (priorizando Antigravity ou Gemini CLI via child process, ou API keys como fallback) para gerar uma versão otimizada do currículo.
- **Histórico e Exportação**: Funcionalidade para listar o histórico de versões salvas e exportá-las para PDF com alta fidelidade visual.

## Capabilities

### New Capabilities
- `resume-master-data`: Gerenciamento da fonte de verdade (Master Form) do currículo do usuário, persistindo em SQLite.
- `job-analysis`: Análise de texto de descrição de vagas e comparação de compatibilidade com o currículo base.
- `resume-generation`: Geração e exportação (visualização e PDF) de currículos otimizados utilizando IA.

### Modified Capabilities
- N/A

## Impact

Este projeto estabelece toda a base (Next.js, Prisma, SQLite, shadcn/ui) e os fluxos iniciais. Como é um projeto novo executado localmente, o impacto restringe-se a inicializar a stack e garantir que as integrações com os motores de IA funcionem localmente, sem dependências de infraestrutura em nuvem além das APIs da LLM (quando aplicável).
