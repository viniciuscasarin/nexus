## 1. Instalação e Configuração Global

- [x] 1.1 Instalar o pacote `sonner` via Shadcn UI rodando `npx shadcn-ui@latest add sonner` e verificar se o arquivo `src/components/ui/sonner.tsx` foi criado corretamente.
- [x] 1.2 Importar e adicionar o `<Toaster />` no `src/app/layout.tsx` (provavelmente acima ou abaixo dos children) e verificar se a build roda sem erros.

## 2. Refatoração da Tela de Análise

- [x] 2.1 Importar o hook ou objeto `toast` da biblioteca sonner no `src/components/job-analysis.tsx`.
- [x] 2.2 Substituir a renderização estática de erros no bloco condicional `{error && ( <div className="text-red-500..."> )}` para que os erros sejam exibidos usando `toast.error(err.message)` nos blocos `catch` das funções `handleAnalyze`, `handleGenerate` e `handleSave`. Verificar na UI se, ao causar um erro proposital (ex: apagar a chave de API ou usar um modelo inválido), o Toast aparece na tela.
- [x] 2.3 (Opcional) Adicionar feedback visual `toast.success("Job salvo com sucesso!")` no final do bloco `try` em `handleSave`, e verificar se a notificação verde é disparada no sucesso.
