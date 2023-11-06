import { FormGroup } from '@angular/forms';

export function checkPassword(group: FormGroup) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (password === confirmPassword) {
    return null;
  }
  return { passwordMismatch: true };
}
