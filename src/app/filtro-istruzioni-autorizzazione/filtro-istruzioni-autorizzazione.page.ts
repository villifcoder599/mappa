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
  }
  ionViewDidEnter() {
    this.datas = JSON.parse(JSON.stringify(this.dataService.getLastDatasFiltro()));
  }
  //0->A 1->B 2->C1 3->C6 4->C7
  onBack() {
    this.dataService.setLastDatasFiltro(this.datas);
    console.log(this.datas)
    var selected_data = this.dataService.getCorsieFromAutorizzazioni(this.datas);
    this.dataService.setDisplayInfoAutorizz(selected_data);
  }
  deselezionaTutto() {
    this.datas.forEach(element => {
      element.isChecked=false;
    });
  }
}
