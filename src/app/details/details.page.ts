import { Component, OnInit, Injectable } from '@angular/core';
import { MappaPage } from '../mappa/mappa.page'

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  init = false;
  last_data_user;
  tags_name = [
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
  constructor(private mappa: MappaPage) {

  }
  ionViewDidEnter() {
    var iterator_name = this.mappa.tags_name;
    this.last_data_user=JSON.parse(window.localStorage.getItem('autoriz_user'));
    if(this.last_data_user==null)
      this.last_data_user=this.mappa.autoriz_user;
    console.log(this.mappa.autoriz_user);
    console.log(iterator_name);
    console.log(this.mappa.accuracy);
     for (var i = 0; i < iterator_name.length; i++) {
       this.tags_name[i].isChecked = this.last_data_user[iterator_name[i]] == 0 ? false : true;
       this.tags_name[i].id = iterator_name[i];
     }
  }
  update_data(event) {
    this.mappa.set_autoriz_user(event.id, event.isChecked == true ? 1 : 0)
    console.log(this.mappa.autoriz_user[event.id]);
    console.log(event);
  }

}
