import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authservice: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {}
  loginFireauth(value) {
    this.authservice
      .loginFireauth(value)
      .then((res) => {
        // Do something here
        this.router.navigate(['/annonces']);
        console.log(res);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
