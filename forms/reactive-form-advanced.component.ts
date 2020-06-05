import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidator } from '../../custom.validator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  signupForm: FormGroup;
  skillData: any = [
    {skill: 'javaScript', description: 'Good...'},
    {skill: 'Angular', description: 'Good...'},
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, CustomValidator.whiteSpace]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, CustomValidator.cannotContainSpace]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', [Validators.required]],
      skills: this.formBuilder.array([
        this.addSkill('', '')
      ])
    }, {
        validator: CustomValidator.confirmPassword('password', 'cnfPassword')
    });

    this.signupForm.patchValue({
      name: 'Debansu Karmakar',
    });
    this.removeSkill(0);
    this.skillData.forEach(el => {
      this.addMoreSkill(el.skill, el.description);
    });
  }

  addSkill(skill, desc) {
    return this.formBuilder.group({
      skill: [skill, [Validators.required]],
      description: [desc, Validators.required]
    })
  }

  addMoreSkill(skill, desc) {
    const control = <FormArray>this.signupForm.controls["skills"];
    control.push(this.addSkill(skill, desc));
  }

  removeSkill(index: number) {
    const control = <FormArray>this.signupForm.controls["skills"];
    control.removeAt(index);
  }

  signup() {
    console.log(this.signupForm);
  }

}
