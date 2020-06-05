import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
  
export class CustomValidator {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return {cannotContainSpace: true}
        }
        return null;
    }
    static whiteSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).trim().length < 1){
            return { whiteSpace: true}
        }
        return null;
    }
    static confirmPassword(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}