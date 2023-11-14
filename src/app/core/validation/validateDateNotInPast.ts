import { AbstractControl } from '@angular/forms';

export function validateDateNotInPast(control: AbstractControl): { [key: string]: boolean } | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    return { dateInPast: true };
  }

  return null;
}
