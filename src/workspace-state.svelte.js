// DOM references stay in the controller; only UI state is reactive.
export function createWorkspaceModel(definitions) {
  const model = $state({
    active: null,
    languageRevision: 0,
    windows: definitions.map(item => ({ ...item, status: 'closed', available: true })),
  });
  return model;
}
