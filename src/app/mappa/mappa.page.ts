import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';
import { createAnimation, Platform } from '@ionic/angular';
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
import 'hammerjs';
import 'leaflet-rotatedmarker';
import { DataService } from '../services/data.service';

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
  6.9)Searbox più grande? (se sì fare come google maps con animazioni) OK
  6.95)Cambiare display name del reverse_tap e back button quando torno indietro non cancellare il testo
       se c'è il pin sulla mappa OK
      aggiustare searchbar width e far funzionare mouse down e mouse up su telefono OK
  6.10)Per rendere dinamico l'aggiornamento confrontare ide_corsia del json con ide_corsia del pdf 
      sul sito di Firenze con l'elenco delle corsie riservate NO 
  6.11) Fare filtro per vista autorizzazioni OK   
  6.12) Controllare simulazione percorso OK
  6.13) Finire di implementare il segnala strade vicino con il setInterval e provare il foreachLayer come ciclo OK
  6.135) Rivedere salvataggio details,salvataggio e scelta_alert gestione radiobutton, flag animazione searchbar OK
  6.136) Evidenziare corsie in scelta colore e aggiungere animazione alla legenda OK
  6.137) Fixare sinergia tra scelta autorizzazione e altri componenti quando non ci sono dati salvati 
  6.14) Controllare eventuali bug su smartphone
  */
@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.page.html',
  styleUrls: ['./mappa.page.scss'],
})
export class MappaPage {
  @ViewChild('searchbar', { read: ElementRef }) searchbar_element: ElementRef;
  @ViewChild('map', { read: ElementRef }) map_element: ElementRef;
  @ViewChild('ion_input', { read: ElementRef }) ion_input_element: ElementRef;
  legend_element;
  actived_big_searchbar = 0;
  duration_animation_map = 400;
  icon_name_searchbar = "search";
  enabled_animation_click_searchbox = 0;
  actived_animation_legend = 0;
  delta_searchbar = 105;
  list_intersections_found = [];
  wait_animation = 0;
  timeout;
  pin_search = { marker: null, name: '', coords: [] };
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
  accuracy = 5;
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
      maxZoom: 19,
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
  layers_array_close_street;
  bound_circle_marker;
  interval_check_close_street;
  marker_circle_closest_street;
  constructor(private dataService: DataService, private gestureCtrl: GestureController, private androidPermissions: AndroidPermissions, private detailsPage: DetailsPage, private tabsPage: TabsPage, private router: Router, private custom_alert_page: CustomAlertPage, private notifica_page: NotificaPage, private locationAccuracy: LocationAccuracy, private diagnostic: Diagnostic, private nativeAudio: NativeAudio, private localNotifications: LocalNotifications, private alertController: AlertController, private deviceOrientation: DeviceOrientation, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private http: HttpClient, private sel_line_color_page: SelectionLineColorPage, private platform: Platform) {
    this.platform.ready().then(() => {
      console.log('costruttore');
      this.addresses.length = 0;
      var tutorial = JSON.parse(window.localStorage.getItem('tutorial'));
      if ((tutorial != true)) {
        this.router.navigate(['/tutorial']);
      }
      //window.localStorage.clear();
      //this.latlong = [43.7979122, 11.2441981];
      this.latlong = [43.798245080028536, 11.24322352064662];
      this.marker_circle = L.circle(this.latlong, {
        radius: this.accuracy,
        stroke: false,
        color: '#1275ff',
      });
      this.marker_circle_closest_street = L.circle(this.latlong, {
        radius: 23,
        stroke: false,
        fill: false
      });
      var icon_path, icon_size, iconAnchor
      if (!this.platform.is('desktop')) {
        icon_path = 'https://cdn3.iconfinder.com/data/icons/glypho-travel/64/gps-navi-arrow-512.png';
        icon_size = [26, 26];
        iconAnchor = [icon_size[0] / 2, icon_size[1] / 2]
      }
      else {
        icon_path = 'https://medall.in/assets/img/map/current_marker_full.png';
        icon_size = [26, 34.6];
        iconAnchor = [icon_size[0] / 2, icon_size[1] / 2];
      }
      var navIcon = L.icon({
        iconUrl: icon_path,
        iconSize: icon_size, // size of the icon
        iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
      });
      this.marker_position = L.marker(this.latlong, { icon: navIcon });
      this.nativeAudio.preloadSimple('preAlert_sound', 'assets/sounds/preAlert_sound.mp3');
      //this.osm_id = 2361804077;
    })
  }
  ngAfterViewInit() {
    this.gestureCtrl.create({
      el: this.searchbar_element.nativeElement,
      threshold: 10,
      direction: 'y',
      gestureName: 'swipe_bottomup_searchbar',
      onStart: (ev) => { this.swipe_BottomUpEvent_Searchbar() },
    }).enable(true)
    fetch('assets/docs/prova.txt').then((response) => response.json()).then((json) => {
      this.percorso = json.coordinates;
    })
  }
  swipe_BottomUpEvent_Legend() {
    if (!this.actived_animation_legend) {
      this.bottomUpAnimation(this.legend_element, 0, -this.legend_element.offsetHeight - 5);
      this.actived_animation_legend = 1;
    }
  }
  check_close_street() {
    this.interval_check_close_street = setInterval(() => {
      var list_intersect = [];
      this.load_layers_street_close();
      for (var i = 0; i < this.layers_array_close_street.length; i++) {
        if (this.layers_array_close_street[i]._pxBounds.intersects(this.bound_circle_marker)) {
          list_intersect.push(this.layers_array_close_street[i].feature.properties.desc)

          var point_layer1 = this.map.layerPointToLatLng(this.layers_array_close_street[i]._pxBounds.max)
          var point_layer2 = this.map.layerPointToLatLng(this.layers_array_close_street[i]._pxBounds.min)
          var point_1 = this.map.layerPointToLatLng(this.bound_circle_marker[0])
          var point_2 = this.map.layerPointToLatLng(this.bound_circle_marker[1])
          var bounds_layer = [point_layer1, point_layer2]
          new L.Rectangle([point_1, point_2], { color: "#ff7800", weight: 1 }).addTo(this.map)
          new L.Rectangle(bounds_layer, { color: "#ff7800", weight: 1 }).addTo(this.map)
          console.log('Intersezione trovata');
        }
      }

      if (this.compareIntersectionsList(list_intersect)) {
        this.nativeAudio.play('preAlert_sound');
        console.log('alert vicino')
      }
    }, 1024);
  }
  compareIntersectionsList(listnew) {
    var uniqueArray = [];
    var found = 0;
    var ok = false;
    for (var i = 0; i < listnew.length; i++) {
      if (uniqueArray.indexOf(listnew[i]) == -1) {
        uniqueArray.push(listnew[i]);
      }
    }
    uniqueArray.forEach(el => {
      //console.log(this.list_intersections_found.indexOf(el))
      if (this.list_intersections_found.indexOf(el) != -1)
        found++;
    });
    //console.log(found)
    if (uniqueArray.length > 0)
      if (found > 0) {
        if (found != this.list_intersections_found.length) {  //diversi dalla lista vecchia
          if (found == uniqueArray.length) //lista più piccola o uguale alla vecchia lista -> non suono
            ok = false;
          else // lista nuova più grande di quella vecchia ->suono
            ok = true;
        }
        else
          ok = false;
      }
      else
        ok = true;
    else
      ok = false;
    console.log('list old ' + this.list_intersections_found)
    this.list_intersections_found = uniqueArray;
    console.log('list new ' + uniqueArray)
    console.log(ok)
    return ok;
  }
  foreachLayers() {
    this.map.eachLayer((layer) => {
      console.log(layer);
    });
  }
  private swipe_BottomUpEvent_Searchbar() {
    if (!this.actived_big_searchbar) {
      this.bottomUpAnimation(this.searchbar_element.nativeElement, 0, -this.searchbar_element.nativeElement.offsetHeight - 5);
      this.enabled_animation_click_searchbox = 1;
      //this.searchbar.nativeElement.offsetTop-=5;
    }
  }
  onClickMap() {
    if (!this.actived_big_searchbar && this.enabled_animation_click_searchbox) {
      this.bottomUpAnimation(this.searchbar_element.nativeElement, -this.searchbar_element.nativeElement.offsetHeight - 5, 0);
      this.enabled_animation_click_searchbox = 0;
      //this.enabled_big_searchbar
      //this.searchbar.nativeElement.offsetTop+=5;
    }
    if (this.actived_animation_legend) {
      this.bottomUpAnimation(this.legend_element, -this.legend_element.offsetHeight - 5, 0)
      this.actived_animation_legend = 0;
    }
  }
  bottomUpAnimation(element, start, end) {
    const animation = createAnimation();
    animation.addElement(element)
      .easing('ease').duration(300)
      .fromTo('transform', 'translateY(' + start + 'px)', 'translateY(' + end + 'px)');
    animation.play();
  }
  icon_searchbar_onBack() {
    if (this.icon_name_searchbar == 'arrow-back' && !this.wait_animation) {//!this.enabled_animation_click_searchbox && 
      this.addresses = [];
      this.actived_big_searchbar = 0;
      this.ion_input_element.nativeElement.setBlur();
      console.log(this.pin_search)
      if (this.pin_search.marker != null)
        this.set_searchbox_value({ name: this.pin_search.name, coords: this.pin_search.coords })
      else
        this.set_searchbox_value({ name: '', coords: [] })
      this.show_map_onBack();
    }
  }
  async hide_map_onclick() {
    // console.log('wait_animation ' + this.wait_animation);
    // console.log('big_search ' + this.enabled_big_searchbar)
    if (!this.wait_animation && !this.actived_big_searchbar) {
      this.icon_name_searchbar = 'arrow-back';
      this.actived_big_searchbar = 1;
      //this.enabled_animation_click_searchbox = 0;
      this.searchbar_element.nativeElement.style.position = 'relative';
      var margin_right = parseFloat(window.getComputedStyle(this.searchbar_element.nativeElement).getPropertyValue('margin-right'));
      this.mapAnimation(0, this.map_element.nativeElement.offsetHeight,
        this.searchbar_element.nativeElement.offsetWidth, this.searchbar_element.nativeElement.offsetWidth + this.delta_searchbar - margin_right * 2);
      await new Promise((resolve) => setTimeout(resolve, this.duration_animation_map + 10));
      this.map_element.nativeElement.style.display = 'none';
    }
    else
      if (this.wait_animation)
        this.ion_input_element.nativeElement.setBlur();
  }
  show_map_onBack() {
    this.map_element.nativeElement.style.display = 'block';
    //this.enabled_animation_click_searchbox = 1;
    this.actived_big_searchbar = 0;
    this.icon_name_searchbar = 'search';
    this.searchbar_element.nativeElement.style.position = 'absolute';
    var margin_right = parseFloat(window.getComputedStyle(this.searchbar_element.nativeElement).getPropertyValue('margin-right'));
    this.mapAnimation(this.map_element.nativeElement.offsetHeight, 0,
      this.searchbar_element.nativeElement.offsetWidth, this.searchbar_element.nativeElement.offsetWidth - this.delta_searchbar + margin_right * 2);

  }
  mapAnimation(start, end, width_start, width_end) {
    {
      this.wait_animation = 1;
      var map_animation = createAnimation().addElement(this.map_element.nativeElement)
        .easing('ease').duration(this.duration_animation_map)
        .fromTo('transform', 'translateY(' + start + 'px)', 'translateY(' + end + 'px)');
      var search_animation = createAnimation().addElement(this.searchbar_element.nativeElement)
        .easing('ease').duration(this.duration_animation_map)
        .fromTo('width', width_start + 'px', width_end + 'px');
      map_animation.play();
      search_animation.play().then(() =>
        this.wait_animation = 0);
      search_animation.onFinish((event) => {
        if (event)
          this.wait_animation = 0;
      })
      //await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }
  invert_arrow_color() {
    switch (this.state_button_arrow.color) {
      case "light": {
        this.setArrowColor('dark')
        // this.state_button_arrow.color = "dark";
        // this.state_button_arrow.state = true
      }; break;
      case "dark": {
        this.setArrowColor('light')
        // this.state_button_arrow.color = "light";
        // this.state_button_arrow.state = false
      }; break;
    }
  }
  setArrowColor(color) {
    if (color == 'dark' || color == 'light') {
      this.state_button_arrow.color = color
      if (color == "dark")
        this.state_button_arrow.state = true;
      else
        this.state_button_arrow.state = false;
    }
  }
  create_legend(colors_selected) {
    if (this.legend == null)
      this.legend = new L.Control({ position: 'topright' });
    else
      this.map.removeControl(this.legend);
    this.legend.onAdd = (() => {
      var div = L.DomUtil.create('div', 'info legend');
      // for (var i = 0; i < colors_selected.length; i++) {
      //   if (colors_selected[i].color.val != 'nullo')
      //     div.innerHTML +=
      //       '<div class="row"> <i class ="color" style="background:' + colors_selected[i].color.coding + '"></i> ' + '<p id="testo">' +
      //       'corsia ' + colors_selected[i].corsia + ' </p></div>';
      // }
      div.innerHTML = this.dataService.createLengendHTMLFromColorsSelected(colors_selected);
      return div;
    })
    //this.load_layers_street_close()
    this.legend.addTo(this.map);
    var legend = document.getElementsByClassName('info legend');
    this.legend_element = legend[0];
    this.gestureCtrl.create({
      el: this.legend_element,
      threshold: 10,
      direction: 'y',
      gestureName: 'swipe_bottomup_legend',
      onStart: (ev) => { this.swipe_BottomUpEvent_Legend() },
    }).enable(true);
  }
  rotare_marker() {
    this.marker_position.setRotationAngle(50);
  }
  search(event) {
    this.addresses = [];
    //this.enabled_animation_click_searchbox = 0;
    if (this.timeout != null)
      clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.search_word(event);
    }, 400);
    //else
    // this.enabled_ionChange_searchbox = 1;
  }
  search_word(event) {
    var query = event.target.value;
    if (query.length > 0) {
      query = query.toLowerCase();
      fetch("https://photon.komoot.io/api?q=" + query + "&limit=11" + '&lat=43.80867&lon=11.25101')
        .then(response => response.json())
        .then((json) => {
          var txt;
          var j = 0;
          for (var i = 0; i < json.features.length; i++) {
            if (json.features[i].properties != undefined) {
              txt = this.create_name_from_json(json.features[i])
              if (this.addresses.map(function (e) { return e.name; }).indexOf(txt) == -1) {
                this.addresses[j] = {
                  name: txt,
                  coords: [json.features[i].geometry.coordinates[1], json.features[i].geometry.coordinates[0]]
                }
                j++;
              }
            }
          }
        }).then(() => {
          if (this.actived_big_searchbar == 0)
            this.addresses = [];
        })
    }
    else {
      this.addresses = [];
    }
  }
  create_name_from_json(json) {
    var txt = (json.properties.street != undefined ? json.properties.street + ',' : '') +
      (json.properties.name != undefined ? json.properties.name + ',' : '') +
      (json.properties.locality != undefined ? json.properties.locality + ',' : '') +
      (json.properties.city != undefined ? json.properties.city + ',' : '') +
      (json.properties.county != undefined && json.properties.county != json.properties.city ? json.properties.county + ',' : '') +
      (json.properties.state != undefined ? json.properties.state + ',' : '') +
      (json.properties.country != undefined ? json.properties.country : '');
    return txt;
  }
  onSelect(address) {
    this.setArrowColor('light');
    this.actived_big_searchbar = 0;
    this.show_map_onBack();
    this.set_searchbox_value(address);
    this.remove_list_searchbox();
    this.set_Pin_Marker(this.selectedAddress.coords, true);
    //this.enabled_animation_click_searchbox = 0;
  }
  onCancel() {
    this.remove_list_searchbox();
    this.set_searchbox_value({ name: '', coords: [] });
    if (!this.actived_big_searchbar)
      this.ion_input_element.nativeElement.setBlur();
    if (this.pin_search.marker != null) {
      this.map.removeLayer(this.pin_search.marker);
      this.pin_search.marker = null;
    }
  }
  set_searchbox_value(txt) {
    //this.enabled_ionChange_searchbox = 0;
    this.selectedAddress = txt;
    console.log(this.selectedAddress)
  }
  remove_list_searchbox() {
    this.addresses = [];
  }
  set_Pin_Marker(coords, enab_setView) {
    if (enab_setView)
      this.map.setView(coords, this.map.getZoom());
    if (this.pin_search.marker != null) {
      this.map.removeLayer(this.pin_search.marker);
    }
    this.pin_search.marker = L.marker([coords[0], coords[1]]).addTo(this.map);
    this.pin_search.name = this.selectedAddress.name;
    this.pin_search.coords = this.selectedAddress.coords;
    console.log(this.pin_search);
  }
  ionViewDidEnter() {
    if (this.map == null) {
      this.initMap();
      this.enable_device_orientation();
      // this.getPosition();
    }
    var map_colors = this.sel_line_color_page.get_colors();
    console.log(map_colors)
    this.showMap();
    this.create_legend(map_colors);
    this.set_width_searchbar();
    this.draw_multilines(map_colors).then((e) => {
      if (this.dataService.getCheckboxclose_street().isChecked)
        this.check_close_street();
      else
        clearInterval(this.interval_check_close_street)
    });

  }
  set_width_searchbar() {
    var elements = document.getElementsByClassName('leaflet-top leaflet-right');
    this.delta_searchbar = elements[0].clientWidth + this.searchbar_element.nativeElement.offsetLeft;
    this.searchbar_element.nativeElement.style.width = (document.getElementById('content').offsetWidth - elements[0].clientWidth - this.searchbar_element.nativeElement.offsetLeft) + 'px';
    //console.log(document.getElementById('content').offsetWidth);
    // alert('width seacrbar ' + this.searchbar_element.nativeElement.style.width);
    // alert('delta ' + this.delta_searchbar)
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
        alert('checkGPS permission');
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
              alert('requestGPS permission')
            }
          );
      }
    });
  }
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => { },
      error => alert('ask to turn on gps')
    );
  }
  initMap() {
    this.map = L.map('myMap', { zoomControl: false, attributionControl: false }).setView([this.latlong[0], this.latlong[1]], 19);
    this.go_next_map_view();
    this.map.on('dragstart', () => {
      this.focus_on_marker = false;
      console.log(this.focus_on_marker)
    });
    this.map.on('dragend', (event) => this.drag_end_event(event));
    document.addEventListener('ionBackButton', (ev) => {
      this.icon_searchbar_onBack();
    });
    this.long_tap_map();

  }
  long_tap_map() {
    this.map.on("contextmenu", (e) => {
      //console.log(e)
      fetch('https://photon.komoot.io/reverse?lon=' + e.latlng.lng + '&lat=' + e.latlng.lat)
        .then((response) => response.json())
        .then((json) => {
          console.log("json contextmenu click")
          console.log(json);
          this.set_searchbox_value({ name: this.create_name_from_json(json.features[0]), coords: [json.features[0].geometry.coordinates[1], json.features[0].geometry.coordinates[0]] })
          this.set_Pin_Marker([e.latlng.lat, e.latlng.lng], false);
        });
    });
  }
  drag_end_event(event) {
    if (event.distance > 80 && this.state_button_arrow.state) {
      //this.focus_on_marker = false;
      this.invert_arrow_color();
    }
    if (this.state_button_arrow.state) {
      this.map.setView(this.latlong);
      this.focus_on_marker = true;
    }
  }
  crea_Strada() {
    console.log('add event')
    this.test_marker.addEventListener('drag', (e) => {
      this.records_coords += '[' + e.latlng['lat'] + ',' + e.latlng['lng'] + ']' + ',';
      console.log(this.records_coords);
    })
  }
  metti_Marker() {
    this.test_marker = new L.Marker(this.latlong, { draggable: true }).addTo(this.map);
  }
  simula_percorso() {
    var simulazione = setInterval(() => {
      if (this.count_percorso < this.percorso.length) {
        if (this.count_percorso > 500 && this.count_percorso < 3500)
          this.count_percorso += 12;
        else
          this.count_percorso += 4;
        this.latlong = this.percorso[this.count_percorso++];
      }
      else {
        clearInterval(simulazione);
        this.count_percorso = 0;
      }
      this.fake_gps();
    }, 50)
  }
  async draw_multilines(colors_selected) {
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
              case 'C6': return { color: colors_selected[3].color.coding, opacity: opacity_value };
              case 'C7': return { color: colors_selected[4].color.coding, opacity: opacity_value };
              default: return { color: undefined };
            }
          }
        }).addTo(this.map);
      });
  }
  load_layers_street_close() {

    this.layers_array_close_street = Object.keys(this.myLine_layer._layers).map((key) => this.myLine_layer._layers[key]);
    this.marker_circle_closest_street.setLatLng(this.latlong)
    this.bound_circle_marker = [[this.marker_circle_closest_street._pxBounds.max.x, this.marker_circle_closest_street._pxBounds.max.y], [this.marker_circle_closest_street._pxBounds.min.x, this.marker_circle_closest_street._pxBounds.min.y]];

  }
  countLayers() {
    let i = 0;
    this.map.eachLayer(function () { i += 1; });
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
    this.marker_circle_closest_street.addTo(this.map)
    this.marker_position.addTo(this.map);
  }
  fake_gps() {
    if (this.latlong != undefined) {
      this.marker_position.setLatLng(this.latlong);
      this.marker_circle.setLatLng(this.latlong);
      this.marker_circle.setRadius(this.accuracy);
      // if (this.dataService.getCheckboxclose_street().isChecked) {
      //   this.check_close_street();
      // }
      if (this.focus_on_marker)
        this.map.setView(this.latlong);
    }

  }
  watch_Position() {
    this.checkGPSPermission();
    navigator.geolocation.watchPosition((position => {
      //this.enable_device_orientation();
      this.latlong = [position.coords.latitude, position.coords.longitude];
      this.accuracy = position.coords.accuracy;
      this.geolocation.getCurrentPosition;
      this.marker_position.setLatLng(this.latlong);
      this.marker_circle.setLatLng(this.latlong);
      this.marker_circle.setRadius(this.accuracy);
      if (this.focus_on_marker)
        this.map.setView(this.latlong);
    }), ((error) => {
      this.checkGPSPermission();
      //alert('Alert_code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }), { enableHighAccuracy: true });
  }
  getPosition() {
    this.checkGPSPermission();
    this.invert_arrow_color();
    if (this.state_button_arrow.color == 'dark')
      this.map.setView(this.latlong, 18);
    this.focus_on_marker = !this.focus_on_marker;
  }
  reverse_coords() {
    // setInterval(() => {
    //   if (this.latlong != undefined)
    //     fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.latlong[0] + '&lon=' + this.latlong[1] + '&extratags=1&zoom=17')
    //       .then((response) => response.json())
    //       .then((json) => {
    //         // console.log(json.display_name);
    //         // console.log(json);
    //         // console.log('');
    //         if (json.extratags.description != undefined) {
    //           var tags = json.extratags.description.split(';');
    //           if (tags.length > 10) {
    //             var new_idee = tags[1].split(':')[1];
    //             if (new_idee != this.ide_corsia) {
    //               this.ide_corsia = new_idee;
    //               this.check_street(tags, json.address.road);
    //             }
    //           }
    //         }
    //       })
    // }, 3000);
  }
  check_street(tags, address) {
    var authoriz_user = this.dataService.getListAuthorizzation();
    var is_authorized = false;
    console.log(tags);
    for (var i = 4; i < 15 && !is_authorized; i++) {
      if (i == 14) {
        console.log()
        if ((authoriz_user[i - 4].isChecked && tags[i].split(':')[1] != '0') || (authoriz_user[i - 4].isChecked && tags[9].split(':')[1] != '0'))
          is_authorized = true;
      }
      else if (authoriz_user[i - 4].isChecked && tags[i].split(':')[1] != '0')
        is_authorized = true;
    }
    if (!is_authorized) {
      //this.nativeAudio.play('notification_sound');
      this.custom_alert_page.show_alert();
      this.notifica_page.create_notifica(address, tags[1].split(':')[1].split('0')[0]);
    }
  }
  //Ruota marker_position in base a dove punta il telefono
  enable_device_orientation() {
    this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
        //console.log(data.trueHeading);
        this.degrees = data.trueHeading;
        this.marker_position.setRotationAngle(this.degrees);
        //alert(data);
      }
    );
  }
  send_notifica() {
    this.notifica_page.create_notifica("Via", "B")
  }
  show_alert() {
    //this.nativeAudio.play('notification_sound');
    this.custom_alert_page.show_alert();
  }
}