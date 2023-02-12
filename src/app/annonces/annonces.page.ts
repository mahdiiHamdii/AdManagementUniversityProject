import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnoncesService } from '../services/annonces.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'annonces.page.html',
  styleUrls: ['annonces.page.scss'],
})
export class AnnoncePage implements OnInit {
   // dans la page home on va utliser les segments et les slides pour afficher dans chaque slide
  // des differents interfaces comme tout les annonces ou bien les annonces d'utlisateur connecté

  @ViewChild('slides', { static: true }) slider: IonSlides;
  listAnnoncesPlats = [];
  listAnnoncesBoissons = [];
  segment = 0;
  userEmail: string;
  user: any;

  constructor(
    private announceService: AnnoncesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userserv: AuthService
  ) {}
  // cette methode va capturer le changement du segment
  // pour changer le contenu
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    if(this.segment === 0){
      this.getAnnocesByBoissons();
    } else {
      this.getAnnocesByPlats();
    }
  }

  getAnnocesByBoissons(){
    return this.announceService.getAllAnnonces().subscribe({
      next: (data) => {
        this.listAnnoncesBoissons = [];
        for (const key in data) {
          if(data[key].category === 'Boissons'){
            data[key].id = key;
            this.listAnnoncesBoissons.push(data[key]);
          }
        }
      },
    });
  }
  getAnnocesByPlats(){
    return this.announceService.getAllAnnonces().subscribe({
      next: (data) => {
        this.listAnnoncesPlats = [];
        for (const key in data) {
          if(data[key].category === 'Plats'){
            data[key].id = key;
            this.listAnnoncesPlats = [...this.listAnnoncesPlats, data[key]];
          }
        }
      },
    });
  }
  ngOnInit() {
    this.userEmail = window.localStorage.getItem('email');
    console.log('AnnoncePage ngOnInit');
    this.getAnnocesByBoissons();
    this.getAnnocesByPlats();
  }
  seeDetails(id) {
    console.log('ID/', id);
    this.router.navigate(['/annonce-details', id]);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignOut() {
    return this.userserv.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
