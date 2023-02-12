import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnoncesService } from 'src/app/services/annonces.service';
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
// eslint-disable-next-line max-len
//charger l'email a partir du local Storage pour utliser ulterieurement (afficher le boutton supprimer si l'utlisateur est le createur de annonce)
  // recuperer l'id de l'annonce puis le charger a partir de firebase
  ngOnInit() {
    this.userEmail = localStorage.getItem('email');
    console.log({userEmail:  this.userEmail});
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('eee => ', this.id);
    this.annonce = this.annoncesService.getAnnonceById(this.id);
    console.log({aaa: this.annonce});
    this.annoncesService.getAnnonceById(this.id).subscribe({
      next: (data) => {
        console.log({data});
        this.annonce = data;
        console.log('data', data);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
    console.log('AnnonceDetailsPage ngOnInit', this.annonce);
  }
  // supprimer l'annonce
  deleteAnnonce() {
    this.annoncesService.deleteAnnonceById(this.id).subscribe({
      next: (data) => {
        console.log('id', this.id);
        this.router.navigate(['/annonces']);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  // backButton() {
  //   console.log('backButton');
  //   this.router.navigate(['/annonces']);
  // }
}
