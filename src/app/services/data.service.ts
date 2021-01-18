import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  init=0;
  list_authorization = [
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
  display_info_autorizz = ['block', 'block', 'block', 'block', 'block']; //0->A 1->B 2->C1 3->C6 4->C7
  constructor() {}
  getInit(){
    return this.init;
  }
  setInit(){
    this.init=1
  }
  getListAuthorizzation(){
    return this.list_authorization;
  }
  setListAuthorizzation(list){
    this.list_authorization=list;
  }
  setDisplayInfoAutorizz(data) {
    this.display_info_autorizz = data;
  }
  getDisplayInfoAutorizz() {
    return this.display_info_autorizz;
  }
  
}
