import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificaPageRoutingModule } from './notifica-routing.module';

import { NotificaPage } from './notifica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificaPageRoutingModule
  ],
  declarations: [NotificaPage]
})
export class NotificaPageModule {}
