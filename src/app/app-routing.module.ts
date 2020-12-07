import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'selection-line-color',
    loadChildren: () => import('./selection-line-color/selection-line-color.module').then( m => m.SelectionLineColorPageModule)
  },
  {
    path: 'custom-alert',
    loadChildren: () => import('./custom-alert/custom-alert.module').then( m => m.CustomAlertPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
