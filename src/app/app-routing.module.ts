import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'movie:param',
    loadChildren: () => import('./movielist/movielist.module').then( m => m.MovielistPageModule)
  },
  {
    path: ':movieId',
    loadChildren: () => import('./moviewdetail/moviewdetail.module').then( m => m.MoviewdetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'favorit',
    loadChildren: () => import('./favorit/favorit.module').then( m => m.FavoritPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
