import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}
 
 
}
