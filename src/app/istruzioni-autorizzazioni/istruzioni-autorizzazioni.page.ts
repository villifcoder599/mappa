import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FiltroIstruzioniAutorizzazionePage } from '..//filtro-istruzioni-autorizzazione/filtro-istruzioni-autorizzazione.page'
@Component({
  selector: 'app-istruzioni-autorizzazioni',
  templateUrl: './istruzioni-autorizzazioni.page.html',
  styleUrls: ['./istruzioni-autorizzazioni.page.scss'],
})
export class IstruzioniAutorizzazioniPage implements OnInit {

  constructor(private router: Router, private dataService: DataService, private filtro: FiltroIstruzioniAutorizzazionePage) { }

  ngOnInit() {

  }
  setDefaultListFiltro() {
    var def = ['none', 'none', 'none', 'none', 'none'];
    this.dataService.setDisplayInfoAutorizz(def);
  }
  //0->A 1->B 2->C1 3->C6 4->C7
  ionViewDidEnter() {
    //var view = this.dataService.getCorsieFromAutorizzazioni(this.dataService.getLastDatasFiltro());
    var view = this.dataService.getDisplayInfoAutorizz();
    console.log(view)
    var change = false;
    for (var i = 0; i < view.length; i++) {
      if (view[i] == 'block') {
        change = true;
        //  view[i] = 'none'
      }
      // else
      //   view[i] = 'block';
    }
    if (!change) {
      view = ['block', 'block', 'block', 'block', 'block'];
    }
    //console.log(view)
    for (var i = 0; i < view.length; i++) {
      switch (i) {
        case 0: { document.getElementById('A').style.display = view[i]; break; }
        case 1: { document.getElementById('B').style.display = view[i]; break; }
        case 2: { document.getElementById('C1').style.display = view[i]; break; }
        case 3: { document.getElementById('C6').style.display = view[i]; break; }
        case 4: { document.getElementById('C7').style.display = view[i]; break; }
      }
    }
  }
  open_filtro() {
    this.router.navigate(['filtro-istruzioni-autorizzazione']);
  }
}
