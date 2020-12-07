import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.page.html',
  styleUrls: ['./custom-alert.page.scss'],
})
export class CustomAlertPage implements OnInit {
  list_alert=[{
    id:0,
    name:'Divieto_accesso',
    css_class:'rounded-red-class',
    div_class:'msg',
    ion_icon_class:'alert',
    ion_icon_name:'alert'

  },{
    id:1,
    name:'Default',
    css_class:'',
    div_class:'',
    ion_icon_class:'',
    ion_icon_name:''
  },{
    id:2,
    name:'test3',
    css_class:'',
    div_class:'',
    ion_icon_class:'',
    ion_icon_name:''
  }];
  selected_radio=this.list_alert[0];
  constructor() {
  }
  ionViewDidEnter(){
    this.selected_radio=JSON.parse(window.localStorage.getItem('selected_radio'));
    if(this.selected_radio==null)
      this.selected_radio=this.list_alert[0];
  }
  ngOnInit() {
  }
  radioGroupChange(event){
    this.selected_radio=this.list_alert[event.detail.value.id];
    console.log(this.selected_radio);
    window.localStorage.setItem('selected_radio', JSON.stringify(this.selected_radio));
  }
}
