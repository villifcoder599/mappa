import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IstruzioniAutorizzazioniPageRoutingModule } from './istruzioni-autorizzazioni-routing.module';

import { IstruzioniAutorizzazioniPage } from './istruzioni-autorizzazioni.page';
//import { DataService } from '../services/data.service'
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IstruzioniAutorizzazioniPageRoutingModule
  ],
  declarations: [IstruzioniAutorizzazioniPage],
  providers:[TextToSpeech]
})
export class IstruzioniAutorizzazioniPageModule {}
