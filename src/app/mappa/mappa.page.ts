import { Component, Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import * as L from 'leaflet';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { SelectionLineColorPage } from '../selection-line-color/selection-line-color.page';
import { NotificaPage } from '../notifica/notifica.page';
/* https://photon.komoot.io alternativa a nominatim API */
/*TODO list:
  1.1)ionic cordova build android --prod per il problema della velocita dell'app
  2)inserire lista notifiche nel tab 
  3)Colorare in base alle autorizzazioni corsie riservate OK
  4)Qualche alert e notifiche per personalizzare
  4.1)Fix dragStart dragEnd
  5)Presentazione
*/
@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.page.html',
  styleUrls: ['./mappa.page.scss'],
})
export class MappaPage {
  count_map_view_selected = 0;
  focus_on_marker = false;
  map = null;
  marker_circle: any;
  marker_position: any;
  latlong: any;
  osm_id = 0;
  accuracy = 20;
  degrees: number;
  myLine_layer = null;
  tags_name = ["bus_urb", "bus_extra", "hand", "taxi", "ncc", "pol_socc", "ff_armate", "mezzi_op", "autorizz", "deroga", "soccorso"];
  autoriz_user = { "bus_urb": 0, "bus_extra": 0, "hand": 0, "taxi": 0, "ncc": 0, "pol_socc": 0, "ff_armate": 0, "mezzi_op": 0, "autorizz": 0, "deroga": 0, "soccorso": 0 };
  actual_layer = [];
  baseMaps = [{
    id: "mapBox",
    layer: [('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}')],
    options: {
      maxZoom: 20,
      minZoom: 1,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoidmlsbGlmY29kZXIiLCJhIjoiY2toNnFvdzIzMDV0bDJxcnRncnc1dmtpdSJ9.cjTkQIoO0eDAX3_Z-ReuxA'
    },
  }, {
    id: "hybrid",
    layer: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png'],
    options: {
      maxZoom: 20,
      minZoom: 1,
      tileSize: 512,
      zoomOffset: -1,
    }
  }, {
    id: "streetMap",
    layer: [("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")],
    options: {
      maxZoom: 20,
      minZoom: 1,
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoidmlsbGlmY29kZXIiLCJhIjoiY2toNnFvdzIzMDV0bDJxcnRncnc1dmtpdSJ9.cjTkQIoO0eDAX3_Z-ReuxA'
    }
  }];

  constructor(private notifica_page: NotificaPage, private locationAccuracy: LocationAccuracy, private diagnostic: Diagnostic, private nativeAudio: NativeAudio, private localNotifications: LocalNotifications, private alertController: AlertController, private deviceOrientation: DeviceOrientation, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private http: HttpClient, private sel_line_color_page: SelectionLineColorPage, private platform: Platform) {
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
    this.osm_id = 2361804077;

    //2361807728->autorizzato
    //2361804077->non autorizzato

  }
  ionViewDidEnter() {
    if (this.map == null) {
      this.initMap();
      this.enable_device_orientation();
    }
    this.showMap();
    this.load_data_from_memory();
    console.log(this.autoriz_user);
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
  show_alert() {
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
  initMap() {
    this.map = L.map('myMap', { zoomControl: false, attributionControl: false }).setView([this.latlong[0], this.latlong[1]], 17);
    // L.control.layers(this.baseMaps, null, { position: 'bottomright' }).addTo(this.map);
    this.map.on('dragstart',function () {
      this.focus_on_marker=false;
      console.log("dragstart");
    })
    this.map.on('dragend', function (event) {
      console.log(event);
      if(event.distance<100)
        this.focus_on_marker = true;
      console.log('dragend' + this.focus_on_marker);
    });
    // var myLayer=L.geoJSON().addTo(this.map);



  }
  load_data_from_memory() {
    this.nativeAudio.preloadSimple('notification_sound', 'assets/sounds/notification_sound.mp3');
    this.autoriz_user = JSON.parse(window.localStorage.getItem('autoriz_user'));
    this.notifica_page.listaNotifica = JSON.parse(window.localStorage.getItem('listaNotifica'));
    this.draw_multilines();
  }
  draw_multilines() {
    var colors_selected;
    if (window.localStorage.getItem("colors_selected") != null)
      colors_selected = JSON.parse(window.localStorage.getItem('colors_selected'));
    else
      colors_selected = this.sel_line_color_page.colors_selected;
    console.log(colors_selected);

    fetch("assets/docs/geoJSON_corsie.geojson")
      .then((response) => response.json()).then((json) => {
        var count = 0;
        var opacity_value = 0.7;
        if (this.myLine_layer != null) //remove old layer
          this.map.removeLayer(this.myLine_layer);
        this.myLine_layer = L.geoJSON(json, {
          style: function () {
            switch (json.features[count++].properties.name.tipo) {
              case 'A': return { color: colors_selected[0].coding, opacity: opacity_value };
              case 'B': return { color: colors_selected[1].coding, opacity: opacity_value };
              case 'C': return { color: colors_selected[2].coding, opacity: opacity_value };
            }
          }
        }).addTo(this.map);
      });
  }
  countLayers() {
    let i = 0;
    this.map.eachLayer(function () { i += 1; });
    console.log('Map has ', i, 'layers.');
  }
  change_view_map() {
    if (this.actual_layer.length != 0) {
      this.actual_layer.forEach(element => {
        this.map.removeLayer(element);
      }
      )
    }
    this.count_map_view_selected=(this.count_map_view_selected+1)%this.baseMaps.length;
    var count = 0;
    this.baseMaps[this.count_map_view_selected].layer.forEach(element => {
      console.log(element);
      this.actual_layer[count++] = L.tileLayer(element, this.baseMaps[this.count_map_view_selected].options).addTo(this.map);
    });
    //this.actual_layer=L.tileLayer(this.baseMaps[1].layer.toString(),this.baseMaps[1].options).addTo(this.map);

    // });
    // this.count_map_view_selected=(this.count_map_view_selected+1)%3;
    // this.actual_layer=this.baseMaps[this.count_map_view_selected];
    //this.actual_layer=L.layerGroup(this.baseMaps[1].layer,this.baseMaps[this.count_map_view_selected].options).addTo(this.map);
    //this.baseMaps[this.count_map_view_selected].layer.forEach(element => {
    //  this.actual_layer=L.layerGroup(element,this.baseMaps[this.count_map_view_selected].options).addTo(this.map);
    //});

  }
  showMap() {
    /*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);*/
    this.change_view_map();
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
      //console.log(this.latlong);
      if (this.focus_on_marker)
        this.map.setView(this.latlong);
    }), (error => {
      alert('Alert_code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }), { enableHighAccuracy: true });
  }
  getPosition() {
    this.map.setView(this.latlong, this.map.getZoom()<16?19:this.map.getZoom());
    this.focus_on_marker = true;
  }
  async reverse_coords() {
    /*setInterval(() => {
      fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.latlong[0] + '&lon=' + this.latlong[1])
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (this.osm_id != json.osm_id) {
            this.osm_id = json.osm_id;
            this.check_street();
          }
        })
    }, 5000);*/
  }
  async check_street() {
    fetch("assets/docs/corsie_riservate.gpx").then(res => res.json()).then(json => {
      var find_corsia = this.find_corsia_riservata(json.corsie_riservate);
      if (find_corsia[0]) {
        if (!this.check_autorizzazione(json.corsie_riservate[find_corsia[1]].tags)) {
          this.show_alert();
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
    for (var i = 0; i < this.tags_name.length && !found; i++) {
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
  set_autoriz_user(id, value) {
    this.autoriz_user[id] = value;
    window.localStorage.setItem('autoriz_user', JSON.stringify(this.autoriz_user));
  }
  notifica() {
    console.log("send notifica");
    this.notifica_page.addNotifica('test');
  }
}