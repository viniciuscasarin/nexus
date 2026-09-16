## 1. Banco de Dados

- [x] 1.1 Adicionar o model `VoluntaryExperience` em `prisma/schema.prisma` com os mesmos campos de `Experience` (company, position, startDate, endDate, current, description) e verificar que `npx prisma migrate dev --name add-voluntary-experience` executa sem erros e a tabela aparece no banco
- [x] 1.2 Executar `npx prisma generate` e verificar que o Prisma Client expõe `prisma.voluntaryExperience` sem erros de TypeScript

## 2. Schema e Validação

- [x] 2.1 Adicionar `voluntaryExperiences: z.array(experienceSchema)` ao `masterResumeSchema` em `src/lib/validations/resume.ts` e verificar que o tipo `MasterResumeFormValues` inclui o campo `voluntaryExperiences`
- [x] 2.2 Espelhar a mesma mudança em `src/lib/schema.ts` e verificar que o tipo `MasterResumeFormValues` exportado também inclui `voluntaryExperiences`

## 3. Server Actions

- [x] 3.1 Atualizar `loadMasterResume` em `src/app/actions/resume.ts` para buscar `prisma.voluntaryExperience.findMany()` e incluir `voluntaryExperiences` no objeto retornado, verificando que o campo está presente no retorno quando há registros no banco
- [x] 3.2 Atualizar `saveMasterResume` em `src/app/actions/resume.ts` para executar `deleteMany` + `createMany` em `voluntaryExperience` dentro da transação existente, verificando que salvar e recarregar o form preserva os dados de experiências voluntárias

## 4. Formulário Master

- [x] 4.1 Adicionar o `useFieldArray` para `voluntaryExperiences` no `MasterForm` em `src/components/master-form.tsx` e o estado `showVoluntaryExperience` para controle de visibilidade da seção colapsável
- [x] 4.2 Adicionar a seção "Voluntary Experience" no JSX do `MasterForm`, com card colapsável, botão "Add Voluntary Experience", estado vazio e a lista de itens com campos idênticos aos da seção "Experience" — verificar que adicionar, editar e remover entradas funciona e que o formulário salva corretamente

## 5. Geração por IA

- [x] 5.1 Adicionar `voluntaryExperience: z.array(...).default([])` ao `TailoredResumeSchema` e o campo correspondente à interface `TailoredResume` em `src/app/actions/generate.ts`, verificando que o TypeScript compila sem erros
- [x] 5.2 Atualizar o prompt em `generateTailoredResume` para instruir a IA a selecionar experiências voluntárias relevantes para a vaga e incluí-las em `voluntaryExperience[]`, omitindo o campo quando não houver nenhuma relevante — verificar que uma geração com dados de voluntariado no master produz o campo `voluntaryExperience` no objeto retornado

## 6. Visualização do Currículo Gerado

- [x] 6.1 Adicionar a seção "Voluntary Experience" ao componente `TailoredResumeView` em `src/components/tailored-resume.tsx`, renderizada condicionalmente quando `resume.voluntaryExperience.length > 0`, com o mesmo layout da seção "Experience" — verificar que a seção aparece no currículo gerado quando há experiências voluntárias e não aparece quando o array está vazio
