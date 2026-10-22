// Run before styles load so the saved theme is applied before the first paint.
try {
  const saved = localStorage.getItem('loui-theme');
  document.documentElement.dataset.theme = ['light', 'dark'].includes(saved) ? saved : 'light';
} catch {
  document.documentElement.dataset.theme = 'light';
}
