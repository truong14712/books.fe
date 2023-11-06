import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateToDate(control: AbstractControl): ValidationErrors | null {
  const fromDate = control.parent?.get('fromDate')?.value;
  const toDate = control.value;

  if (fromDate && toDate && toDate < fromDate) {
    return { invalidToDate: true };
  }

  return null;
}
