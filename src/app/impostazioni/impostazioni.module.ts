import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpostazioniPageRoutingModule } from './impostazioni-routing.module';
import { ImpostazioniPage } from './impostazioni.page';
import {CustomAlertPage} from '../custom-alert/custom-alert.page'
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpostazioniPageRoutingModule
  ],
  declarations: [ImpostazioniPage],
  providers:[CustomAlertPage,BackgroundMode,TextToSpeech]
})
export class ImpostazioniPageModule {}
