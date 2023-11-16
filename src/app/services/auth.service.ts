import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Placeholder method not implemented
  getUser(UserMail: string) {
    throw new Error('Method not implemented.');
  }

  ngFireAuth: any;

  constructor(public auth: AngularFireAuth, private httpClient: HttpClient) { }

  // Authenticates users with email and password, saves email and UID to localStorage
  loginFireauth(value) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password).then(
        res => {
          resolve(res);
          window.localStorage.removeItem('email');
          window.localStorage.setItem('email', res.user.email);
          window.localStorage.setItem('uid', res.user.uid);
        },
        error => reject(error)
      )
    });
  }

  // Registers a new user with email and password
  registerUser(form) {
    return this.auth.createUserWithEmailAndPassword(form.email, form.password);
  }

  // Adds user profile data to the Firebase Realtime Database
  addProfile(user): Observable<any> {
    return this.httpClient.post('https://articlesmanagement-cbe66-default-rtdb.europe-west1.firebasedatabase.app/users.json', user);
  }

  // Retrieves user details by UID from the Firebase Realtime Database
  getUserDetailsByUid(uid: string) {
    const userUrl = `https://articlesmanagement-cbe66-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="uid"&equalTo="${uid}"`;
    return this.httpClient.get<any>(userUrl);
  }
}
