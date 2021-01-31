import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, IonRadioGroup, Platform } from '@ionic/angular'
import { DataService } from '../services/data.service';
import * as L from 'leaflet';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.page.html',
  styleUrls: ['./custom-alert.page.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('false', style({
        height: '*',
      })),
      state('true', style({
        height: '0px',
      })),
      transition('* => *', animate('400ms ease-in-out')),
    ]),
    trigger('addAlertVisivoChanged', [
      state('true', style({
        height: '*',
      })),
      state('false', style({
        height: '0px',
      })),
      transition('* => *', animate('400ms ease-in-out')),
    ])
  ]
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
  checkbox_background = true;
  checkbox_nearstreet = this.dataService.getCheckboxnear_street();
  checkbox_alertOnCorsia = this.dataService.getCheckAlertOnCorsia();
  toggle_alertVisivo = this.dataService.getToggleAlertVisivo();
  display_option_alertOnCorsia = 'none'
  map: any;
  marker_position;
  marker_circle;
  radius_circle = this.dataService.getRadiusMarkerCircle();

  constructor(private backgroundMode: BackgroundMode, private tts: TextToSpeech, private dataService: DataService, private alertController: AlertController, private platform: Platform) {
    this.platform.ready().then(() => {
      this.load_data();
      var app = JSON.parse(window.localStorage.getItem('checkbox_background'));
      if (app != null)
        this.checkbox_background = app;
      if (this.checkbox_background)
        this.event_checkboxBackground(false);
    })
  }
  ionViewWillEnter() {
    var latlong: any = [43.798245080028536, 11.24322352064662]
    this.map = L.map('preview_map', { zoomControl: false, attributionControl: false }).setView(latlong, 18);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
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
    L.control.scale().addTo(this.map);
    if (this.toggle_alertVisivo)
      this.radioGroupChange(this.dataService.getSelectedFormAlert(), false)
  }
  ngOnInit() {

  }
  radioGroupChange(event, show) {
    this.dataService.setSelectedFormAlert(event);
    window.localStorage.setItem('selected_radio', JSON.stringify(this.dataService.getSelectedFormAlert()));
    this.radio_group.value = event.id;
    if (show != false)
      this.show_alert();
  }
  async sayText(txt) {
    try {
      await this.tts.speak({
        text: txt,
        locale: 'it-IT'
      })
    } catch (e) { console.log(e) }
  }
  sayAlert(address) {
    var txt = 'Sei sulla corsia riservata di ' + address;
    this.sayText(txt);
  }
  show_alert() {
    var div = '<div class="' + this.dataService.getSelectedFormAlert().div_class + '">';
    var icon = '<ion-icon name="' + this.dataService.getSelectedFormAlert().ion_icon_name + '" class="' + this.dataService.getSelectedFormAlert().ion_icon_class + '"></ion-icon>';
    var txt = 'Non sei autorizzato a transitare su questa corsia<br><div class="sub_msg">';
    var msg = this.dataService.getSelectedFormAlert().ion_icon_name == '' ? msg = div + txt : msg = div + icon + txt;
    var time = 1000;
    this.alertController.create({
      cssClass: this.dataService.getSelectedFormAlert().css_class,
      message: msg + (time + 1000) / 1000 + '</div></div>',
    }).then((alert) => {
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
  }

  alert_nearStreet() {
    this.dataService.setCheckboxnear_street(!this.checkbox_nearstreet)
    if (!this.checkbox_nearstreet)
      this.createTextAlertCheckbox('In prossimita di una corsia riservata verrai allertato tramite un segnale acustico. Puoi settare la distanza, in metri, entro cui ricevi l\'avviso');
    else
      this.createTextAlertCheckbox('Attenzione: non sarai avvertito quando se sei in prossimita di una corsia riservata');
  }
  alert_alertOnCorsia() {
    this.dataService.setCheckAlertOnCorsia(!this.checkbox_alertOnCorsia);
    if (!this.checkbox_alertOnCorsia) {
      this.createTextAlertCheckbox('Se ti trovi sopra una corsia riservata su cui non hai il premesso verrai avvertito tramite segnale acustico');
    }
    else {
      this.dataService.setToggleAlertVisivo(false);
      this.createTextAlertCheckbox('Attenzione: non sarai avvertito quando percorrerai una corsia riservata');
    }
  }
  alert_onAddAlertVisivo() {
    this.dataService.setToggleAlertVisivo(!this.toggle_alertVisivo);
    if (!this.toggle_alertVisivo) {
      this.createTextAlertCheckbox('Oltre all\'avviso acustico comparirà sullo schermo un alert per 3 secondi.\n Sotto puoi scegliere il modello di avviso e cliccando verra mostrata un\'anteprima');
      this.radioGroupChange(this.dataService.getSelectedFormAlert(), false);
    }
  }
  eventChangeRange() {
    this.marker_circle.setRadius(this.radius_circle);
    this.dataService.setRadiusMarkerCircle(this.radius_circle);
  }
  createTextAlertCheckbox(txt) {
    this.alertController.create({
      cssClass: '',
      message: '<div class=' + this.list_alert[0].div_class + '>' + txt + '</div>'
    }).then((alert) => alert.present());
  }
  event_checkboxBackground(save) {
    if (save) {
      window.localStorage.setItem('checkbox_background', JSON.stringify(!this.checkbox_background));
      if(!this.checkbox_background)
      this.createTextAlertCheckbox('Ora riceverai gli alert anche quando l\'app è in background');
    }
    if (!this.checkbox_background || !save) {
      this.backgroundMode.on('activate').subscribe(() => {
        this.backgroundMode.disableWebViewOptimizations();
      })
      this.backgroundMode.enable();
      this.backgroundMode.setDefaults({
        title: 'Corsie riservate Firenze',
        text: 'Segnalazione corsie riservate attiva',
        icon: 'icon.png',
        resume: true,
        hidden: false,
        bigText: true
      })
    }
    else {
      this.backgroundMode.disable()
    }
  }
}
