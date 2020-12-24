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
    { id: '', val: 'Bus Urbano', isChecked: false },
    { id: '', val: 'Bus Extraurbano', isChecked: false },
    { id: '', val: 'Handicap', isChecked: false },
    { id: '', val: 'Taxi', isChecked: false },
    { id: '', val: 'Ncc', isChecked: false },
    { id: '', val: 'Servizi di polizia e soccorso', isChecked: false },
    { id: '', val: 'Forze armate', isChecked: false },
    { id: '', val: 'Mezzi operativi', isChecked: false },
    { id: '', val: 'Autorizzazioni', isChecked: false },
    { id: '', val: 'Deroga', isChecked: false },
    { id: '', val: 'Soccorso', isChecked: false }
  ];
  constructor() {

  }
  ionViewDidEnter() {
    var app=JSON.parse(window.localStorage.getItem('autoriz_user'));
    console.log(this.autoriz_user);
      for (var i = 0; i < app.length; i++) {
        if(app[i].isChecked)
          this.autoriz_user[i].isChecked = true;
      }
  }
  update_data(event) {
    window.localStorage.setItem('autoriz_user', JSON.stringify(this.autoriz_user));
    console.log(event);
  }
}
