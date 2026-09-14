# Agent Rules for this Workspace

## OpenSpec Apply Orchestration
When executing the `opsx-apply-change` skill (via `/opsx-apply`):
- DO NOT execute all tasks in a single continuous loop.
- Execute exactly ONE task at a time.
- After implementing the task and marking it as complete (`[x]`), PAUSE your execution immediately.
- Ask the user: "Deseja continuar com a próxima task nesta mesma sessão ou prefere iniciar um novo chat para manter o contexto limpo?"
- Wait for the user's instructions before proceeding to the next task.
