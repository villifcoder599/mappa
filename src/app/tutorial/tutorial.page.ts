import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
/*
  slide1->Intro app cosa fa
  slede2->esempio corsia riservata sulla mappa CSS-> border-radius:5%; magin 50px 0 0
  slide3->alert e notifiche
  slide4->Centro notifiche
*/
export class TutorialPage {
  constructor(private platform: Platform, private router: Router) {
    this.platform.ready().then(() => {
        var slides = document.querySelector('ion-slides');
        slides.options = {
          initialSlide: 0,
          speed: 400,
          zoom: false,
      }
    })
  }
  readyToPlay() {
    window.localStorage.setItem('tutorial', JSON.stringify(true));
    this.router.navigateByUrl('/tabs/mappa');
  }

  ionViewDidEnter() {

  }
}
