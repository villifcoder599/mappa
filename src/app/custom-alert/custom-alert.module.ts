import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomAlertPageRoutingModule } from './custom-alert-routing.module';
import { CustomAlertPage } from './custom-alert.page';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AlertController, IonRadioGroup } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomAlertPageRoutingModule
  ],
  declarations: [CustomAlertPage],
  providers: [NativeAudio, AlertController, IonRadioGroup,  TextToSpeech, BackgroundMode],
})
export class CustomAlertPageModule { }
