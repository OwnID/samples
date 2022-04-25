import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountComponent } from './components/account/account.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {OwnidAngularModule} from "@ownid/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpRequestService} from "./services/http-request.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        OwnidAngularModule.forRoot({appId: '{app_id}'}),
        FormsModule,
        ReactiveFormsModule,
    ],
  providers: [HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
