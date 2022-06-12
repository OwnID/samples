import { Component, OnInit } from '@angular/core';
import {HttpRequestService} from "../../services/http-request.service";
import {Router} from "@angular/router";
import {InlineWidgetVariants, WidgetType} from "@ownid/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  widgetOptions = { variant: InlineWidgetVariants.ButtonFingerprint, infoTooltip: true };
  register: WidgetType = WidgetType.Register;
  loginIdField: string | undefined;
  passwordField: string | undefined;
  ownIDData: string | undefined;
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

  onRegister(ownIdData: string) {
    this.ownIDData = ownIdData;
  }

  onSubmit() {
    this.httpService.registerUser(this.userForm.get('email')?.value, this.userForm.get('password')?.value
      ,this.ownIDData || '')
      .subscribe({
        next: (data) => {
          if(data.created) {
            this.router.navigateByUrl('/login')
          } else {
            alert(data.error);
          }
        },
        error: (err) => console.error(err),
      })
  }
}
