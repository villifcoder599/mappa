import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular'
@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.page.html',
  styleUrls: ['./custom-alert.page.scss'],
})
export class CustomAlertPage {
  @ViewChild('radio_gruppo') radio_group: IonRadioGroup;
  list_alert = [{
    id: 0,
    name: 'Default',
    css_class: '',
    div_class: 'msg_custom',
    ion_icon_class: '',
    ion_icon_name: ''

  }, {
    id: 1,
    name: 'Divieto accesso',
    css_class: 'container',
    div_class: "text "+'msg_custom',
    ion_icon_class: 'alert',
    ion_icon_name: 'alert'
  }, {
    id: 2,
    name: 'Arcobaleno',
    css_class: 'rounded-2-class',
    div_class: 'msg_custom',
    ion_icon_class: 'alert',
    ion_icon_name: 'alert'
  }];
  selected_radio = this.list_alert[0];
  constructor() {
  }
  ionViewDidEnter() {
    var app = JSON.parse(window.localStorage.getItem('selected_radio'));
    if (app != null)
      this.selected_radio = app;
    console.log(this.selected_radio);
    this.radio_group.value = this.selected_radio;
  }
  ngOnInit() {

  }
  radioGroupChange(event) {
    this.selected_radio = this.list_alert[event.detail.value.id];
    window.localStorage.setItem('selected_radio', JSON.stringify(this.selected_radio));
    this.radio_group.value = this.selected_radio;
    //console.log();
  }
}
