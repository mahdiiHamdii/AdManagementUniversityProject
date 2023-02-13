import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AddAnnoncePage } from './add-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: AddAnnoncePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAnnoncePageRoutingModule {}
