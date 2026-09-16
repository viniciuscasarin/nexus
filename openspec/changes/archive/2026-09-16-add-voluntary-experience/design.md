## Context

O projeto usa SQLite via Prisma, com models independentes por entidade (`Experience`, `Education`, `Skill`). O formulário master (`master-form.tsx`) usa `react-hook-form` com `useFieldArray` para cada seção dinâmica. A geração é feita via `generateObject` do Vercel AI SDK, com um schema Zod que determina a estrutura do output da IA.

Atualmente não há nenhum discriminador de tipo em `Experience` — a separação profissional/voluntária não existe no banco.

## Goals / Non-Goals

**Goals:**
- Adicionar tabela `VoluntaryExperience` com os mesmos campos de `Experience`
- Expor a seção no formulário master com `useFieldArray` dedicado
- Incluir `voluntaryExperience[]` no tipo `TailoredResume` e no schema Zod de geração
- Renderizar a seção "Voluntary Experience" no componente `TailoredResumeView`
- Instruir a IA a selecionar experiências voluntárias relevantes para a vaga

**Non-Goals:**
- Campos adicionais específicos para voluntariado (ex: causa, organização)
- Migração de dados existentes (tabela nova, sem dados a migrar)
- Tornar a seção obrigatória no currículo gerado

## Decisions

### Tabela separada vs. campo discriminador

**Decisão**: tabela separada (`VoluntaryExperience`).

**Alternativa considerada**: adicionar `isVoluntary: Boolean` no model `Experience` existente. Rejeitada porque exigiria filtrar em todas as queries existentes (`findMany`, `deleteMany`, `createMany`) e aumentaria o risco de regressão nas funcionalidades atuais.

**Tabela separada** mantém as queries existentes intocadas e isola completamente os dois domínios sem impacto colateral.

### Reutilização do schema Zod de experiência

O `experienceSchema` existente em `src/lib/validations/resume.ts` e `src/lib/schema.ts` é idêntico ao que `VoluntaryExperience` precisaria. Será **reutilizado diretamente** — ambos os `useFieldArray` apontarão para o mesmo schema de item, apenas com chaves de campo distintas (`experiences` vs `voluntaryExperiences`).

### Output da IA

O schema `TailoredResumeSchema` ganha o campo `voluntaryExperience: z.array(...)` (opcional, com `.default([])`). O prompt instrui a IA a:
1. Selecionar experiências voluntárias relevantes para a vaga
2. Omitir a seção se não houver nenhuma relevante

Isso evita uma seção vazia no currículo gerado.

## Risks / Trade-offs

- **Migration necessária**: `npx prisma migrate dev` criará a migration da nova tabela. Risco baixo — é uma operação aditiva sem alteração de tabelas existentes.
- **Regressão no `saveMasterResume`**: a transação existente faz `deleteMany` + `createMany` para cada entidade. Adicionar o mesmo padrão para `voluntaryExperience` é seguro e consistente com o código atual.
- **Output da IA pode ignorar voluntárias**: se o modelo julgar que nenhuma é relevante, a seção ficará vazia. Isso é comportamento desejável (ver Non-Goals).

## Migration Plan

1. Adicionar model `VoluntaryExperience` no `prisma/schema.prisma`
2. Rodar `npx prisma migrate dev --name add-voluntary-experience`
3. Atualizar schemas Zod e types
4. Atualizar server actions
5. Atualizar form e componente de visualização
6. Testar fluxo completo: salvar → gerar → visualizar
