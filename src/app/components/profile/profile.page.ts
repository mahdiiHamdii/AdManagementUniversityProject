import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from '../../services/annonces.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userEmail = '';
  name = '';
  uid = '';
  user: any;
  listAnnonces = [];

  constructor(private announceService: AnnoncesService, private authService: AuthService) {}

  ngOnInit() {
    // Retrieve email and uid from local storage
    this.userEmail = window.localStorage.getItem('email');
    this.uid = window.localStorage.getItem('uid');

    // Call the service method to fetch user details using the UID
    this.authService.getUserDetailsByUid(this.uid).subscribe({
      next: (userData) => {
        if (userData) {
          // Handle the retrieved user details here
          console.log(userData);
          console.log(typeof userData);
          this.user = userData; // Assign retrieved user data to the 'user' property
        } else {
          console.log('User not found.');
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
    });

    // Fetch announcements by user email
    this.getAnnocesByEmail();
  }

  getAnnocesByEmail() {
    this.announceService.getAllAnnonces().subscribe({
      next: (data) => {
        this.listAnnonces = [];
        for (const key in data) {
          if (data[key].createdBy === this.userEmail) {
            data[key].id = key;
            this.listAnnonces.push(data[key]);
          }
        }
      },
    });
  }
}
