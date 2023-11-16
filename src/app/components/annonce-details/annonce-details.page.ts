import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnoncesService } from 'src/app/services/annonces.service';
import * as cors from 'cors';

const corsMiddleware = cors();

// Use corsMiddleware before making requests

@Component({
  selector: 'app-annonce-details',
  templateUrl: './annonce-details.page.html',
  styleUrls: ['./annonce-details.page.scss'],
})
export class AnnonceDetailsPage implements OnInit {
  id: any;
  annonce: any;
  userEmail: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private annoncesService: AnnoncesService
  ) {}

  // Load the email from local storage to use later (display the delete button if the user is the creator of the announcement)
  // Retrieve the ID of the announcement and then load it from Firebase
  ngOnInit() {
    console.log("start");
    
    // Retrieve user's email from local storage
    this.userEmail = localStorage.getItem('email');
    console.log({ userEmail: this.userEmail });

    // Retrieve the ID from the URL parameters
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID => ', this.id);

    // Fetch the announcement details using the ID
    this.annonce = this.annoncesService.getAnnonceById(this.id);
    console.log({ annonce: this.annonce });

    // Subscribe to the announcement details fetched
    this.annoncesService.getAnnonceById(this.id).subscribe({
      next: (data) => {
        console.log({ data });
        this.annonce = data;
        console.log('data', data);
      },
      error: (error) => {
        console.log('error', error);
      },
    });

    console.log('AnnonceDetailsPage ngOnInit', this.annonce);
  }

  // Delete the announcement
  deleteAnnonce() {
    this.annoncesService.deleteAnnonceById(this.id).subscribe({
      next: (data) => {
        console.log('Deleted announcement ID', this.id);
        this.router.navigate(['/annonces']);
      },
      error: (error) => {
        console.log('Error deleting announcement', error);
      },
    });
  }
}
