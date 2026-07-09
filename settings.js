function initSettingsPage() {
  // Update user details or run theme adjustments if needed
  applyTheme();
}

if (window.yaplabStateReady) {
  initSettingsPage();
} else {
  window.addEventListener('yaplabStateReady', initSettingsPage);
}
