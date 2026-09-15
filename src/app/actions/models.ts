'use server';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

export type ModelProvider = 'google' | 'openai' | 'anthropic';

export interface AvailableModel {
  id: string;
  name: string;
  provider: ModelProvider;
}

export async function getAvailableModels(): Promise<AvailableModel[]> {
  const models: AvailableModel[] = [];

  if (process.env.GEMINI_API_KEY) {
    models.push({ id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'google' });
    models.push({ id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'google' });
  }

  if (process.env.OPENAI_API_KEY) {
    models.push({ id: 'gpt-4o', name: 'GPT-4o', provider: 'openai' });
    models.push({ id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai' });
  }

  if (process.env.ANTHROPIC_API_KEY) {
    models.push({ id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet', provider: 'anthropic' });
    models.push({ id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', provider: 'anthropic' });
  }

  return models;
}

export async function getModel(modelId: string) {
  if (modelId.startsWith('gemini')) {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    return google(modelId);
  }
  if (modelId.startsWith('gpt')) {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    return openai(modelId);
  }
  if (modelId.startsWith('claude')) {
    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    return anthropic(modelId);
  }
  throw new Error(`Unsupported model: ${modelId}`);
}
