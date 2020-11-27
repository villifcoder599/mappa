import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { Geolocation} from '@ionic-native/geolocation/ngx'
import {HttpClientModule} from '@angular/common/http';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import{NativeAudio} from '@ionic-native/native-audio/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MappaPageRoutingModule } from './mappa-routing.module';
import { MappaPage } from './mappa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MappaPageRoutingModule,
    ExploreContainerComponentModule,
    HttpClientModule
  ],
  providers:[NativeGeocoder,Geolocation,DeviceOrientation,LocalNotifications,
    AlertController,NativeAudio,Diagnostic,LocationAccuracy],
  declarations: [MappaPage]
})
export class MappaPageModule {}
