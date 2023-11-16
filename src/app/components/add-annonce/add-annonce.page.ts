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
    // Retrieve the user's email from local storage
    this.userEmail = window.localStorage.getItem('email');
  }

  // Method to add an announcement
  addAnnonce(formValue: any) {
    // Combine the user's email with the form values
    this.annonce = { createdBy: this.userEmail, ...formValue };
    console.log(this.annonce);

    // Subscribe to the service method to add an announcement
    return this.annoncesService.addAnnonce(this.annonce).subscribe({
      next: (data) => {
        console.log('data', data);
        // Redirect to the announcements page and refresh the window
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
