import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private list_authorization = [
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
  private display_info_autorizz = ['block', 'block', 'block', 'block', 'block']; //0->A 1->B 2->C1 3->C6 4->C7
  private checkboxclose_street = { val: "Corsia riservata nelle vicinanze", isChecked: false };
  private checkbox_ecoMode = { val: "Riduci frequenza avvisi", isChecked: false };
  private selected_form_alert;
  private lista_filtro = JSON.parse(JSON.stringify(this.list_authorization));
  constructor() {
    console.log('costruttore service')
    var app = JSON.parse(window.localStorage.getItem('checkboxclose_street'));
    if (app != null)
      this.checkboxclose_street = app;
    app = JSON.parse(window.localStorage.getItem('checkbox_ecoMode'));
    if (app != null)
      this.checkbox_ecoMode = app;
  }
  setLastDatasFiltro(data = [{ id: '', val: '', isChecked: false }]) {
    this.lista_filtro = data;
  }
  getLastDatasFiltro() {
    return this.lista_filtro;
  }
  getSelectedFormAlert() {
    return this.selected_form_alert;
  }
  setSelectedFormAlert(data = { id: 0, name: '', css_class: '', div_class: '', ion_icon_class: '', ion_icon_name: '' }) {
    this.selected_form_alert = data;
  }
  getListAuthorizzation() {
    return this.list_authorization;
  }
  setListAuthorizzation(list = [{ id: '', val: '', isChecked: false }]) {
    this.list_authorization = list;
    this.setLastDatasFiltro(list);
  }
  getNotListAuthorizzation() {
    var app = JSON.parse(JSON.stringify(this.getLastDatasFiltro()));
    app.forEach(el => {
      el.isChecked = !el.isChecked;
    });
    return app;
  }
  setDisplayInfoAutorizz(data = []) {
    this.display_info_autorizz = data;
  }
  getDisplayInfoAutorizz() {
    return this.display_info_autorizz;
  }
  getCheckboxclose_street() {
    return this.checkboxclose_street;
  }
  getCheckBoxEcoMode(){
    return this.checkbox_ecoMode;
  }
  getCorsieFromAutorizzazioni(lista_autorizzazioni = [{ id: '', val: '', isChecked: false }]) {
    var selected_data = ['none', 'none', 'none', 'none', 'none'];
    for (var i = 0; i < lista_autorizzazioni.length; i++) {
      if (lista_autorizzazioni[i].isChecked) {
        switch (lista_autorizzazioni[i].id) {
          case 'bus_urb': {
            selected_data[0] = 'block';
            selected_data[1] = 'block';
            selected_data[2] = 'block';
            break;
          }
          case 'bus_extra':
          case 'hand':
          case 'ncc':
          case 'ff_armate':
          case 'deroga':
          case 'taxi': {
            selected_data[0] = 'block';
            selected_data[1] = 'block';
            break;
          }
          case 'mezzi_op':
          case 'pol_socc': {
            selected_data[0] = 'block';
            selected_data[1] = 'block';
            selected_data[4] = 'block';
            break;
          }
          case 'autorizz': {
            selected_data[1] = 'block';
            selected_data[4] = 'block';
            break
          }
          case 'soccorso': {
            selected_data[0] = 'block';
            selected_data[1] = 'block';
            selected_data[3] = 'block';
            selected_data[4] = 'block';
            break
          }
        }
      }
    }
    //console.log(selected_data)
    return selected_data;
  }
  createLengendHTMLFromColorsSelected(colors = [{ corsia: '', color: { val: '', coding: '' }, isChecked: true }]) {
    var innerHTML = '';
    for (var i = 0; i < colors.length; i++) {
      if (colors[i].isChecked) {
        // console.log(colors[i])
        innerHTML +=
          '<div class="row"> <i class ="color" style="background:' + colors[i].color.coding + '"></i> ' + '<p id="testo">' +
          'Corsia ' + colors[i].corsia + ' </p></div>';
      }
    }
    return innerHTML;
  }
}
