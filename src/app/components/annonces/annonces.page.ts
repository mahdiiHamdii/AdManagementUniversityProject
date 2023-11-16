import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnoncesService } from '../../services/annonces.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'annonces.page.html',
  styleUrls: ['annonces.page.scss'],
})
export class AnnoncePage implements OnInit {
  // Using segments and slides to display different interfaces in each slide

  @ViewChild('slides', { static: true }) slider: IonSlides;
  listAnnoncesNutrition = [];
  listAnnoncesExercises = [];
  segment = 0;
  userEmail: string;
  user: any;

  constructor(
    private announceService: AnnoncesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userserv: AuthService
  ) {}

  // This method captures segment change to update the content
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  // This method listens for slide change
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    if (this.segment === 0) {
      this.getAnnocesByNutrition();
    } else {
      this.getAnnocesByExerice();
    }
  }

  // Retrieve announcements by nutrition category
  getAnnocesByNutrition() {
    return this.announceService.getAllAnnonces().subscribe({
      next: (data) => {
        this.listAnnoncesNutrition = [];
        for (const key in data) {
          if (data[key].category === 'Nutrition') {
            data[key].id = key;
            this.listAnnoncesNutrition.push(data[key]);
          }
        }
      },
    });
  }

  // Retrieve announcements by exercises category
  getAnnocesByExerice() {
    return this.announceService.getAllAnnonces().subscribe({
      next: (data) => {
        this.listAnnoncesExercises = [];
        for (const key in data) {
          if (data[key].category === 'Exercices') {
            data[key].id = key;
            this.listAnnoncesExercises = [...this.listAnnoncesExercises, data[key]];
          }
        }
      },
    });
  }

  ngOnInit() {
    this.userEmail = window.localStorage.getItem('email');
    console.log('AnnoncePage ngOnInit');
    this.getAnnocesByNutrition();
    this.getAnnocesByExerice();
  }

  // Redirect to announcement details page
  seeDetails(id) {
    console.log('ID/', id);
    this.router.navigate(['/annonce-details', id]);
  }

  // Sign out the user and navigate to home
  SignOut() {
    return this.userserv.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
