import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountComponent } from './components/account/account.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {OwnidAngularModule} from "@ownid/angular";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {initializeApp} from 'firebase/app'
import {getAuth,getIdToken,signInWithCustomToken} from 'firebase/auth'

const firebaseConfig = {
  //Firebase config goes here
};
initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwnidAngularModule.forRoot(
      {
        appId: '{app_id}',
        sdk: 'firebase',
        firebaseAuth: {getAuth, getIdToken, signInWithCustomToken}
      }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
