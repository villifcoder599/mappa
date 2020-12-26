import { Component } from '@angular/core';
import { MappaPage } from '../mappa/mappa.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  init = false;
  autoriz_user = [
    { id: 'bus_urb', val: 'Bus Urbano', isChecked: false },
    { id: 'bus_extra', val: 'Bus Extraurbano', isChecked: false },
    { id: 'hand', val: 'Handicap', isChecked: false },
    { id: 'taxi', val: 'Taxi', isChecked: false },
    { id: 'ncc', val: 'Ncc', isChecked: false },
    { id: 'pol_socc', val: 'Servizi di polizia e soccorso', isChecked: false },
    { id: 'ff_armate', val: 'Forze armate', isChecked: false },
    { id: 'mezzi_op', val: 'Mezzi operativi', isChecked: false },
    { id: 'autorizz', val: 'Autorizzazioni', isChecked: false },
    { id: 'deroga', val: 'Deroga', isChecked: false },
    { id: 'soccorso', val: 'Soccorso', isChecked: false }
  ];
  constructor() {
  }
  ionViewDidEnter() {
    this.load_data();
  }
  update_data(event) {
    window.localStorage.setItem('autoriz_user', JSON.stringify(this.autoriz_user));
  }
  get_authorization_user() {
    this.load_data();
    return this.autoriz_user;
  }
  load_data() {
    var app = JSON.parse(window.localStorage.getItem('autoriz_user'));
    if (app != undefined) {
      for (var i = 0; i < app.length; i++) {
        if (app[i].isChecked)
          this.autoriz_user[i].isChecked = true;
      }
    }
    else
      this.autoriz_user=app;
  }
}
