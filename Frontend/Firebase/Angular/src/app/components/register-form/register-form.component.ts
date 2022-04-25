import { Component, OnInit } from '@angular/core';
import {createUserWithEmailAndPassword,getAuth} from 'firebase/auth';
import {Router} from "@angular/router";
import { OwnidAngularService, WidgetType } from '@ownid/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  register: WidgetType = WidgetType.Register;
  loginIdField: string | undefined;
  passwordField: string | undefined;
  ownIDData: string | undefined;
  userForm: FormGroup;

  constructor(private router: Router, private ownidAngularService: OwnidAngularService,formBuilder: FormBuilder) {
    this.userForm = formBuilder.group(
      {
        email: [null, [Validators.required]],
        password: [null, [Validators.required]],
      },
      { updateOn: 'change' });
  }

  ngOnInit(): void {
  }

  onRegister(ownIdData: string) {
    this.ownIDData = ownIdData;
  }

  onSubmit() {
    createUserWithEmailAndPassword(getAuth(), this.userForm.get('email')?.value, this.userForm.get('password')?.value)
      .then(async () => {
        //Enroll device with OwnID
        await this.ownidAngularService.enrollDevice();
        this.router.navigateByUrl('/login')
      })
      .catch(err => alert(err));
  }
}
