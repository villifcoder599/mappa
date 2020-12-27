import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AlertController, IonRadioGroup, Platform } from '@ionic/angular'
@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.page.html',
  styleUrls: ['./custom-alert.page.scss'],
})
export class CustomAlertPage {
  @ViewChild('radio_gruppo') radio_group: IonRadioGroup;
  list_alert = [{
    id: 0,
    name: 'Default',
    css_class: '',
    div_class: 'msg_custom',
    ion_icon_class: '',
    ion_icon_name: ''

  }, {
    id: 1,
    name: 'Divieto accesso',
    css_class: 'container',
    div_class: "text " + 'msg_custom',
    ion_icon_class: 'alert',
    ion_icon_name: 'alert'
  }, {
    id: 2,
    name: 'Quadrato',
    css_class: 'rounded-2-class',
    div_class: 'msg_custom',
    ion_icon_class: 'alert',
    ion_icon_name: 'alert'
  }];
  selected_radio = this.list_alert[0];
  count; //non mostro subito la preview dell'alert e lo iniz. a -1
  constructor(private alertController: AlertController, private nativeAudio: NativeAudio, private platform: Platform) {
    this.platform.ready().then(() => {
      var app = JSON.parse(window.localStorage.getItem('selected_radio'));
      if (app != null)
        this.selected_radio = app;
      this.nativeAudio.preloadSimple('notification_sound', 'assets/sounds/notification_sound.mp3');
    })

    //this.radio_group.value = this.selected_radio;
  }
  ionViewDidEnter() {
    this.count = -1;
    var app = JSON.parse(window.localStorage.getItem('selected_radio'));
    if (app != null)
      this.selected_radio = app;
    this.radio_group.value = this.selected_radio;
  }
  ngOnInit() {

  }
  radioGroupChange(event) {
    this.selected_radio = this.list_alert[event.detail.value.id];
    window.localStorage.setItem('selected_radio', JSON.stringify(this.selected_radio));
    this.radio_group.value = this.selected_radio;
    if (this.count > 0)
      this.show_alert();
    else
      this.count++;
  }
  show_alert() {
    var div = '<div class="' + this.selected_radio.div_class + '">';
    var icon = '<ion-icon name="' + this.selected_radio.ion_icon_name + '" class="' + this.selected_radio.ion_icon_class + '"></ion-icon>';
    var txt = 'Non sei autorizzato a transitare su questa corsia<br><div class="sub_msg">';
    var msg = this.selected_radio.ion_icon_name == '' ? msg = div + txt : msg = div + icon + txt;
    var time = 100000;
    this.alertController.create({
      cssClass: this.selected_radio.css_class,
      message: msg + (time + 1000) / 1000 + '</div></div>',
    }).then((alert) => {
      this.nativeAudio.play('notification_sound');
      alert.present();
      var intervall = setInterval(() => {
        alert.message = msg + time / 1000 + '</div></div>';
        if (time == 0) {
          alert.remove();
          clearInterval(intervall);
        }
        time = time - 1000;
      }, time);
    });
  }
}
