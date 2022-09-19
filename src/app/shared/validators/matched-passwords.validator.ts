import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchedPasswordsValidator(
  passwordControl: string,
  confirmPasswordControl: string
): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(passwordControl);
    const matchingControl = controls.get(confirmPasswordControl);

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordMustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}
