import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUser(UserMail: string) {
    throw new Error('Method not implemented.');
  }

  ngFireAuth: any;

  // pour authentifier nos utlisateur on utliser AngularFireAuth
  // puisqu'il contient plusieurs fonctions prédéfini
  /**
   * signInWithEmailAndPassword: Authentifier avec username et password : puis on ajoute email au localStorage pour utliser ulterieurement
   * createUserWithEmailAndPassword: creer un utilisateur avec un mot de passe et email
   * c'est pour quoi on a ajouter la methode addProfile pour ajouter d'autre champs a l'utilisateur
   */
  constructor(public auth: AngularFireAuth, private httpClient: HttpClient) { }


  loginFireauth(value) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password).then(


        res => {
          resolve(res)
          window.localStorage.removeItem('email');
          window.localStorage.setItem('email', res.user.email)
        }
        ,
        error => reject(error)
      )
    })
  }





  registerUser(form) {
    return this.auth.createUserWithEmailAndPassword(form.email, form.password);

  }

  addProfile(user): Observable<any> {
    return this.httpClient.post('https://gestion-des-annonces-default-rtdb.europe-west1.firebasedatabase.app/users.json', user)
  }


}
