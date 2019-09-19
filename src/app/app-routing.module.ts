import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'power-profile',
    loadChildren: './power-profile/power-profile.module#PowerProfilePageModule'
  },
  {
    path: 'overview/:type',
    loadChildren: './overview/overview.module#OverviewPageModule'
  },
  {
    path: 'power-profile-detail/:name',
    loadChildren: './power-profile-detail/power-profile-detail.module#PowerProfileDetailPageModule'
  },
  {
    path: 'power-profile-create',
    loadChildren: './power-profile-create/power-profile-create.module#PowerProfileCreatePageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
