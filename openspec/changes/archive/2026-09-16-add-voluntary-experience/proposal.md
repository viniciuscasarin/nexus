## Why

O currículo master hoje agrupa toda experiência profissional em uma única seção. Candidatos com histórico relevante de trabalho voluntário não têm onde registrá-lo separadamente, o que impede a IA de gerar uma seção distinta de "Experiências Voluntárias" no currículo final — uma seção valorizada em processos seletivos.

## What Changes

- Novo modelo `VoluntaryExperience` no banco de dados (mesmos campos de `Experience`)
- Nova seção "Voluntary Experience" no formulário master (`master-form.tsx`)
- Carregamento e persistência das experiências voluntárias nas server actions
- Novo campo `voluntaryExperience[]` na interface `TailoredResume` e no schema Zod correspondente
- Prompt de geração atualizado para incluir experiências voluntárias como input
- Nova seção "Voluntary Experience" no componente de visualização do currículo gerado (`tailored-resume.tsx`)

## Capabilities

### New Capabilities

_(nenhuma nova capability independente — a funcionalidade é uma extensão de capacidades existentes)_

### Modified Capabilities

- `resume-master-data`: O sistema passa a permitir que o usuário registre, edite e visualize experiências voluntárias separadas das profissionais.
- `resume-generation`: O currículo gerado pela IA passa a incluir uma seção dedicada de experiências voluntárias, quando presentes nos dados master.

## Impact

- **Banco de dados**: nova migration Prisma para criar a tabela `VoluntaryExperience`
- **Validação/Schema**: `masterResumeSchema` ganha o campo `voluntaryExperiences`
- **Server actions**: `loadMasterResume` e `saveMasterResume` passam a ler/escrever `VoluntaryExperience`
- **Geração IA**: `TailoredResume` interface, `TailoredResumeSchema` e prompt ganham `voluntaryExperience[]`
- **UI**: `master-form.tsx` e `tailored-resume.tsx` ganham a nova seção
