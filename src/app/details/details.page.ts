import { Component } from '@angular/core';
import { MappaPage } from '../mappa/mappa.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  autoriz_user = [];
  constructor(private dataService: DataService) {
    this.load_data()
  }
  ionViewDidEnter() {
    this.load_data();
  }
  update_data() {
    window.localStorage.setItem('autoriz_user', JSON.stringify(this.autoriz_user));
    this.dataService.setListAuthorizzation(this.autoriz_user);
  }
  get_authorization_user() {
    this.load_data();
    return this.autoriz_user;
  }
  load_data() {
    var app = JSON.parse(window.localStorage.getItem('autoriz_user'));
    console.log(app)
    if (app != undefined)
      this.dataService.setListAuthorizzation(app);
    this.autoriz_user = JSON.parse(JSON.stringify(this.dataService.getListAuthorizzation()));
  }
}
