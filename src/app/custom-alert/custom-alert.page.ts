import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AlertController, IonRadioGroup, Platform } from '@ionic/angular'
import { DataService } from '../services/data.service';
import * as L from 'leaflet';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx'

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
    ion_icon_name: '',
  }, {
    id: 1,
    name: 'Divieto accesso',
    css_class: 'container',
    div_class: "text " + 'msg_custom',
    ion_icon_class: 'alert',
    ion_icon_name: 'alert',
  }, {
    id: 2,
    name: 'Quadrato',
    css_class: 'rounded-2-class',
    div_class: 'msg_custom',
    ion_icon_class: 'alert',
    ion_icon_name: 'alert',
  }];
  count; //non mostro subito la preview dell'alert e lo iniz. a -1
  checkbox_closestreet = this.dataService.getCheckboxclose_street();
  checkbox_ecoMode = this.dataService.getCheckBoxEcoMode();
  map: any;
  marker_position;
  marker_circle;
  radius_circle = this.dataService.getRadiusMarkerCircle();
  constructor(private tts: TextToSpeech, private dataService: DataService, private alertController: AlertController, private nativeAudio: NativeAudio, private platform: Platform) {
    this.platform.ready().then(() => {
      console.log(this.checkbox_closestreet)
      this.nativeAudio.preloadSimple('notification_sound', 'assets/sounds/notification_sound.mp3');
      this.load_data();
    })
  }
  ionViewWillEnter() {
    this.radioGroupChange(this.dataService.getSelectedFormAlert())
    var latlong: any = [43.798245080028536, 11.24322352064662]
    this.map = L.map('preview_map', { zoomControl: false, attributionControl: false }).setView(latlong, 18);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    var navIcon = L.icon({
      iconUrl: 'https://medall.in/assets/img/map/current_marker_full.png',
      iconSize: [26, 26],
      iconAnchor: [13, 13], // point of the icon which will correspond to marker's location
    });
    this.marker_position = L.marker(latlong, { icon: navIcon }).addTo(this.map);
    this.marker_circle = L.circle(latlong, {
      radius: this.radius_circle,
      stroke: false,
      color: '#1275ff',
    }).addTo(this.map);
    L.control.scale().addTo(this.map)
  }
  click_item(e) {
    console.log('click');
    console.log(e)
  }
  ngOnInit() {

  }
  radioGroupChange(event) {
    this.dataService.setSelectedFormAlert(event);
    window.localStorage.setItem('selected_radio', JSON.stringify(this.dataService.getSelectedFormAlert()));
    this.radio_group.value = event.id;
    this.show_alert();
  }
  async sayText(txt) {
    try {
      await this.tts.speak({
        text: txt,
        locale: 'it-IT'
      })
    } catch (e) { alert(e) }
  }
  show_alert() {
    //console.log(this.dataService.getSelectedFormAlert())
    
    var div = '<div class="' + this.dataService.getSelectedFormAlert().div_class + '">';
    var icon = '<ion-icon name="' + this.dataService.getSelectedFormAlert().ion_icon_name + '" class="' + this.dataService.getSelectedFormAlert().ion_icon_class + '"></ion-icon>';
    var txt = 'Non sei autorizzato a transitare su questa corsia<br><div class="sub_msg">';
    var msg = this.dataService.getSelectedFormAlert().ion_icon_name == '' ? msg = div + txt : msg = div + icon + txt;
    var time = 1000;
    this.alertController.create({
      cssClass: this.dataService.getSelectedFormAlert().css_class,
      message: msg + (time + 1000) / 1000 + '</div></div>',
    }).then((alert) => {
      //this.sayText('Sei su una corsia riservata');
      //this.nativeAudio.play('notification_sound');
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
  load_data() {
    var app = JSON.parse(window.localStorage.getItem('selected_radio'));
    if (app != null)
      this.dataService.setSelectedFormAlert(app);
    else
      this.dataService.setSelectedFormAlert(this.list_alert[0]);
    console.log(this.dataService.getSelectedFormAlert());
  }
  save_data_checkbox() {
    window.localStorage.setItem('checkboxclose_street', JSON.stringify(this.checkbox_closestreet));
    window.localStorage.setItem('checkbox_ecoMode', JSON.stringify(this.checkbox_ecoMode));
  }
  alert_closeStreet() {
    if (!this.checkbox_closestreet.isChecked)
      this.createTextAlertCheckbox('In prossimita di una corsia riservata verrai avvisato tramite un segnale acustico. Sotto puoi settare il raggio, misurato in metri, entro cui essere avvisato')
  }
  alert_ecoMode() {
    //console.log(this.dataService.getCheckBoxEcoMode())
    if (!this.checkbox_ecoMode.isChecked)
      this.createTextAlertCheckbox('Dimunuisce la precisione di localizzazione dell\'applicazione ma viene limitato il consumo di dati e batteria');
  
  }
  eventChangeRange() {
    console.log(this.radius_circle);
    this.marker_circle.setRadius(this.radius_circle);
    this.dataService.setRadiusMarkerCircle(this.radius_circle);
  }
  createTextAlertCheckbox(txt) {
    this.alertController.create({
      cssClass: '',
      message: '<div class=' + this.list_alert[0].div_class + '>' + txt + '</div>'
    }).then((alert) => alert.present());
  }
}
