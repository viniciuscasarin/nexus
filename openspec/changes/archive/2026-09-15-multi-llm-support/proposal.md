## Why

Atualmente a aplicação suporta apenas o provedor Google Gemini com o modelo hardcoded. A necessidade de usar outros provedores como OpenAI e Anthropic (dependendo das chaves de API disponíveis no ambiente) trará mais flexibilidade e robustez para os usuários, permitindo que escolham seu LLM preferido para a análise de vagas.

## What Changes

- Integração do Vercel AI SDK (`ai`) para unificar as chamadas aos diferentes LLMs.
- Adição dos pacotes de provedores `@ai-sdk/google`, `@ai-sdk/openai` e `@ai-sdk/anthropic`.
- Criação de uma server action para listar os modelos disponíveis com base nas variáveis de ambiente presentes (`GEMINI_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`).
- Adição de um dropdown de seleção de modelo (usando shadcn/ui Select) na interface do `Job Analysis`.
- Refatoração de `analyzeJob` e `generateTailoredResume` para usar o `generateObject` do Vercel AI SDK.
- Adição de testes unitários para a listagem e validação dos modelos suportados.

## Capabilities

### New Capabilities

- `llm-provider-management`: Gerenciamento dinâmico e unificado de múltiplos LLMs (Google, Anthropic, OpenAI) com base na presença de chaves de API no ambiente.

### Modified Capabilities

- `job-analysis`: O usuário deve conseguir selecionar o LLM desejado no formulário antes de disparar a análise, com a lista restrita apenas aos provedores com credenciais válidas no ambiente.

## Impact

- **Código afetado**: `src/app/actions/analyze.ts`, `src/app/actions/generate.ts`, `src/components/job-analysis.tsx`.
- **Dependências adicionadas**: `ai`, `@ai-sdk/google`, `@ai-sdk/openai`, `@ai-sdk/anthropic`, além do componente de interface `Select` do shadcn.
- **Testes**: Criação de novas suítes de testes unitários para garantir o fallback e parseamento das chaves de API.
