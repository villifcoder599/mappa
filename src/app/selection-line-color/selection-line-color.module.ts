import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectionLineColorPageRoutingModule } from './selection-line-color-routing.module';

import { SelectionLineColorPage } from './selection-line-color.page';
import{ MappaPage} from '../mappa/mappa.page'
import { MappaPageModule } from '../mappa/mappa.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectionLineColorPageRoutingModule,
    MappaPageModule
  ],
  declarations: [SelectionLineColorPage],
  providers:[MappaPage]
})
export class SelectionLineColorPageModule {}
