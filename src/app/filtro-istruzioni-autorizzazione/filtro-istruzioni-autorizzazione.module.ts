import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroIstruzioniAutorizzazionePageRoutingModule } from './filtro-istruzioni-autorizzazione-routing.module';

import { FiltroIstruzioniAutorizzazionePage } from './filtro-istruzioni-autorizzazione.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroIstruzioniAutorizzazionePageRoutingModule
  ],
  declarations: [FiltroIstruzioniAutorizzazionePage]
})
export class FiltroIstruzioniAutorizzazionePageModule {}
