## Context

A aplicação precisa suportar múltiplos LLMs (Google, OpenAI, Anthropic) dependendo das variáveis de ambiente configuradas, saindo do modelo atualmente hardcoded com `@google/genai`. Veja `proposal.md` para a motivação.

## Goals / Non-Goals

**Goals:**
- Unificar a interface de integração com IA usando o Vercel AI SDK.
- Permitir a seleção dinâmica de modelo na interface de Job Analysis.
- Testar a lógica de resolução de modelos com testes unitários isolados.

**Non-Goals:**
- Não adicionaremos suporte a providers locais ou autohospedados (ex: Ollama) nesta mudança.

## Decisions

- **Uso do Vercel AI SDK (`ai` e `@ai-sdk/*`)**:
  - *Rationale*: O SDK abstrai as diferenças entre os provedores e fornece a função `generateObject`, que utiliza o schema Zod para garantir o formato JSON de saída correto, simplificando os tipos.
  - *Alternatives*: Manter os SDKs oficiais de cada provedor separadamente, o que aumentaria drasticamente a lógica de controle.

- **Resolução dinâmica de Modelos via Server Action**:
  - *Rationale*: Uma função de servidor checará a presença de chaves como `GEMINI_API_KEY`, retornando ao cliente a lista restrita dos modelos utilizáveis.
  - *Alternatives*: Exigir que a configuração seja persistida num SQLite. Não vale a pena porque as chaves de API não devem ser gravadas no banco do usuário se já estão disponíveis no `.env`.

## Risks / Trade-offs

- [Risco] Modelos menores (ex: Claude Haiku ou GPT-4o-mini) podem falhar em manter a estrutura exata do JSON esperado pelas interfaces.
  - *Mitigação*: O Vercel AI SDK faz retries e correções de parsing automaticamente ao usar `generateObject` com um schema estrito do Zod.
