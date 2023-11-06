export function preventAlphabetInput(event: KeyboardEvent) {
  const { key, keyCode } = event;
  if (!/^\d$/.test(key) && keyCode !== 8) {
    event.preventDefault();
  }
}
