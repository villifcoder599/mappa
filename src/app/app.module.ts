import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import{HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { IonicGestureConfig } from './utils/IonicGestureConfig'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, BrowserAnimationsModule],
  providers: [
    StatusBar,
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig},
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ,Geolocation,
  NativeGeocoder,
  LottieSplashScreen,
  HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
