import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroIstruzioniAutorizzazionePage } from './filtro-istruzioni-autorizzazione.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroIstruzioniAutorizzazionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroIstruzioniAutorizzazionePageRoutingModule {}
