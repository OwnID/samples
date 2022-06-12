import { Component, OnInit } from '@angular/core';
import {InlineWidgetVariants, WidgetType} from "@ownid/angular";
import {HttpRequestService} from "../../services/http-request.service";
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

  constructor(private httpService: HttpRequestService, private router: Router,formBuilder: FormBuilder) {
    this.userForm = formBuilder.group(
      {
        email: [null, [Validators.required]],
        password: [null, [Validators.required]],
      },
      {updateOn: 'change'});
  }


  ngOnInit(): void {
  }

  onLogin() {
    this.router.navigateByUrl('/account');
  }

  onSubmit() {
    this.httpService.signInUser(this.userForm.get('email')?.value, this.userForm.get('password')?.value)
      .subscribe({
        next: (data) => {
          if(data.logged) {
            this.onLogin()
          } else {
            alert(data.error);
          }
        },
        error: (err) => console.error(err),
      })
  }
}
