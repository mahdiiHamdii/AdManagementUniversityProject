import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './annonces-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AnnoncePage } from './annonces.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [AnnoncePage],
})
export class AnnoncesModule {}
