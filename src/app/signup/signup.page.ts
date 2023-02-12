import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export interface User {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
  phone: string
  emailVerified: boolean;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  user: any;
// Envoyer les champs recuperer de la formulaire login HTML pour enregister (creation du compte) l'utilisateur
  registerUser(form) {

// utlisier la service authService pour authentifier l'utilisateur
    // on a utliser signup de firebase qui utlise seulement un login et mot de passe et il va ajouter un uid alors on a ajouter la methode addProfile
    // pour creer un profile complet 
    this.authService.RegisterUser(form)
      .then((res) => {
        console.log(form)
        this.user={
          uid:res.user.uid,
          ...form


        }
        console.log("user "+this.user)
       // on a ajouter uid aux champs des formulaire puis on a enregister les champs dans firebase pour abvoir un profile complet
        this.authService.addProfile(this.user).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (err) => {
            console.log(err)

          }
        });


        this.router.navigate(['/login'])
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}
