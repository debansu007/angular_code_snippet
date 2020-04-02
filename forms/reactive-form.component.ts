import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { HelperProvider } from "../../providers/helper/helper";
import { UserProvider } from "../../providers/user/user";
import { take } from "rxjs/operators";

@Component({
    selector: "page-business-appointment-setup",
    templateUrl: "business-appointment-setup.html"
})
export class BusinessAppointmentSetupPage implements OnInit {
    @ViewChild("myInput") myInput: ElementRef;

    businessForm: FormGroup;
    isSubmitted: boolean = false;
    signupStep: number = 3;
    loading: boolean = false;

    constructor(
        public formBuilder: FormBuilder,
        public auth: AuthProvider,
        public helper: HelperProvider,
        public user: UserProvider
    ) {
        this.businessForm = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required])],
            description: ["", Validators.compose([Validators.required])],
            costPerHour: ["", Validators.compose([Validators.required])],
            costAfterHour: ["", Validators.compose([Validators.required])],
            duration: ["60", Validators.compose([Validators.required])],
            reminder: this.formBuilder.array([this.initReminder()]),
            userId: [
                this.auth.currentUserId,
                Validators.compose([Validators.required])
            ],
            appointmentId: [0, Validators.compose([Validators.required])]
        });
    }

    initReminder(value = "60") {
        return this.formBuilder.group({
            minutes: [value, Validators.required]
        });
    }

    addReminder(value = "60") {
        const control = <FormArray>this.businessForm.controls["reminder"];
        control.push(this.initReminder(value));
    }

    removeReminder(i: number) {
        // remove address from the list
        const control = <FormArray>this.businessForm.controls["reminder"];
        control.removeAt(i);
    }

    ngOnInit() {
        if (this.helper.data.appointment) {
            const appointment = this.helper.data.appointment;

            this.businessForm.patchValue({
                name: appointment.name,
                description: appointment.description,
                costPerHour: appointment.costPerHour,
                costAfterHour: appointment.costAfterHour,
                duration: appointment.duration,
                appointmentId: appointment.appointmentId
            });
            this.removeReminder(0);
            appointment.reminder.forEach(el => {
                this.addReminder(el.minutes);
            });
        }
    }
    
    resize() {
        console.log(this.myInput);
        var element = this.myInput[
            "_elementRef"
        ].nativeElement.getElementsByClassName("text-input")[0];
        var scrollHeight = element.scrollHeight > 80 ? element.scrollHeight : 80;
        if (element.scrollHeight <= 150) {
            element.style.height = scrollHeight + "px";
            this.myInput["_elementRef"].nativeElement.style.height =
                scrollHeight + 16 + "px";
        }
    }

    onSave() {
        this.isSubmitted = true;
        this.loading = true;
        console.log(this.businessForm);

        if (this.businessForm.valid) {
            this.user.saveBusinessAppointment(this.businessForm.value).then(
                (res: any) => {
                    this.loading = false;
                },
                err => {
                    this.loading = false;
                    console.log(err);
                }
            );
        }
    }

    checkField(field) {
        const formField = this.businessForm.controls[field];
        return formField.invalid && (formField.touched || this.isSubmitted);
    }

}
