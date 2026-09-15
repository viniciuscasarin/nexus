## Why

Atualmente, os erros da API (como falha na análise de IA ou falha na geração do currículo) são exibidos como texto estático em vermelho dentro do layout do componente ou simplesmente falham silenciosamente. Precisamos de um sistema de notificações consistente, global e moderno para melhor experiência do usuário ao lidar com falhas de rede, problemas de validação ou retornos da API. O Sonner (via shadcn) resolve isso com notificações Toast limpas e gerenciamento simples de estados de alerta.

## What Changes

- Instalar o pacote `sonner` via `shadcn-ui`.
- Adicionar o componente `<Toaster />` globalmente no `src/app/layout.tsx`.
- Modificar o fluxo de tratamento de erros no `src/components/job-analysis.tsx` para substituir mensagens de erro no state interno/UI por chamadas ao `toast.error()`.
- Opcionalmente, adicionar `toast.success()` para ações bem-sucedidas como salvar jobs.

## Capabilities

### New Capabilities

- Nenhuma nova regra de negócio de alto nível está sendo criada. O comportamento esperado de notificar o usuário de falhas já existia implicitamente, estamos apenas modernizando a UI.

### Modified Capabilities

- Nenhuma alteração nas regras de negócio. (Configurarei `skip_specs: true` para essa mudança, pois é estritamente relacionada a UX e implementação técnica).

## Impact

- `package.json` (nova dependência `sonner` e `next-themes` se exigido pelo shadcn)
- `src/components/ui/sonner.tsx` será adicionado.
- `src/app/layout.tsx` receberá um novo provider de toast global.
- `src/components/job-analysis.tsx` removerá renderização customizada de erros em texto plano e usará `toast`.
