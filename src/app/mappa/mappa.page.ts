import { Component, Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

/*TODO list:
  0)Velocizzare app su tel
  0.1)Audio non funziona
  0.2)Caricare solo mappa Italia
  1.1)ionic cordova build ios/android --prod
  2)inserire notifiche nell tab
  Prelevare tags da mappe e metterli su details 
  3)Disabilitare autofocus su nav quando faccio uno swipe sul tel.
  4)Possibilita effetturare rotazione mappa e riallineare con bussola o con navigatore
*/
@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.page.html',
  styleUrls: ['./mappa.page.scss'],
})

export class MappaPage {
  init = false;
  map = null;
  marker_circle: any;
  marker_position: any;
  latlong: any;
  osm_id = 0;
  accuracy = 20;
  degrees: number;
  autoriz_user = [];
  tags_name = ["bus_urb", "bus_extra", "hand", "taxi", "ncc", "pol_socc", "ff_armate", "mezzi_op", "autorizz", "deroga", "soccorso", "porta_telematica"];

  constructor(private locationAccuracy: LocationAccuracy, private diagnostic: Diagnostic, private nativeAudio: NativeAudio, private localNotifications: LocalNotifications, private alertController: AlertController, private deviceOrientation: DeviceOrientation, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private http: HttpClient, private platform: Platform) {
    this.latlong = [43.7996269, 11.2438267];
    this.marker_circle = L.circleMarker(this.latlong, {
      radius: this.accuracy,
      stroke: false,
      color: '#1275ff',
    });
    var icon_path = 'https://cdn3.iconfinder.com/data/icons/glypho-travel/64/gps-navi-arrow-512.png';
    var navIcon = L.icon({
      iconUrl: icon_path,
      iconSize: [26, 26], // size of the icon
      iconAnchor: [13, 13], // point of the icon which will correspond to marker's location
    });
    this.marker_position = L.marker(this.latlong, { icon: navIcon });
    this.autoriz_user.length = this.tags_name.length;
    for (var i = 0; i < this.autoriz_user.length; i++) {
      this.autoriz_user[this.tags_name[i]] = 0;
    }
    this.autoriz_user['hand'] = 1;
    this.osm_id = 2361804077;
    //2361807728->autorizzato
    //2361804077->non autorizzato
  }
  ionViewDidEnter() {
    if (!this.init) {
      this.showMap();
      this.enable_device_orientation();
    }
    this.nativeAudio.preloadSimple('notification_sound', 'assets/sounds/notification_sound.mp3');
    this.init = true;
  }
  requestAccuracy() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => { },
          () => { this.location_enable_manually("Non è stato possibile attivare automaticamente la posizione"); });
      }
      else { this.location_enable_manually("Richiesta di attivazione localizzazione rifiutata"); }
    });
  }
  location_enable_manually(message) {
    this.alertController.create({
      header: message,
      buttons: [{
        text: 'Annulla'
      }, {
        text: 'Apri impostazioni',
        handler: () => {
          this.diagnostic.switchToLocationSettings();
        }
      }]
    }).then((alert) => alert.present());
  }

  show_alert_foreground() {
    var msg = '<div class="msg"> <ion-icon class="alert" name="alert"></ion-icon> Non sei autorizzato a transitare su questa corsia<br><div class="sub_msg">';
    var time = 2000;
    this.alertController.create({
      cssClass: 'my-custom-class',
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
      }, 1000);
    });
  }
  showMap() {
    this.map = L.map('myMap', { zoomControl: false, attributionControl: false }).setView([this.latlong[0], this.latlong[1]], 17);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      maxZoom: 18,
      minZoom: 1,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoidmlsbGlmY29kZXIiLCJhIjoiY2toNnFvdzIzMDV0bDJxcnRncnc1dmtpdSJ9.cjTkQIoO0eDAX3_Z-ReuxA'
    }).addTo(this.map);
    /*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);*/ 
    this.watch_Position();
    this.reverse_coords();
    this.marker_circle.addTo(this.map);
    this.marker_position.addTo(this.map);
  }

  watch_Position() {
    navigator.geolocation.watchPosition((position => {
      console.log("click");
      this.latlong = [position.coords.latitude, position.coords.longitude];
      this.accuracy = position.coords.accuracy > 15 ? this.accuracy : 15;
      this.geolocation.getCurrentPosition;
      this.marker_position.setLatLng(this.latlong);
      this.marker_circle.setLatLng(this.latlong);
      this.marker_circle.setRadius(this.accuracy);
    }), (error => {
      alert('Alert_code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }), { enableHighAccuracy: true });
  }
  getPosition(){
    this.map.setView(this.latlong);
  }
  reverse_coords() {
    setInterval(() => {
      fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.latlong[0] + '&lon=' + this.latlong[1])
        .then((response) => response.json())
        .then((json) => {
          if (this.osm_id != json.osm_id) {
            this.osm_id = json.osm_id;
            this.check_street();
          }
        })
    }, 5000);
  }
  check_street() {
    fetch("assets/docs/corsie_riservate.gpx").then(res => res.json()).then(json => {
      var find_corsia = this.find_corsia_riservata(json.corsie_riservate);
      if (find_corsia[0]) {
        if (!this.check_autorizzazione(json.corsie_riservate[find_corsia[1]].tags)) {
          this.show_alert_foreground();
        }
      }
    });
  }
  //confronto strada che sto percorrendo con database corsie_riservate
  find_corsia_riservata(corsie_riservate) {
    var m = 0, l = 0, r = corsie_riservate.length;
    while (l <= r) {
      m = ((l + r) / 2) >> 0; //cancello il resto
      if (corsie_riservate[m].pk_corsia == this.osm_id)
        return [true, m];
      if (corsie_riservate[m].pk_corsia < this.osm_id)
        l = m + 1;
      else
        r = m - 1;
    }
    return false;
  }

  //cerco se l'utente ha un autorizzazione per la corsia riservata
  check_autorizzazione(tags = []) {
    var found = false;
    for (var i = 0; i < this.autoriz_user.length && !found; i++) {
      if (this.autoriz_user[this.tags_name[i]] == 1 && tags[this.tags_name[i]] == 1)
        found = true;
    }
    return found;
  }
  //Ruota marker_position in base a dove punta il telefono
  async enable_device_orientation() {
    this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
        this.degrees = data.trueHeading;
        this.marker_position.setRotationAngle(this.degrees);
      }
    );
  }
  delta = 0.0001;
  up() {
    this.latlong[0] = this.latlong[0] + this.delta;
    this.watch_Position();
  }
  down() {
    this.latlong[0] = this.latlong[0] - this.delta;
    this.watch_Position();
  }
  left() {
    this.latlong[1] = this.latlong[1] - this.delta;
    this.watch_Position();
  }
  right() {
    this.latlong[1] = this.latlong[1] + this.delta;
    this.watch_Position();
  }
}
