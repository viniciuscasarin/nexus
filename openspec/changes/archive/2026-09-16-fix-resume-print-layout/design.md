## Context

A impressão via navegador captura todos os elementos HTML renderizados na tela e injeta cabeçalho/rodapé próprios por padrão. Ver `proposal.md`.

## Goals / Non-Goals

**Goals:**
- Garantir que a geração de PDF (via impressão do navegador) contenha exclusivamente o conteúdo do currículo.
- Ocultar elementos de UI (Sidebar, Dialogs).
- Remover as margens automáticas que injetam a data e a URL no documento impresso.

**Non-Goals:**
- Nenhuma funcionalidade de conversão de PDF no lado do servidor será implementada (ex: Puppeteer). Manteremos a geração de PDF delegada ao navegador web (`window.print`).

## Decisions

- **Usar Media Queries CSS (`@media print`)**: Adicionaremos as propriedades globalmente em `src/app/globals.css`. Essa é a abordagem nativa e mais robusta para isolar a visualização de um elemento (no caso `.resume-container`) no momento da impressão, garantindo compatibilidade com os padrões da web, sem a necessidade de reestruturação do componente React ou dependências adicionais.

## Risks / Trade-offs

- *Risco:* As margens zeradas para eliminar os cabeçalhos do browser requerem ajustes no `.resume-container` usando padding (ex: `1.5cm`) para garantir que o currículo não fique colado nas extremidades físicas do papel ou arquivo PDF.
- *Trade-off:* O `window.print` tem comportamentos sutilmente variados entre navegadores, mas a regra `@page { margin: 0; }` com o reset do `body` atende perfeitamente ao Chrome/Edge, que são os navegadores alvos mais comuns para essa conversão.
