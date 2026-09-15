# llm-provider-management Specification

## Purpose
Gerencia a configuração e listagem dinâmica de provedores de LLM (Google, OpenAI, Anthropic) baseados na presença de chaves de API no ambiente.

## Requirements

### Requirement: Listagem de provedores ativos
The system SHALL list only the LLM providers and their corresponding models for which valid API keys are configured in the environment.

#### Scenario: All API keys present
- **WHEN** the environment contains GEMINI_API_KEY, OPENAI_API_KEY, and ANTHROPIC_API_KEY
- **THEN** the system returns models from all three providers

#### Scenario: Only some API keys present
- **WHEN** the environment contains only GEMINI_API_KEY
- **THEN** the system returns only Gemini models and omits OpenAI and Anthropic models
