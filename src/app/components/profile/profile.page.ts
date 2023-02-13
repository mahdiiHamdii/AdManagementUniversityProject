import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from '../../services/annonces.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userEmail='';
  name = '';
  user: any;
  listAnnonces =[];
  constructor( private announceService: AnnoncesService, private authService: AuthService) { }


  ngOnInit() {
   this.userEmail= window.localStorage.getItem('email');
   this.getAnnocesByEmail();
  }

  getAnnocesByEmail(){
    this.announceService.getAllAnnonces().subscribe({
      next: (data) => {
        this.listAnnonces = [];
        for (const key in data) {
          if(data[key].createdBy === this.userEmail){
            data[key].id = key;
            this.listAnnonces.push(data[key]);
          }
        }
      },
    });
  }

}
