import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IstruzioniAutorizzazioniPage } from './istruzioni-autorizzazioni.page';

const routes: Routes = [
  {
    path: '',
    component: IstruzioniAutorizzazioniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IstruzioniAutorizzazioniPageRoutingModule {}
