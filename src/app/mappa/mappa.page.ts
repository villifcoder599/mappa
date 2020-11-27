import { Component } from '@angular/core';
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
  1)Carcare solo mappa Italia
  2)Disabilitare autofocus su nav quando faccio uno swipe sul tel.
  3)Possibilita effetturare rotazione mappa e riallineare con bussola o con navigatore
*/
@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.page.html',
  styleUrls: ['./mappa.page.scss'],
})
export class MappaPage {
  map=null;
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
    this.showMap();
    this.nativeAudio.preloadSimple('notification_sound', 'assets/sounds/notification_sound.mp3');
    this.enable_device_orientation();

  }
  test_html() {
    this.alertController.create({
      message: '<ion-icon name="pin"></ion-icon> Questa app necessita della posizione. \n Vuoi abilitare la localizzazione?',
      cssClass: 'custom_class',
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

  async show_alert_foreground() {
    var msg = '<div class="msg"> <ion-icon class="alert" name="alert"></ion-icon> Non sei autorizzato a transitare su questa corsia<br><div class="sub_msg">';
    var time = 2000;
    var alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: msg + (time + 1000) / 1000 + '</div></div>',
    });
    alert.present();
    this.nativeAudio.play('notification_sound');
    var intervall = setInterval(() => {
      alert.message = msg + time / 1000 + '</div></div>';
      if (time == 0) {
        alert.remove();
        clearInterval(intervall);
      }
      time = time - 1000;
    }, 1000);
  }

  showMap() {
    if (this.map == null) {
      this.map = L.map('myMap', { zoomControl: false, attributionControl: false }).setView([this.latlong[0], this.latlong[1]], 17);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        minZoom: 1,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidmlsbGlmY29kZXIiLCJhIjoiY2toNnFvdzIzMDV0bDJxcnRncnc1dmtpdSJ9.cjTkQIoO0eDAX3_Z-ReuxA'
      }).addTo(this.map);
    }
    this.getPosition();
    this.marker_circle.addTo(this.map);
    this.marker_position.addTo(this.map);
  }

  getPosition() {
    navigator.geolocation.watchPosition((position => {
      this.latlong = [position.coords.latitude, position.coords.longitude];
      this.accuracy = position.coords.accuracy > 15 ? this.accuracy : 15;
      this.geolocation.getCurrentPosition;
      this.marker_position.setLatLng(this.latlong);
      this.marker_circle.setLatLng(this.latlong);
      this.marker_circle.setRadius(this.accuracy);
      this.map.setView(this.latlong);
      this.reverse_coords();
    }), (error => {
      alert('Alert_code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }), { enableHighAccuracy: true });

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
      var found = false;
      var find_corsia = this.find_corsia_riservata(json.corsie_riservate);
      if (find_corsia[0]) {
        if (!this.check_autorizzazione(json.corsie_riservate[find_corsia[1]].tags)) {
          this.show_alert_foreground();
          found = true;
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
  enable_device_orientation() {
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
    this.getPosition();
  }
  down() {
    this.latlong[0] = this.latlong[0] - this.delta;
    this.getPosition();
  }
  left() {
    this.latlong[1] = this.latlong[1] - this.delta;
    this.getPosition();
  }
  right() {
    this.latlong[1] = this.latlong[1] + this.delta;
    this.getPosition();
  }
}
