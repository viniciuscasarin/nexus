## Context

O app atual lida com erros de forma manual e local ao componente (ex: gravando erros numa variável de estado e renderizando texto vermelho na tela). Vide `proposal.md` para motivação.

## Goals / Non-Goals

**Goals:**
- Instalar e configurar `sonner` via `shadcn-ui`.
- Integrar notificações Toaster na raiz da aplicação.
- Trocar tratamento de erro da tela de Análise para usar Toasts.

**Non-Goals:**
- Reescrever outras telas que não sejam a `JobAnalysis` neste momento (embora o `<Toaster />` vá estar lá para usos futuros).

## Decisions

- **Decisão:** Usar `sonner` ao invés de `react-hot-toast` ou `react-toastify`.
- **Justificativa:** O Sonner é a biblioteca padrão que vem embutida na nova versão do shadcn-ui, oferecendo animações fluidas, temas nativos e configuração global simples e performática, permitindo empilhar múltiplas mensagens suavemente.

## Risks / Trade-offs

- **Risco:** Shadcn UI exigir `next-themes` caso o projeto ainda não tenha.
- **Mitigação:** Vamos rodar o comando oficial `npx shadcn-ui@latest add sonner`, que resolve suas próprias dependências. Se ele criar wrappers complexos, iremos apenas aceitar a configuração padrão dele e importar `toast` dele.
