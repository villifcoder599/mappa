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
    this.load_data();
    //console.log('load_dataDetails')
  }
  ngOnInit(){
    
  }
  ionViewDidEnter() {
    //this.load_data();
  }
  save_data() {
    window.localStorage.removeItem('colors_selected');
    window.localStorage.setItem('autoriz_user', JSON.stringify(this.autoriz_user));
    this.dataService.setListAuthorizzation(this.autoriz_user);
    console.log(this.dataService.getListAuthorizzation())
  }
  // get_authorization_user() {
  //   //this.load_data();
  //   return this.autoriz_user;
  // }
  load_data() {
    var app = JSON.parse(window.localStorage.getItem('autoriz_user'));
    if (app != undefined){
      this.dataService.setListAuthorizzation(app);
      this.dataService.setLastDatasFiltro(app);
    }
    console.log(this.dataService.getListAuthorizzation())
    this.autoriz_user = this.dataService.getListAuthorizzation();
  }
}
