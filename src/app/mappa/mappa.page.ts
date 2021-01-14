import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';
import { createAnimation, IonSearchbar, Platform } from '@ionic/angular';
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
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { GestureController } from '@ionic/angular';

/* https://photon.komoot.io alternativa a nominatim API */
/*TODO list:
  1.1)ionic cordova run android --prod per il problema della velocita dell'app
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
  6.0)Riorganizza il codice (load_data_from_memory())[spostare metodi nelle classi giuste] OK
  6.1)__Fix vista ion select (ion select radio button sfocata) OK (su telefono)
  6.2)Non carica la selezione delle autorizz. sul telefono  OK
  6.3)Non funziona alert sonoro OK
  6.4)Bug visivo sullo scorrimento del cancellamento notifica OK
  6.5)Animazione cancello notifica OK
  6.6)Inserire searchbox in alto per ricercare le strade OK
  6.65) Searchbox scompare con swipe in alto OK
  6.7)Controllare differenza tra pol_soccorso e soccorso (soccorso o 0 o -1) OK
  6.8)Simulazione percorso per testare funzionamento OK
  6.9)Searbox più grande? (se sì fare come google maps con animazioni)
  6.10)Per rendere dinamico l'aggiornamento confrontare ide_corsia del json con ide_corsia del pdf 
      sul sito di Firenze con l'elenco delle corsie riservate
*/

@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.page.html',
  styleUrls: ['./mappa.page.scss'],
})
export class MappaPage {
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  animation_click_searchbox = 0;
  timeout;
  pin_search;
  legend;
  addresses = [{
    name: '',
    coords: []
  }];
  selectedAddress = {
    name: '',
    coords: []
  };
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
  ide_corsia = 0;
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
  percorso;
  count_percorso = 0;
  test_marker;
  records_coords;
  constructor(private gestureCtrl: GestureController, private androidPermissions: AndroidPermissions, private detailsPage: DetailsPage, private tabsPage: TabsPage, private router: Router, private custom_alert_page: CustomAlertPage, private notifica_page: NotificaPage, private locationAccuracy: LocationAccuracy, private diagnostic: Diagnostic, private nativeAudio: NativeAudio, private localNotifications: LocalNotifications, private alertController: AlertController, private deviceOrientation: DeviceOrientation, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private http: HttpClient, private sel_line_color_page: SelectionLineColorPage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.addresses.length = 0;
      console.log("costruttore"); var tutorial = JSON.parse(window.localStorage.getItem('tutorial'));
      if ((tutorial != true)) {
        this.router.navigate(['/tutorial']);
      }
      //window.localStorage.clear();
      //this.latlong = [43.80867, 11.25101];
      this.latlong = [43.798245080028536,11.24322352064662];
      this.marker_circle = L.circleMarker(this.latlong, {
        radius: this.accuracy,
        stroke: false,
        color: '#1275ff',
      });
      var icon_path,icon_size,iconAnchor
      if(!this.platform.is('desktop')){
        icon_path = 'https://cdn3.iconfinder.com/data/icons/glypho-travel/64/gps-navi-arrow-512.png';
        icon_size=[26,26];
        iconAnchor=[icon_size[0]/2,icon_size[1]/2]
      }
      else{
        icon_path='https://medall.in/assets/img/map/current_marker_full.png';
        icon_size=[26,34.6];
        iconAnchor=[icon_size[0]/2,icon_size[1]/2];
      }
      var navIcon = L.icon({
        iconUrl: icon_path,
        iconSize: icon_size, // size of the icon
        iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
      });
      this.marker_position = L.marker(this.latlong, { icon: navIcon });

      //this.osm_id = 2361804077;
    })
  }
  ngAfterViewInit() {
    const moveGesture = this.gestureCtrl.create({
      el: this.searchbar.nativeElement,
      threshold: 10,
      direction: 'y',
      gestureName: 'swipe_bottom-up',
      onStart: (ev) => { this.onStart() },
    });
    moveGesture.enable(true);
    fetch('assets/docs/prova.txt').then((response) => response.json()).then((json) => {
      this.percorso = json.coordinates;
      console.log(this.percorso)
    })

  }
  keyDown(event) {
    console.log(event)
  }
  private onStart() {
    if (!this.animation_click_searchbox) {
      console.log(this.searchbar.nativeElement);
      this.searchbarAnimation(this.searchbar.nativeElement.offsetTop, -this.searchbar.nativeElement.offsetHeight - 5);
      this.animation_click_searchbox = 1;
      //this.searchbar.nativeElement.offsetTop-=5;
    }
  }
  onClickMap() {
    console.log(this.searchbar)
    if (this.animation_click_searchbox) {
      this.searchbarAnimation(-this.searchbar.nativeElement.offsetHeight - 5, 0);
      this.animation_click_searchbox = 0;
      //this.searchbar.nativeElement.offsetTop+=5;
    }
  }
  searchbarAnimation(start, end) {
    const animation = createAnimation();
    animation.addElement(this.searchbar.nativeElement)
      .easing('ease').duration(300)
      .fromTo('transform', 'translateY(' + start + 'px)', 'translateY(' + end + 'px)');
    animation.play();
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
  search(event) {
    this.addresses = [];
    //console.log("change");
    this.animation_click_searchbox = 0;
    if (this.timeout != null)
      clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.search_word(event);
    }, 800);
  }
  search_word(event) {
    var query = event.target.value.toLowerCase();
    console.log(query.length)
    if (query.length > 0) {
      console.log(query)
      fetch("https://photon.komoot.de/api?q=" + query + "&limit=8" + '&osm_tag=highway')
        .then(response => response.json())
        .then((json) => {
          console.log(json)
          var txt;
          var j = 0;
          for (var i = 0; i < json.features.length; i++) {
            if (json.features[i].properties != undefined) {
              txt = (json.features[i].properties.name != undefined ? json.features[i].properties.name + ',' : '') +
                (json.features[i].properties.city != undefined ? json.features[i].properties.city + ',' : '') +
                (json.features[i].properties.county != undefined && json.features[i].properties.county != json.features[i].properties.city ? json.features[i].properties.county + ',' : '') +
                (json.features[i].properties.state != undefined ? json.features[i].properties.state + ',' : '') +
                (json.features[i].properties.country != undefined ? json.features[i].properties.country : '');
              if (this.addresses.map(function (e) { return e.name; }).indexOf(txt) == -1) {
                this.addresses[j] = {
                  name: txt,
                  coords: [json.features[i].geometry.coordinates[1], json.features[i].geometry.coordinates[0]]
                }
                j++;
              }
            }
          }
        })
    }
    else {
      this.addresses = [];
    }
    console.log(this.addresses)
  }

  onSelect(address) {
    this.selectedAddress = address;
    this.addresses = [];
    this.set_Pin_Marker();
  }
  onCancel() {
    //console.log("cancel")
    this.animation_click_searchbox = 0;
    if (this.pin_search != null)
      this.map.removeLayer(this.pin_search);
  }
  set_Pin_Marker() {
    this.onCancel();
    this.map.setView(this.selectedAddress.coords, 18);
    console.log(this.selectedAddress);
    this.pin_search = L.marker([this.selectedAddress.coords[0], this.selectedAddress.coords[1]]).addTo(this.map);
  }
  ionViewDidEnter() {
    if (this.map == null) {
      this.initMap();
      this.enable_device_orientation();
      // this.getPosition();
    }

    var map_colors = this.sel_line_color_page.get_colors();
    this.showMap();
    this.create_legend(map_colors);
    this.draw_multilines(map_colors);
  }
  //controllo permesso accesso al gps
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.askToTurnOnGPS();
        } else {
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (!canRequest) {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.askToTurnOnGPS();
            },
            error => {
              alert('Permesso negato ' + error)
            }
          );
      }
    });
  }
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => { },
      error => alert('Errore richiesta permesso ' + JSON.stringify(error))
    );
  }

  initMap() {

    this.map = L.map('myMap', { zoomControl: false, attributionControl: false }).setView([this.latlong[0], this.latlong[1]], 17);
    this.go_next_map_view();
    this.map.on('dragstart', function () {
      this.focus_on_marker = false;
    });
    this.map.on('dragend', (event) => this.drag_end_event(event));
    var draggable = new L.Draggable(this.marker_position);
    draggable.enable();
    this.marker_position.on('drag', () => {
      console.log("dragEvent")
    })
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
  crea_Strada() {
    this.test_marker.addEventListener('drag', (e) => {
      this.records_coords += '[' + e.latlng['lat'] + ',' + e.latlng['lng'] + ']' + ',';
      console.log(this.records_coords);
    })
  }
  metti_Marker(){
    this.test_marker = new L.Marker(this.latlong, { draggable: true }).addTo(this.map);
  }
  simula_percorso() {
    var simulazione = setInterval(() => {
      if (this.count_percorso < this.percorso.length) {
        if(this.count_percorso>500 && this.count_percorso<3500)
          this.count_percorso+=12;
        else
          this.count_percorso+=4;
        this.latlong = this.percorso[this.count_percorso++];
        console.log(this.count_percorso);
      }
      else{
        clearInterval(simulazione);
        this.count_percorso=0;
      }
      this.fake_gps();
    }, 50)
  }

  draw_multilines(colors_selected) {
    fetch("assets/docs/geoJSON_corsie.geojson")
      .then((response) => response.json())
      .then((json) => {
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
      })
      this.count_map_view_selected = (this.count_map_view_selected + 1) % this.baseMaps.length; //in this pos. to syncro icon_map_viw and basemap
    }
    this.go_next_map_view();
  }
  go_next_map_view() {
    var count = 0;
    this.baseMaps[this.count_map_view_selected].layer.forEach(element => {
      this.actual_layer[count++] = L.tileLayer(element, this.baseMaps[this.count_map_view_selected].options).addTo(this.map);
    });
  }
  showMap() {
    this.watch_Position();
    this.reverse_coords();
    this.marker_circle.addTo(this.map);
    this.marker_position.addTo(this.map);
  }
  fake_gps() {
    this.marker_position.setLatLng(this.latlong);
    this.marker_circle.setLatLng(this.latlong);
    this.marker_circle.setRadius(this.accuracy);
    if (this.focus_on_marker)
      this.map.setView(this.latlong);

  }
  watch_Position() {
    // this.checkGPSPermission();
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
    //   this.checkGPSPermission();
    //   //alert('Alert_code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    // }), { enableHighAccuracy: true });
  }
  getPosition() {
    this.checkGPSPermission();
    this.change_arrow_color();
    this.map.setView(this.latlong, this.map.getZoom() < 16 ? 19 : this.map.getZoom());
    this.focus_on_marker = true;

  }
  reverse_coords() {
    // setInterval(() => {
    //   fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.latlong[0] + '&lon=' + this.latlong[1] + '&extratags=1')
    //     .then((response) => response.json())
    //     .then((json) => {
    //       console.log(json.address.road+'\n');
    //       console.log(json)
    //       //console.log(json.address.road+" des"+json.extratags.description)
    //       if (json.extratags.description != undefined) {
    //         var tags = json.extratags.description.split(';');
    //         if (tags.length > 10) {
    //           var new_idee = tags[1].split(':')[1];
    //           if (new_idee != this.ide_corsia) {
    //             this.ide_corsia = new_idee;
    //             this.check_street(tags, json.address.road);
    //           }
    //         }
    //       }
    //     })
    // }, 4000);
  }
  check_street(tags, address) {
    var authoriz_user = this.detailsPage.get_authorization_user();
    console.log(authoriz_user);
    console.log(tags);
    for (var i = 4; i < 15; i++) {
      if (authoriz_user[i - 4].isChecked == false && tags[i].split(':')[1] != '0') {
        this.nativeAudio.play('notification_sound');
        this.custom_alert_page.show_alert();
        this.notifica_page.create_notifica(address, tags[1].split(':')[1].split('0')[0]);
        i = 15;
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

  send_notifica() {
    this.notifica_page.create_notifica("Via", "B");
  }
  show_alert() {
    //this.nativeAudio.play('notification_sound');
    this.custom_alert_page.show_alert();
  }
}