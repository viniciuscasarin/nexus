## Why

Ao gerar o PDF de um currículo na plataforma utilizando a funcionalidade de impressão do navegador, elementos da interface da aplicação (como a sidebar e cabeçalhos de modal) bem como cabeçalhos e rodapés automáticos do navegador estavam vazando para o documento final, deixando-o "sujo". A intenção é ter um documento limpo contendo apenas as informações do currículo.

## What Changes

- Adicionar regras globais no `globals.css` utilizando `@media print`.
- Ocultar margens automáticas da página de impressão (`@page { margin: 0; }`) para evitar a impressão da data e título inseridos pelo navegador.
- Ocultar os elementos globais (body) e tornar visível somente a classe `.resume-container`.
- Posicionar a `.resume-container` de forma absoluta no canto superior esquerdo da página com margens amigáveis para a exportação de um PDF.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- None

## Impact

- `src/app/globals.css`: Adição de estilos de `@media print`. Sem impacto funcional na navegação web; impacta exclusivamente a visualização e exportação da página de currículo para PDF.
