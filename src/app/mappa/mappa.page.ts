import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
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
import { CustomAlertPage } from '../custom-alert/custom-alert.page';


/* https://photon.komoot.io alternativa a nominatim API */
/*TODO list:
  1.1)ionic cap build android --prod per il problema della velocita dell'app
  3)Colorare in base alle autorizzazioni corsie riservate OK
  4)Qualche alert e notifiche per personalizzare OK
  4.1)Fix dragStart dragEnd OK
  4.3)Radio button da correggere (se clicco fuori dal radio non arriva l'input) e non seleziona alert salvato OK
  4.5)alert divieto ovale su smartphone (provare min e max height/width) OK
  4.6)Mettere l'invia notifica nel codice al posto giusto OK
  4.7)check_street controlla il .tags che prob. non esiste OK
  5)Presentazione
  5.1)Perfezionare requestAccuracy nel getPosition() (forse fatto ma ricontrolla)
  5.2)Migliorare vista notifica con messaggio e data in basso a dx OK
  5.3)Inserire label info e dividere le impostazioni in gruppi Personalizza e Info OK
  5.4)Vedere se invio un ulteriore notifica se rimango nella stessa strada appena notificata
  5.5)Aggiungere badge notifiche non lette
  5.6)Creare pagina dettagli corsie riservate e pagina attribuzioni(openstreetmap,etc)
*/
@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.page.html',
  styleUrls: ['./mappa.page.scss'],
})
export class MappaPage {
 
  colors_selected;
  legend;
  icon_map_view_selected = [{
    name: "globe"
  }, {
    name: "logo-buffer"
  }, {
    name: "map"
  }];
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
  custom_alert;
  tags_name = ["bus_urb", "bus_extra", "hand", "taxi", "ncc", "pol_socc", "ff_armate", "mezzi_op", "autorizz", "deroga", "soccorso"];
  autoriz_user = { "bus_urb": 0, "bus_extra": 0, "hand": 0, "taxi": 0, "ncc": 0, "pol_socc": 0, "ff_armate": 0, "mezzi_op": 0, "autorizz": 0, "deroga": 0, "soccorso": 0 };
  actual_layer = [];
  state_button_arrow = {
    color: "light",
    state: false
  };
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
      maxZoom: 19,
    }
  }, {
    id: "streetMap",
    layer: ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'],
    options: {
      maxZoom: 19,
    }
  }];
  
  constructor(private router: Router, private custom_alert_page: CustomAlertPage, private notifica_page: NotificaPage, private locationAccuracy: LocationAccuracy, private diagnostic: Diagnostic, private nativeAudio: NativeAudio, private localNotifications: LocalNotifications, private alertController: AlertController, private deviceOrientation: DeviceOrientation, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private http: HttpClient, private sel_line_color_page: SelectionLineColorPage, private platform: Platform) {
    this.platform.ready().then(() => {
      console.log("costruttore");
      //this.latlong = [43.7996269, 11.2438267];
      this.latlong = [43.80867, 11.25101];
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
      var tutorial = JSON.parse(window.localStorage.getItem('tutorial'));
    if((tutorial==null || tutorial==false)){
      this.router.navigate(['/tutorial']);
    }
    })
    
    //2361807728->autorizzato
    //2361804077->non autorizzato
  }
  ngOnDestroy(){
    console.log("destroying child...");
  }
  change_arrow_color() {
    switch (this.state_button_arrow.color) {
      case "light": {
        this.state_button_arrow.color = "dark";
        this.state_button_arrow.state = true
      }; break;
      case "dark": {
        this.state_button_arrow.color = "light";
        this.state_button_arrow.state = false
      }; break;
    }
  }
  create_legend() {
    if (this.legend == null)
      this.legend = new L.Control({ position: 'topright' });
    else
      this.map.removeControl(this.legend);
    this.legend.onAdd = (() => {
      var div = L.DomUtil.create('div', 'info legend');
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < this.colors_selected.length; i++) {
        div.innerHTML +=
          '<div class="row"> <i class ="color" style="background:' + this.colors_selected[i].coding + '"></i> ' + '<p id="testo">' +
          'corsia ' + this.colors_selected[i].corsia + ' </p></div>';
      }
      return div;
    })
    this.legend.addTo(this.map);
  }
  open_tutorial() {
    this.router.navigate(['/tutorial']);
  }
  ionViewDidEnter() {

    this.load_data_from_memory();
    if (this.map == null) {
      this.initMap();
      this.enable_device_orientation();
      this.create_legend();
      // this.getPosition();
    }
    this.showMap();
    this.draw_multilines();
  }
  requestAccuracy() {
    var ok = true;
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => { }, () => ok = false);
      }
      else { this.location_enable_manually("Richiesta di attivazione localizzazione rifiutata"); }
    });
    return ok;
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
  async show_alert() {
    var div = '<div class="' + this.custom_alert.div_class + '">';
    var icon = '<ion-icon name="' + this.custom_alert.ion_icon_name + '" class="' + this.custom_alert.ion_icon_class + '"></ion-icon>';
    var txt = 'Non sei autorizzato a transitare su questa corsia<br><div class="sub_msg">';
    var msg = this.custom_alert.ion_icon_name == '' ? msg = div + txt : msg = div + icon + txt;
    var time = 100000;
    this.alertController.create({
      cssClass: this.custom_alert.css_class,
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
  initMap() {
    this.map = L.map('myMap', { zoomControl: false, attributionControl: false }).setView([this.latlong[0], this.latlong[1]], 17);
    this.go_next_map_view();
    this.map.on('dragstart', function () {
      this.focus_on_marker = false;
    });
    this.map.on('dragend', (event) => this.drag_end_event(event));
    // var myLayer=L.geoJSON().addTo(this.map);
  }
  drag_end_event(event) {
    if (event.distance > 80 && this.state_button_arrow.state) {
      this.focus_on_marker = false;
      this.change_arrow_color();
    }
    if (this.state_button_arrow.state) {
      this.map.setView(this.latlong);
    }
  }
  load_data_from_memory() {
    this.nativeAudio.preloadSimple('notification_sound', 'assets/sounds/notification_sound.mp3');
    this.autoriz_user = JSON.parse(window.localStorage.getItem('autoriz_user'));
    if ((window.localStorage.getItem('listaNotifica')) != null)
      this.notifica_page.listaNotifica = JSON.parse(window.localStorage.getItem('listaNotifica'));
    else
      this.notifica_page.listaNotifica = [];
    this.custom_alert = JSON.parse(window.localStorage.getItem('selected_radio'));
    if (window.localStorage.getItem("colors_selected") != null)
      this.colors_selected = JSON.parse(window.localStorage.getItem('colors_selected'));
    else
      this.colors_selected = this.sel_line_color_page.colors_selected;
    if (this.custom_alert == null)
      this.custom_alert = this.custom_alert_page.selected_radio;
  }
  draw_multilines() {
    fetch("assets/docs/geoJSON_corsie.geojson")
      .then((response) => response.json()).then((json) => {
        var count = 0;
        var opacity_value = 0.7;
        if (this.myLine_layer != null) //remove old layer
          this.map.removeLayer(this.myLine_layer);
        this.myLine_layer = L.geoJSON(json, {
          style: () => {
            switch (json.features[count++].properties.name.tipo) {
              case 'A': return { color: this.colors_selected[0].coding, opacity: opacity_value };
              case 'B': return { color: this.colors_selected[1].coding, opacity: opacity_value };
              case 'C': return { color: this.colors_selected[2].coding, opacity: opacity_value };
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
      this.count_map_view_selected = (this.count_map_view_selected + 1) % this.baseMaps.length; //in this pos. to syncro icon_map_viw and basemap
    }
    this.go_next_map_view();
  }
  go_next_map_view() {
    var count = 0;
    this.baseMaps[this.count_map_view_selected].layer.forEach(element => {
      // console.log(element);
      this.actual_layer[count++] = L.tileLayer(element, this.baseMaps[this.count_map_view_selected].options).addTo(this.map);
    });
  }
  showMap() {
    /*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);*/
    //this.change_view_map();
    this.watch_Position();
    this.reverse_coords();
    this.marker_circle.addTo(this.map);
    this.marker_position.addTo(this.map);
  }
  watch_Position() {
    // this.requestAccuracy();
    // navigator.geolocation.watchPosition((position => {
    //   this.latlong = [position.coords.latitude, position.coords.longitude];
    //   this.accuracy = position.coords.accuracy > 15 ? this.accuracy : 15;
    //   this.geolocation.getCurrentPosition;
    //   this.marker_position.setLatLng(this.latlong);
    //   this.marker_circle.setLatLng(this.latlong);
    //   this.marker_circle.setRadius(this.accuracy);
    //   if (this.focus_on_marker)
    //     this.map.setView(this.latlong);
    // }), ((error) => {
    //   this.requestAccuracy();
    //   //alert('Alert_code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    // }), { enableHighAccuracy: true });
  }
  getPosition() {
    if (this.requestAccuracy()) {
      this.change_arrow_color();
      this.map.setView(this.latlong, this.map.getZoom() < 16 ? 19 : this.map.getZoom());
      this.focus_on_marker = true;
    }
  }
  reverse_coords() {
    /*setInterval(() => {
      fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.latlong[0] + '&lon=' + this.latlong[1])
        .then((response) => response.json())
        .then((json) => {
          if (this.osm_id != json.osm_id) {
            this.osm_id = json.osm_id;
            this.check_street(json.address.road);
          }
        })
    }, 5000);*/
  }
  check_street(road) {
    fetch("assets/docs/corsie_riservate.gpx").then(res => res.json()).then(json => {
      var find_corsia = this.find_corsia_riservata(json.corsie_riservate);
      if (find_corsia[0]) {
        if (!this.check_autorizzazione(json.corsie_riservate[find_corsia[1]].tags)) {
          var date = new Date();
          this.notifica_page.addNotifica('Sei transitato in ' + road + ', corsia di tipo ' + json.corsie_riservate[find_corsia[1]].tipo, date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '  ' + date.getHours() + ':' + date.getMinutes());
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
  enable_device_orientation() {
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
    var data;
    var ora = new Date();
    data = (ora.getDate() + '/' + (ora.getMonth() + 1) + '/' + ora.getFullYear() + '  ' + ora.getHours() + ':' + ora.getMinutes());
    this.notifica_page.addNotifica("Sei transitato in Viale Gaetano Pieraccini, corsia di tipo C", data);
    //this.notifica_page.addNotifica('test' + this.count++);
  }

}