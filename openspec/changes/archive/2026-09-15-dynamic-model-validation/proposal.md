## Why

The application currently hardcodes the list of available AI models (e.g., `gemini-1.5-pro`, `gpt-4o`) based simply on the presence of API keys in the environment. It also defaults to hardcoded strings like `"google:gemini-3.1-pro"` in components like the Job Application Details modal, which leads to runtime errors ("Unsupported model"). We need the application to dynamically fetch and validate available models directly from the providers (Google, OpenAI, Anthropic) so that it always lists supported models without requiring code changes when a provider deprecates or introduces new models.

## What Changes

- **Backend**: Refactor `getAvailableModels()` in `src/app/actions/models.ts` to make dynamic HTTP GET requests to the respective provider APIs (Google Gemini, OpenAI, Anthropic) to retrieve the actual list of available models if their API keys are present.
- **Backend**: Implement a simple caching mechanism (e.g., `unstable_cache` or memory cache) in `getAvailableModels()` to prevent slow, redundant API calls on every render.
- **Frontend**: Update `src/components/job-application-details.tsx` to call `getAvailableModels()` and use the first dynamically available model instead of hardcoding `"google:gemini-3.1-pro"`.

## Capabilities

### New Capabilities

### Modified Capabilities
- `llm-provider-management`: The system must dynamically validate and retrieve the list of available models directly from the providers' APIs rather than relying on hardcoded lists based on API key presence.

## Impact

- **Backend (`src/app/actions/models.ts`)**: Will now perform network requests to external APIs.
- **Frontend (`src/components/job-application-details.tsx`)**: Will await the resolution of available models before generating the tailored resume.
- **Performance**: Initial load of available models will be slightly slower, mitigated by the proposed caching layer.
