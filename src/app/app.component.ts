import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private lottiesplashScreen: LottieSplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.lottiesplashScreen.show();
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      // setTimeout(()=>{
      //   this.lottiesplashScreen.hide();
      // },100000);
    });
  }
}
