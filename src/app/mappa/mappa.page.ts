import { Component } from '@angular/core';
import { Router } from '@angular/router'
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
import { DetailsPage } from '../details/details.page';
import { TabsPage } from '../tabs/tabs.page';
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
  5.1)__Perfezionare requestAccuracy nel getPosition() (forse fatto ma ricontrolla)
  5.2)Migliorare vista notifica con messaggio e data in basso a dx OK
  5.3)Inserire label info e dividere le impostazioni in gruppi Personalizza e Info OK
  5.4)__Vedere se invio un ulteriore notifica se rimango nella stessa strada appena notificata OK
  5.5)Aggiungere badge notifiche non lette OK
  5.6)Creare pagina dettagli corsie riservate e pagina attribuzioni(openstreetmap,etc)
  5.65)Rivedere file .gpx (ho caricato le strade su openstreetmap) OK
  5.66)Cambiare controllo delle strade riservate OK
  5.7)Creare distinzione nel file .gpx delle corsie C1,C6,C7 OK
  5.8)Aggiungere corsia C1,C6,C7(togliendo C) nella legenda e nella scelta colori di impostazioni OK
  5.9)Fare preview legenda e alert quando scelgo i settaggi OK
  6.0)Riorganizza il codice (load_data_from_memory())[spostai metodi nelle classi giuste] OK
  6.1)__Fix vista ion select (ion select radio button sfocata) OK (su telefono)
  6.2)Non carica la selezione delle autorizz. sul telefono  OK
  6.3)Invece di preview legend spostare colore a sx della label corsia + ingrandire e stondare i bottoni (idea)
  6.35)Provare a ordinare codice css (spostarlo nelle varie pagine)
  6.4)Non funziona alert sonoro
*/

@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.page.html',
  styleUrls: ['./mappa.page.scss'],
})
export class MappaPage {
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

  constructor(private detailsPage: DetailsPage, private tabsPage: TabsPage, private router: Router, private custom_alert_page: CustomAlertPage, private notifica_page: NotificaPage, private locationAccuracy: LocationAccuracy, private diagnostic: Diagnostic, private nativeAudio: NativeAudio, private localNotifications: LocalNotifications, private alertController: AlertController, private deviceOrientation: DeviceOrientation, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private http: HttpClient, private sel_line_color_page: SelectionLineColorPage, private platform: Platform) {
    this.platform.ready().then(() => {
      console.log("costruttore");
      //window.localStorage.clear();
      //this.latlong = [43.80867, 11.25101];
      this.latlong = [43.79811, 11.24264];
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
      //this.osm_id = 2361804077;
      var tutorial = JSON.parse(window.localStorage.getItem('tutorial'));
      if ((tutorial != true)) {
        this.router.navigate(['/tutorial']);
      }
    })
  }
  // ngOnDestroy() {
  //   console.log("destroying child...");
  // }
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
  create_legend(colors_selected) {
    if (this.legend == null)
      this.legend = new L.Control({ position: 'topright' });
    else
      this.map.removeControl(this.legend);
    this.legend.onAdd = (() => {
      var div = L.DomUtil.create('div', 'info legend');
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < colors_selected.length; i++) {
        if (colors_selected[i].color.val != 'nullo')
          div.innerHTML +=
            '<div class="row"> <i class ="color" style="background:' + colors_selected[i].color.coding + '"></i> ' + '<p id="testo">' +
            'corsia ' + colors_selected[i].corsia + ' </p></div>';
      }
      return div;
    })
    this.legend.addTo(this.map);
  }

  ionViewDidEnter() {
    if (this.map == null) {
      this.initMap();
      this.enable_device_orientation();
      // this.getPosition();
    }
    var map_colors=this.sel_line_color_page.get_colors();
    this.showMap();
    this.create_legend(map_colors);
    this.draw_multilines(map_colors);
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

  draw_multilines(colors_selected) {
    fetch("assets/docs/geoJSON_corsie.geojson")
      .then((response) => response.json()).then((json) => {
        var count = 0;
        var opacity_value = 0.7;
        if (this.myLine_layer != null) //remove old layer
          this.map.removeLayer(this.myLine_layer);
        this.myLine_layer = L.geoJSON(json, {
          style: () => {
            switch (json.features[count++].properties.name.ide_corsia.split('0')[0]) {
              case 'A': return { color: colors_selected[0].color.coding, opacity: opacity_value };
              case 'B': return { color: colors_selected[1].color.coding, opacity: opacity_value };
              case 'C1': return { color: colors_selected[2].color.coding, opacity: opacity_value };
              case 'C2': return { color: colors_selected[3].color.coding, opacity: opacity_value };
              case 'C6': return { color: colors_selected[4].color.coding, opacity: opacity_value };
              case 'C7': return { color: colors_selected[5].color.coding, opacity: opacity_value };
              default: return { color: undefined };
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
    setInterval(() => {
      fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.latlong[0] + '&lon=' + this.latlong[1] + '&extratags=1')
        .then((response) => response.json())
        .then((json) => {
          if (this.osm_id != json.osm_id) {
            this.osm_id = json.osm_id;
            this.check_street(json);
          }
        })
    }, 5000);
  }
  check_street(json) {
    if (json.extratags.description != undefined) {
      var tags = json.extratags.description.split(';');
      if (tags.length > 10) {
        var authoriz_user=this.detailsPage.get_authorization_user();
        console.log(authoriz_user);
        for (var i = 4; i < 15; i++) {
          if (authoriz_user[i - 4].isChecked == false && (tags[i].split(':')[1] == '1' || tags[i].split(':')[1] == '-1')) {
            // this.show_alert();
            this.custom_alert_page.show_alert();
            this.notifica_page.create_notifica(json.address.road, tags[1].split(':')[1].split('0')[0]);
            i = 15;
          }
        }
      }
    }
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

  send_notifica(){
    this.notifica_page.create_notifica("Via", "B");
  }
  show_alert(){
    this.custom_alert_page.show_alert();
  }
}