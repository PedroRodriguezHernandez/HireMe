export function showAlert(header: string, message: string): void {
  window.alert(`${header}\n\n${message}`);

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}
