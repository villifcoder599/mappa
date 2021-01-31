import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
  ],
  declarations: [DetailsPage],
  providers:[TextToSpeech]
})
export class DetailsPageModule {}
