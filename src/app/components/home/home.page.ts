import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) { }

  // Navigate to the login page
  gotoLoginPage() {
    this.router.navigate(['login']);
  }

  // Navigate to the signup page
  gotoRegisterPage(){
    this.router.navigate(['signup']);
  }
}
