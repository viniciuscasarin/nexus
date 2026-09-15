import { getAvailableModels } from '../models';

describe('getAvailableModels', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns models from all providers when all API keys are present', async () => {
    process.env.GEMINI_API_KEY = 'test_gemini_key';
    process.env.OPENAI_API_KEY = 'test_openai_key';
    process.env.ANTHROPIC_API_KEY = 'test_anthropic_key';

    const models = await getAvailableModels();

    expect(models.some(m => m.provider === 'google')).toBe(true);
    expect(models.some(m => m.provider === 'openai')).toBe(true);
    expect(models.some(m => m.provider === 'anthropic')).toBe(true);
    expect(models.length).toBe(6);
  });

  it('returns only Google models when only GEMINI_API_KEY is present', async () => {
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    process.env.GEMINI_API_KEY = 'test_gemini_key';

    const models = await getAvailableModels();

    expect(models.some(m => m.provider === 'google')).toBe(true);
    expect(models.some(m => m.provider === 'openai')).toBe(false);
    expect(models.some(m => m.provider === 'anthropic')).toBe(false);
    expect(models.length).toBe(2);
  });

  it('returns no models when no API keys are present', async () => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const models = await getAvailableModels();

    expect(models.length).toBe(0);
  });
});
