import { Component, OnInit } from '@angular/core';
import {InlineWidgetVariants, WidgetType} from "@ownid/angular";
import {signInWithEmailAndPassword,getAuth} from "firebase/auth";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  widgetOptions = { variant: InlineWidgetVariants.ButtonFingerprint, infoTooltip: true };
  login: WidgetType = WidgetType.Login;
  loginIdField: string | undefined;
  passwordField: string | undefined;
  userForm: FormGroup;

  constructor(private router: Router,formBuilder: FormBuilder) {
    this.userForm = formBuilder.group(
      {
        email: [null, [Validators.required]],
        password: [null, [Validators.required]],
      },
      { updateOn: 'change' });
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.router.navigateByUrl('/account');
  }

  onSubmit() {
    signInWithEmailAndPassword(getAuth(),this.userForm.get('email')?.value, this.userForm.get('password')?.value)
      .then(() => this.onLogin())
      .catch(err => alert(err))
  }
}
