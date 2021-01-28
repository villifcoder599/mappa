import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      {
        path:'mappa',
        loadChildren:()=>import("../mappa/mappa.module").then(m=>m.MappaPageModule)
      },
      {
        path:'notifica',
        loadChildren:()=>import("../notifica/notifica.module").then(m=>m.NotificaPageModule)
      },
      {
        path:'impostazioni',
        loadChildren:()=>import("../impostazioni/impostazioni.module").then(m=>m.ImpostazioniPageModule)
      },
      // {
      //   path:'',
      //   redirectTo:'/tabs/mappa',
      //   pathMatch:'full'
      // }
    ]
  },
  // {
  //   path:'',
  //   redirectTo:'/tabs/mappa',
  //   pathMatch:'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
