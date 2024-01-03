import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormErrorMessages } from '@shared/constants/form-error-messages';

@Component({
  selector: 'tm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = null;
  @Input() placeholder = '';
  @Input() errorMessage: string = null;
  @Input() isInvalid = false;
  @Input() icon: string = null;
  @Input() type = 'text';
  @Input() popoverMessage: string = null;
  @Input() autocomplete?: string;

  public isDisabled = false;
  public isPopoverVisible = false;
  private _value: any = '';

  public readonly formErrorMessages = FormErrorMessages;

  onChange = (value: any) => {
    this.value = value;
  };
  onTouch = () => {
  };

  set value(value: any) {
    this.onTouch();

    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  get value(): any {
    return this._value;
  }

  public get control(): NgControl {
    return this._ngControl || null;
  }

  public get invalid(): boolean {
    return this._ngControl ? this._ngControl.invalid || this.isInvalid : false;
  }

  public get showError(): boolean {
    if (!this._ngControl) {
      return false;
    }

    const { dirty, touched } = this._ngControl;

    return this.invalid ? dirty || touched : false;
  }

  constructor(@Self() @Optional() private readonly _ngControl: NgControl) {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
      this.value = this._ngControl.value;
    }
  }

  public registerOnChange(onChange: () => {}): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => {}): void {
    this.onTouch = onTouched;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public handlePopover(event: MouseEvent = null, value: boolean = null): void {
    if (event) {
      event.preventDefault();
    }
    this.isPopoverVisible = value || !this.isPopoverVisible;
  }
}
