## Context

See `proposal.md` for the motivation. The current system relies on hardcoded string values for AI models, causing runtime errors if models are deprecated, renamed, or unsupported by a specific API key. By moving to dynamic validation, we interact directly with provider APIs. However, because `getAvailableModels()` is used in UI components (like the Job Analysis page), hitting external APIs on every render would degrade UX.

## Goals / Non-Goals

**Goals:**
- Dynamically query Google Gemini, OpenAI, and Anthropic APIs to get the real list of available models.
- Abstract the fetching logic to a central place in `models.ts`.
- Cache the API responses for a reasonable amount of time to ensure the UI remains responsive.

**Non-Goals:**
- Removing any provider. We will still support all 3 current providers (Google, OpenAI, Anthropic).
- Implementing a persistent database cache. Memory cache (e.g., `unstable_cache` or a simple singleton variable) is sufficient.

## Decisions

### 1. API Fetching Implementation
- **Google Gemini**: Will use `fetch('https://generativelanguage.googleapis.com/v1beta/models?key=...')` and filter for models where `supportedGenerationMethods` includes `generateContent`.
- **OpenAI**: Will use `fetch('https://api.openai.com/v1/models')` with `Authorization: Bearer <key>` and filter for `id.startsWith('gpt-')`.
- **Anthropic**: Anthropic's Models API is very new (or potentially unavailable depending on the SDK version). If fetching `https://api.anthropic.com/v1/models` fails or is not robust, we will fall back to a known static list (e.g., `claude-3-5-sonnet-20240620`) but validate the API key works by making a minimal request, OR we simply try to use the REST API first. Given the requirement to validate, we will implement the REST API fetch `GET https://api.anthropic.com/v1/models` with headers `x-api-key` and `anthropic-version`.

### 2. Caching Strategy
- **Approach**: We will explicitly use Next.js caching (`unstable_cache` or the `next/cache` utilities) to cache the results of the model fetching functions for at least 1 hour.
- **Rationale**: Using the native Next.js cache ensures the request is deduplicated and efficiently handled across multiple renders and serverless executions, avoiding the overhead of fetching model endpoints redundantly.
- **Alternatives Considered**: A module-level variable cache. This was rejected because it does not reliably persist across serverless function invocations in Next.js compared to native caching.

## Risks / Trade-offs

- **[Risk]** Anthropic API might not return a standard models list if the `anthropic-version` doesn't support it yet.
  → **Mitigation**: Implement a try/catch specifically for each provider. If Anthropic fails the dynamic model list fetch, we can either return a known default or log the error and omit it.
- **[Risk]** API rate limits when fetching models.
  → **Mitigation**: The caching mechanism completely resolves this, ensuring we only hit the models endpoint once per hour.
