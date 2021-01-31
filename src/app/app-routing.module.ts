import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { Platform } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: 'selection-line-color',
    loadChildren: () => import('./selection-line-color/selection-line-color.module').then(m => m.SelectionLineColorPageModule)
  },
  {
    path: 'custom-alert',
    loadChildren: () => import('./custom-alert/custom-alert.module').then(m => m.CustomAlertPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialPageModule)
  },
  {
    path: 'istruzioni-autorizzazioni',
    loadChildren: () => import('./istruzioni-autorizzazioni/istruzioni-autorizzazioni.module').then(m => m.IstruzioniAutorizzazioniPageModule)
  },
  {
    path: 'filtro-istruzioni-autorizzazione',
    loadChildren: () => import('./filtro-istruzioni-autorizzazione/filtro-istruzioni-autorizzazione.module').then(m => m.FiltroIstruzioniAutorizzazionePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private platform: Platform, private router: Router) {
    this.platform.ready().then(() => {
      var tutorial = JSON.parse(window.localStorage.getItem('tutorial'));
      if ((tutorial)) {
        this.router.navigateByUrl('/tabs/mappa');
      }
      else
        this.router.navigateByUrl('/tutorial');
    })
  }
}
