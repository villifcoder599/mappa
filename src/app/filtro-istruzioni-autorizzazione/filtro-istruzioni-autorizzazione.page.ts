import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
@Component({
  selector: 'app-filtro-istruzioni-autorizzazione',
  templateUrl: './filtro-istruzioni-autorizzazione.page.html',
  styleUrls: ['./filtro-istruzioni-autorizzazione.page.scss'],
})
export class FiltroIstruzioniAutorizzazionePage {
  datas = [

  ];
  last_datas;
  constructor(private dataService: DataService) {
    console.log('costruttore filtro')
    this.datas = this.dataService.getLastDatasFiltro();
    //this.onBack();
  }
  ionViewDidEnter() {
    this.datas = JSON.parse(JSON.stringify(this.dataService.getLastDatasFiltro()));

    // console.log(this.datas)
    // //this.datas = this.last_datas;
    // //var selected=this.dataService.getDisplayInfoAutorizz();
    // this.datas.forEach(el => {
    //   el.isChecked
    // });
    // //console.log(this.datas)
    //var value=this.dataService.getIsChecked();
    //console.log(value);
    //for(var i=0;i<this.datas.length;i++){
    //  this.datas[i].isChecked=value[i];

  }
  //0->A 1->B 2->C1 3->C6 4->C7
  onBack() {
    this.dataService.setLastDatasFiltro(this.datas);
    console.log(this.datas)
    var selected_data = this.dataService.getCorsieFromAutorizzazioni(this.datas);
    //console.log(selected_data)

    //console.log(selected_data);
    // for(var i=0;i<this.datas.length;i++)
    //   this.dataService.setIsCheckedIndex(this.datas[i].isChecked,i);
    //console.log(selected_data);
    //this.dataService.setListAuthorizzation(this.datas);
    this.dataService.setDisplayInfoAutorizz(selected_data);
  }
  deselezionaTutto() {
    this.datas.forEach(element => {
      element.isChecked=false;
    });
  }
}
