// DOM references stay in the controller; only UI state is reactive.
export function createWorkspaceModel(definitions) {
  const model = $state({
    active: null,
    languageRevision: 0,
    contactService: '',
    windows: definitions.map(item => ({ ...item, status: 'closed', available: true, dockOrder:0 })),
  });
  return model;
}
