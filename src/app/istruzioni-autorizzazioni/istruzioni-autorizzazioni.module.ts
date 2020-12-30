import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IstruzioniAutorizzazioniPageRoutingModule } from './istruzioni-autorizzazioni-routing.module';

import { IstruzioniAutorizzazioniPage } from './istruzioni-autorizzazioni.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IstruzioniAutorizzazioniPageRoutingModule
  ],
  declarations: [IstruzioniAutorizzazioniPage]
})
export class IstruzioniAutorizzazioniPageModule {}
