import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnonceDetailsPageRoutingModule } from './annonce-details-routing.module';

import { AnnonceDetailsPage } from './annonce-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnonceDetailsPageRoutingModule
  ],
  declarations: [AnnonceDetailsPage]
})
export class AnnonceDetailsPageModule {}
