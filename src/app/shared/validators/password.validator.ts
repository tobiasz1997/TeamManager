import { AbstractControl, ValidationErrors } from '@angular/forms';

const numberRegex = /\d/;
const uppercaseLetterRegex = /[A-Z]/;
const lowercaseLetterRegex = /[a-z]/;
const minLength = 6;
const maxLength = 20;

/**
 * @description This is validator for validating password.
 * @description Rules:
 *
 * - must be number
 * - must be lowerCase
 * - must be upperCase
 * - must be bigger or equal 6
 * - must be smaller or equal 20
 * - no whitespaces
 */
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value == null || control.value === '') { return null; }
  if (!numberRegex.test(control.value)) { return { password: true }; }
  if (!uppercaseLetterRegex.test(control.value)) { return { password: true }; }
  if (!lowercaseLetterRegex.test(control.value)) { return { password: true }; }
  if (control.value.length < minLength) { return { password: true }; }
  if (control.value.length > maxLength) { return { password: true }; }
  if (control.value.indexOf(' ') >= 0) { return { hasWhitespace: true }; }

  return null;
}
