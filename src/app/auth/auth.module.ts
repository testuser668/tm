import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule} from "@angular/forms";
import { LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
