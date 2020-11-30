import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import{ MappaPage} from '../mappa/mappa.page'
import { MappaPageModule } from '../mappa/mappa.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    MappaPageModule
  ],
  declarations: [DetailsPage],
  providers:[MappaPage]
})
export class DetailsPageModule {}
