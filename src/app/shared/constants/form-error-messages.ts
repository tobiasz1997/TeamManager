import { IFormErrorMessagesInterface } from '@shared/interfaces/form-error-messages.interface';

export const FormErrorMessages: IFormErrorMessagesInterface[] = [
  { type: 'required', message: 'Field is required.' },
  { type: 'email', message: 'Invalid email format.' },
  {
    type: 'passwordMustMatch',
    message: 'Password and repeat password must be the same.',
  },
  { type: 'password', message: 'Invalid password format.' },
  { type: 'hasWhitespace', message: 'Field can not contain white spaces.' },
  { type: 'urlImage', message: 'This image URL is incorrect.' },
];

export const FormPasswordRulesMessage =
  'Password must contain at least one big and small letter, at least one number,\n' +
  'can not be shorten than 6 and longer than 20 characters.';
