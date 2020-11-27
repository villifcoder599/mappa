import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificaPage } from './notifica.page';

const routes: Routes = [
  {
    path: '',
    component: NotificaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificaPageRoutingModule {}
