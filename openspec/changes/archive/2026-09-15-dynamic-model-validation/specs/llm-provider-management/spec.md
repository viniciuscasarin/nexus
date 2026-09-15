## MODIFIED Requirements

### Requirement: Listagem de provedores ativos
The system SHALL list only the LLM providers and their corresponding models for which valid API keys are configured in the environment, by dynamically querying each provider's API to retrieve and validate the actual list of supported models.

#### Scenario: All API keys present
- **WHEN** the environment contains GEMINI_API_KEY, OPENAI_API_KEY, and ANTHROPIC_API_KEY
- **THEN** the system dynamically requests the models from Google, OpenAI, and Anthropic APIs and returns the aggregated list of available models

#### Scenario: Only some API keys present
- **WHEN** the environment contains only GEMINI_API_KEY
- **THEN** the system dynamically requests models from Google's API, returns the available Gemini models, and omits OpenAI and Anthropic models

#### Scenario: Caching of provider models
- **WHEN** the system has already queried a provider's API for available models within the cache TTL
- **THEN** the system returns the cached list of models without making redundant external HTTP requests
