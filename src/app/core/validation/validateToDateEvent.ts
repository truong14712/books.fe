import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateToDateEvent(control: AbstractControl): ValidationErrors | null {
  const fromDate = control.parent?.get('start_Date')?.value;
  const toDate = control.value;

  if (fromDate && toDate && toDate < fromDate) {
    return { invalidToDate: true };
  }

  return null;
}
