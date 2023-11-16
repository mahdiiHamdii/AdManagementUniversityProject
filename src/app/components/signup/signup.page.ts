// This TypeScript file is a component responsible for user signup

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Interface representing user details
export interface User {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
  phone: string;
  emailVerified: boolean;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  // Method to register a new user
  registerUser(form) {
    this.authService.registerUser(form)
      .then((res) => {
        // After successful registration, create user object and add profile
        this.user = {
          uid: res.user.uid,
          ...form
        };

        // Subscribe to the profile addition service
        this.authService.addProfile(this.user).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log({ err });
          }
        });

        // Navigate to the login page after successful registration
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Handle registration error
        window.alert(error.message);
      });
  }
}
