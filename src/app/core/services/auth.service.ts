import { Injectable } from '@angular/core';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import { LoginData } from "../interfaces/login-data.interface";
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: UserInfo[];

  auth = getAuth().onAuthStateChanged( (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.userInfo = user.providerData;
      } else {
        // User is signed out
        // ...
      }
    }
  )

  constructor() {}

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(getAuth(), email, password);
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(getAuth(), email, password);
  }

  logout() {
    return signOut(getAuth());
  }

}
