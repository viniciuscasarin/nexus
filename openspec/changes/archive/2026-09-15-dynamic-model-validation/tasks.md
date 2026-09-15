## 1. Backend Implementation

- [x] 1.1 Implement dynamic Google Gemini model validation in `models.ts` and verify it fetches from `generativelanguage.googleapis.com` if `GEMINI_API_KEY` is present.
- [x] 1.2 Implement dynamic OpenAI model validation in `models.ts` and verify it fetches from `api.openai.com` if `OPENAI_API_KEY` is present.
- [x] 1.3 Implement dynamic Anthropic model validation in `models.ts` and verify it fetches from `api.anthropic.com` if `ANTHROPIC_API_KEY` is present.
- [x] 1.4 Utilize Next.js caching (e.g. `unstable_cache`) in `getAvailableModels()` to store results for at least 1 hour and verify it avoids redundant HTTP calls across renders.

## 2. Frontend Integration

- [x] 2.1 Update `JobApplicationDetails` to fetch `getAvailableModels()` dynamically instead of using a hardcoded string, and verify it uses the first available model for `generateTailoredResume`.
- [x] 2.2 Verify the Job Analysis and Job Application workflows end-to-end to ensure resumes are generated correctly without unsupported model errors.
