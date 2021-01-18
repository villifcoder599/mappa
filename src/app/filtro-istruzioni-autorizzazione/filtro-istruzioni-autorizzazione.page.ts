import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
@Component({
  selector: 'app-filtro-istruzioni-autorizzazione',
  templateUrl: './filtro-istruzioni-autorizzazione.page.html',
  styleUrls: ['./filtro-istruzioni-autorizzazione.page.scss'],
})
export class FiltroIstruzioniAutorizzazionePage implements OnInit {
  datas = [

  ];
  constructor(private dataService: DataService) {

  }
  ionViewDidEnter() {
    this.datas = (this.dataService.getListAuthorizzation());
    //var value=this.dataService.getIsChecked();
    //console.log(value);
    //for(var i=0;i<this.datas.length;i++){
    //  this.datas[i].isChecked=value[i];

  }
  ngOnInit() {
  }
  inverti_selezione() {
    this.datas.forEach(el => {
      el.isChecked = !(el.isChecked);
    });
  }
  //0->A 1->B 2->C1 3->C6 4->C7
  onBack() {
    var selected_data = ['none', 'none', 'none', 'none', 'none'];
    var change = false;
    for (var i = 0; i < this.datas.length; i++) {
      if (this.datas[i].isChecked) {
        change = true;
        switch (this.datas[i].id) {
          case 'bus_urb': {
            selected_data[0] = 'block';
            selected_data[1] = 'block';
            selected_data[2] = 'block';
            break;
          }
          case 'bus_ext':
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
    if (!change)
      selected_data = ['block', 'block', 'block', 'block', 'block'];
    // for(var i=0;i<this.datas.length;i++)
    //   this.dataService.setIsCheckedIndex(this.datas[i].isChecked,i);
    //console.log(selected_data);
    //this.dataService.setListAuthorizzation(this.datas);
    this.dataService.setDisplayInfoAutorizz(selected_data);
  }
}
