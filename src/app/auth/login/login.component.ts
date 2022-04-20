import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginData} from "../../core/interfaces/login-data.interface";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => {
        this.router.navigate(['/dashboard'])
        document.querySelector('#signIn')!.querySelector('.error')!.innerHTML = '';
      })
      .catch((e) =>  {
        console.log(e.message);
        document.querySelector('#signIn')!.querySelector('.error')!.innerHTML = e.message;
      });
  }

}
