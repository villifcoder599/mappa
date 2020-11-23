import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { HomePageRoutingModule } from './home-routing.module';
import { Geolocation} from '@ionic-native/geolocation/ngx'
import {HttpClientModule} from '@angular/common/http';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import{NativeAudio} from '@ionic-native/native-audio/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  providers:[NativeGeocoder,Geolocation,DeviceOrientation,LocalNotifications,
            AlertController,NativeAudio,Diagnostic,LocationAccuracy],
  declarations: [HomePage]
})
export class HomePageModule {}
