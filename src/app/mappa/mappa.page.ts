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
import * as turf from '@turf/turf';
import { DataService } from '../services/data.service';


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
  wait_animation = 0; //animatiion search
  timeout; //searchbar
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
  accuracy = 5;
  interval_reverseCoords;
  degrees: number;
  myLine_layer = new L.GeoJSON;
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
  percorso; //per simulazione percorso
  count_percorso = 0; //per simulazione percorso
  marker_circle_closest_street;
  json_file = [];
  last_latlong = [0, 0];
  last_show_alert = null;
  /*ionic cordova run android --prod */
  constructor(private dataService: DataService, private gestureCtrl: GestureController,
    private androidPermissions: AndroidPermissions, private detailsPage: DetailsPage, private tabsPage: TabsPage,
    private router: Router, private custom_alert_page: CustomAlertPage, private notifica_page: NotificaPage,
    private locationAccuracy: LocationAccuracy, private diagnostic: Diagnostic, private nativeAudio: NativeAudio,
    private localNotifications: LocalNotifications, private alertController: AlertController,
    private deviceOrientation: DeviceOrientation, private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, private http: HttpClient,
    private sel_line_color_page: SelectionLineColorPage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.addresses.length = 0;
      this.latlong = [43.7979122, 11.2441981]
      //this.latlong = [43.79828093974891, 11.242809123929726] //viale morgagni corsia riservata
      //this.latlong = [43.798245080028536, 11.24322352064662];
      this.marker_circle = L.circle(this.latlong, {
        radius: this.accuracy,
        stroke: false,
        color: '#1275ff',
      });
      this.marker_circle_closest_street = L.circle(this.latlong, {
        radius: JSON.parse(JSON.stringify(this.dataService.getRadiusMarkerCircle())),
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
  last_unique_points = [];

  async check_near_street() {
    this.marker_circle_closest_street.setRadius(this.dataService.getRadiusMarkerCircle());
    var list_intersect = [];
    this.marker_circle_closest_street.setLatLng(this.latlong);
    var distance_from_layers = [];
    for (var i = 0; i < this.json_file.length; i++) {
      var multiline1 = this.json_file[i].feature.geometry; // coords multiline
      distance_from_layers.push({
        layer: this.json_file[i].feature,
        point: (turf.nearestPointOnLine(turf.feature(multiline1), turf.point([this.latlong[1], this.latlong[0]]))),
        isSay: false
      })
    }
    distance_from_layers.forEach(el => {
      if ((el.point.properties.dist * 1000) < this.dataService.getRadiusMarkerCircle()) {
        list_intersect.push(el)
      }
    });
    const unique_point = [];
    function compare(a, b) {
      if (a.point.properties.dist < b.point.properties.dist) {
        return -1;
      }
      if (a.point.properties.dist > b.point.properties.dist) {
        return 1;
      }
      return 0;
    }
    list_intersect.sort(compare);
    list_intersect.map(x => unique_point.filter(a => a.layer.properties.desc == x.layer.properties.desc).length > 0 ? null : unique_point.push(x));
    var count = 0;
    if (this.last_unique_points != null) {
      unique_point.forEach(element => {
        var pos = this.last_unique_points.map(function (x) { return x.layer.properties.desc }).indexOf(element.layer.properties.desc);
        if (pos != -1) {
          count++;
          element.isSay = true;
        }
      });
      if (count != unique_point.length) {
        this.last_unique_points = unique_point;
        unique_point.forEach(el => {
          if (!el.isSay) {
            this.custom_alert_page.sayText('Rilevata corsia riservata a ' + Math.round((el.point.properties.dist) * 1000) + ' metri da qui, in ' + el.layer.properties.desc)
            //new L.Marker([el.point.geometry.coordinates[1], el.point.geometry.coordinates[0]]).addTo(this.map);
            console.log('Rilevata corsia riservata a ' + Math.round((el.point.properties.dist) * 1000) + ' metri da qui, in ' + el.layer.properties.desc)
          }
        });
      }
    }
    this.last_unique_points = unique_point;
  }

  private swipe_BottomUpEvent_Searchbar() {
    if (!this.actived_big_searchbar) {
      this.bottomUpAnimation(this.searchbar_element.nativeElement, 0, -this.searchbar_element.nativeElement.offsetHeight - 5);
      this.enabled_animation_click_searchbox = 1;
    }
  }
  onClickMap() {
    if (!this.actived_big_searchbar && this.enabled_animation_click_searchbox) {
      this.bottomUpAnimation(this.searchbar_element.nativeElement, -this.searchbar_element.nativeElement.offsetHeight - 5, 0);
      this.enabled_animation_click_searchbox = 0;
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
      if (this.pin_search.marker != null)
        this.set_searchbox_value({ name: this.pin_search.name, coords: this.pin_search.coords })
      else
        this.set_searchbox_value({ name: '', coords: [] })
      this.show_map_onBack();
    }
  }
  async hide_map_onclick() {

    if (!this.wait_animation && !this.actived_big_searchbar) {
      this.icon_name_searchbar = 'arrow-back';
      this.actived_big_searchbar = 1;
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
    this.actived_big_searchbar = 0;
    this.icon_name_searchbar = 'search';
    this.searchbar_element.nativeElement.style.position = 'absolute';
    var margin_right = parseFloat(window.getComputedStyle(this.searchbar_element.nativeElement).getPropertyValue('margin-right'));
    this.mapAnimation(this.map_element.nativeElement.offsetHeight, 0,
      this.searchbar_element.nativeElement.offsetWidth, this.searchbar_element.nativeElement.offsetWidth - this.delta_searchbar + margin_right * 2);

  }
  mapAnimation(start, end, width_start, width_end) {
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
  }
  invert_arrow_color() {
    switch (this.state_button_arrow.color) {
      case "light": {
        this.setArrowColor('dark')
      }; break;
      case "dark": {
        this.setArrowColor('light')
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
      div.innerHTML = this.dataService.createLengendHTMLFromColorsSelected(colors_selected);
      return div;
    })
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
  search(event) {
    this.addresses = [];
    if (this.timeout != null)
      clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.search_word(event);
    }, 400);
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
    this.selectedAddress = txt;
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
  }
  ionViewDidEnter() {
    if (this.map == null) {
      this.initMap();
      this.enable_device_orientation();
    }
    var map_colors = this.sel_line_color_page.get_colors();
    this.showMap();
    this.create_legend(map_colors);
    this.set_width_searchbar();
    this.draw_multilines(map_colors);
    this.checkGPSPermission();
    if (this.dataService.getCheckAlertOnCorsia())
      this.reverse_coords();
  }
  set_width_searchbar() {
    var elements = document.getElementsByClassName('leaflet-top leaflet-right');
    this.delta_searchbar = elements[0].clientWidth + this.searchbar_element.nativeElement.offsetLeft;
    this.searchbar_element.nativeElement.style.width = (document.getElementById('content').offsetWidth - elements[0].clientWidth - this.searchbar_element.nativeElement.offsetLeft) + 'px';
  }
  //controllo permesso accesso al gps
  async checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.askToTurnOnGPS();
        } else {
          this.requestGPSPermission();
        }
      },
      err => { }
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
      () => {

      },
      error => alert('ask to turn on gps')
    );
  }
  initMap() {
    this.map = L.map('myMap', { zoomControl: false, attributionControl: false }).setView([this.latlong[0], this.latlong[1]], 17);
    this.go_next_map_view();
    this.map.on('dragstart', () => {
      this.focus_on_marker = false;
    });
    this.map.on('dragend', (event) => this.drag_end_event(event));
    document.addEventListener('ionBackButton', (ev) => {
      this.icon_searchbar_onBack();
    });
    this.long_tap_map();
  }
  long_tap_map() {
    this.map.on("contextmenu", (e) => {
      fetch('https://photon.komoot.io/reverse?lon=' + e.latlng.lng + '&lat=' + e.latlng.lat)
        .then((response) => response.json())
        .then((json) => {
          this.set_searchbox_value({ name: this.create_name_from_json(json.features[0]), coords: [json.features[0].geometry.coordinates[1], json.features[0].geometry.coordinates[0]] })
          this.set_Pin_Marker([e.latlng.lat, e.latlng.lng], false);
        });
    });
  }
  drag_end_event(event) {
    if (event.distance > 80 && this.state_button_arrow.state) {
      this.invert_arrow_color();
    }
    if (this.state_button_arrow.state) {
      this.map.setView(this.latlong);
      this.focus_on_marker = true;
    }
  }

  async simula_percorso() {
    while (true && this.count_percorso != -1) {
      await new Promise(r => setTimeout(r, 50));
      if (this.count_percorso < this.percorso.length) {
        if (this.count_percorso > 500 && this.count_percorso < 3500)
          this.count_percorso += 4;
        else
          this.count_percorso += 2;
        this.latlong = this.percorso[this.count_percorso++];
      }
      else {
        this.count_percorso = -1;
      }
      await this.fake_gps();
    }
  }

  async draw_multilines(colors_selected) {
    fetch("assets/docs/geoJSON_corsie.geojson")
      .then((response) => response.json())
      .then((json) => {
        var opacity_value = 0.7;
        this.myLine_layer.clearLayers();
        if (this.myLine_layer != null) //remove old layer
          this.map.removeLayer(this.myLine_layer);
        json.features.forEach(el => {
          var corsia = el.properties.name.ide_corsia.split('0')[0];
          var n = corsiaToNumber(corsia);
          if (n != -1 && colors_selected[n].isChecked) {
            this.myLine_layer.addData(el)
          }
        });
        this.myLine_layer.setStyle((e) => {
          var corsia = e.properties.name.ide_corsia.split('0')[0];
          switch (corsia) {
            case 'A': return { color: colors_selected[0].color.coding, opacity: opacity_value };
            case 'B': return { color: colors_selected[1].color.coding, opacity: opacity_value };
            case 'C1': return { color: colors_selected[2].color.coding, opacity: opacity_value };
            case 'C6': return { color: colors_selected[3].color.coding, opacity: opacity_value };
            case 'C7': return { color: colors_selected[4].color.coding, opacity: opacity_value };
            default: return { color: undefined };
          }
        });;
        this.myLine_layer.addTo(this.map);
        this.json_file = this.myLine_layer.getLayers();
        function corsiaToNumber(corsia) {
          switch (corsia) {
            case 'A': return 0;
            case 'B': return 1;
            case 'C1': return 2;
            case 'C6': return 3;
            case 'C7': return 4;
            default: return -1;
          }
        };
      });
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
    this.marker_circle.addTo(this.map);
    this.marker_circle_closest_street.addTo(this.map)
    this.marker_position.addTo(this.map);
  }
  async fake_gps() {
    this.marker_position.setLatLng(this.latlong);
    this.marker_circle.setLatLng(this.latlong);
    this.marker_circle.setRadius(this.accuracy);
    if (this.focus_on_marker)
      this.map.setView(this.latlong);

    if (this.dataService.getCheckboxnear_street()) {
      await this.check_near_street();
    }
  }

  watch_Position() {
    // navigator.geolocation.watchPosition((async (position) => {
    //   this.enable_device_orientation();
    //   this.latlong = [position.coords.latitude, position.coords.longitude];
    //   this.accuracy = position.coords.accuracy;
    //   this.marker_position.setLatLng(this.latlong);
    //   this.marker_circle.setLatLng(this.latlong);
    //   this.marker_circle.setRadius(this.accuracy);
    //   if (this.focus_on_marker)
    //     this.map.setView(this.latlong);
    //   if (this.dataService.getCheckboxnear_street()) {
    //     await this.check_near_street();
    //   }
    // }), ((error) => {
    //   alert('Alert_code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    // }), { enableHighAccuracy: true });
  }
  getPosition() {
    this.watch_Position();
    this.invert_arrow_color();
    if (this.state_button_arrow.color == 'dark')
      this.map.setView(this.latlong, this.map.getZoom());
    this.focus_on_marker = !this.focus_on_marker;
  }

  reverse_coords() {
    this.interval_reverseCoords = setInterval(async () => {
      if (this.latlong[0] != this.last_latlong[0] || this.latlong[1] != this.last_latlong[1])
        fetch('https://nominatim.openstreetmap.org/reverse?email=francesco.villi@stud.unifi.it&format=json&lat=' + this.latlong[0] + '&lon=' + this.latlong[1] + '&extratags=1&zoom=17')
          .then((response) => response.json())
          .then((json) => {
            this.last_latlong = this.latlong;
            if (json.extratags.description != undefined) {
              var tags = json.extratags.description.split(';');
              if (tags.length > 10) {
                if (this.last_show_alert != null && this.last_show_alert.address == json.address.road && !this.last_show_alert.isShown) {
                  this.last_show_alert.isShown = true;
                  if (this.dataService.getToggleAlertVisivo())
                    this.custom_alert_page.show_alert();
                  this.custom_alert_page.sayAlert(this.last_show_alert.address)
                  console.log('Sei sulla corsia riservata di ' + this.last_show_alert.address)
                  this.notifica_page.create_notifica(json.address.road, tags[1].split(':')[1].split('0')[0]);
                }
                else
                  this.check_street(tags, json.address.road);
              }
            }
          }).catch(error => { console.log(error); });
    }, 2850)
  }

  check_street(tags, road) {
    var authoriz_user = this.dataService.getListAuthorizzation();
    var is_authorized = false;
    for (var i = 4; i < 15 && !is_authorized; i++) {
      if (i == 14) {
        if ((authoriz_user[i - 4].isChecked && tags[i].split(':')[1] != '0') || (authoriz_user[i - 4].isChecked && tags[9].split(':')[1] != '0'))
          is_authorized = true;
      }
      else if (authoriz_user[i - 4].isChecked && tags[i].split(':')[1] != '0')
        is_authorized = true;
    }
    if (!is_authorized && (this.last_show_alert == null || this.last_show_alert.address != road)) {
      this.last_show_alert = { address: road, isShown: false };

    }
  }

  //Ruota marker_position in base a dove punta il telefono
  enable_device_orientation() {
    this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
        this.degrees = data.trueHeading;
        this.marker_position.setRotationAngle(this.degrees);
      }
      , (e) => alert(e));
  }
}