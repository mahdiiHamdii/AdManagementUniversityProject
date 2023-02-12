import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnoncesService } from 'src/app/services/annonces.service';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.page.html',
  styleUrls: ['./add-annonce.page.scss'],
})
export class AddAnnoncePage implements OnInit {
  annonce: any;
  userEmail: string;
  constructor(
    private annoncesService: AnnoncesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userEmail = window.localStorage.getItem('email');
  }
  addAnnonce(formValue: any) {
    //get Storage User.username

    this.annonce = { createdBy: this.userEmail, ...formValue };
    console.log(this.annonce)
    return this.annoncesService.addAnnonce(this.annonce).subscribe({
      next: (data) => {
        console.log('data', data);
        this.router.navigate(['annonces']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
