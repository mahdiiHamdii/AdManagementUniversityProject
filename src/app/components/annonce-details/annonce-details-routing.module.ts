import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnonceDetailsPage } from './annonce-details.page';

const routes: Routes = [
  {
    path: '',
    component: AnnonceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnonceDetailsPageRoutingModule {}
