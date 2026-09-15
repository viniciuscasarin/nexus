'use server';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { unstable_cache } from 'next/cache';

export type ModelProvider = 'google' | 'openai' | 'anthropic';

export interface AvailableModel {
  id: string;
  name: string;
  provider: ModelProvider;
}

export const getAvailableModels = unstable_cache(
  async (): Promise<AvailableModel[]> => {
    const models: AvailableModel[] = [];

    if (process.env.GEMINI_API_KEY) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.models && Array.isArray(data.models)) {
            const geminiModels = data.models
              .filter((m: any) => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
              .map((m: any) => ({
                id: m.name.replace('models/', ''),
                name: m.displayName || m.name.replace('models/', ''),
                provider: 'google' as ModelProvider,
              }));
            models.push(...geminiModels);
          }
        }
      } catch (e) {
        console.error('Error fetching Gemini models:', e);
      }
    }

    if (process.env.OPENAI_API_KEY) {
      try {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            const openaiModels = data.data
              .filter((m: any) => m.id.startsWith('gpt-'))
              .map((m: any) => ({
                id: m.id,
                name: m.id,
                provider: 'openai' as ModelProvider,
              }));
            models.push(...openaiModels);
          }
        }
      } catch (e) {
        console.error('Error fetching OpenAI models:', e);
      }
    }

    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/models', {
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            const anthropicModels = data.data
              .filter((m: any) => m.type === 'model')
              .map((m: any) => ({
                id: m.id,
                name: m.display_name || m.id,
                provider: 'anthropic' as ModelProvider,
              }));
            models.push(...anthropicModels);
          } else {
            // Fallback if the response format is unexpected
            models.push({ id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet', provider: 'anthropic' });
            models.push({ id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', provider: 'anthropic' });
          }
        } else {
          // Fallback if the request fails
          models.push({ id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet', provider: 'anthropic' });
          models.push({ id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', provider: 'anthropic' });
        }
      } catch (e) {
        console.error('Error fetching Anthropic models:', e);
        models.push({ id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet', provider: 'anthropic' });
        models.push({ id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', provider: 'anthropic' });
      }
    }

    return models;
  },
  ['available-models-cache'],
  { revalidate: 3600 }
);

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
