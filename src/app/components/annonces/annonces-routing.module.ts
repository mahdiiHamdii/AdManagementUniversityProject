import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAnnoncePage } from '../add-annonce/add-annonce.page';
import { AnnoncePage } from './annonces.page';

const routes: Routes = [
  {
    path: '',
    component: AnnoncePage,
  },
  {
    path: 'add',
    component: AddAnnoncePage,
  },
  {
    path: 'add-annonce',
    loadChildren: () =>
      import('../add-annonce/add-annonce.module').then(
        (m) => m.AddAnnoncePageModule
      ),
  },
  {
    path: 'annonce-details/:id',
    loadChildren: () =>
      import('../annonce-details/annonce-details.module').then(
        (m) => m.AnnonceDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
