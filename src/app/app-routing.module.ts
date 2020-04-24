import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'more/:param',
    loadChildren: () => import('./movie/movielist/movielist.module').then( m => m.MovielistPageModule)
  },
  {
    path: 'movie/:movieId',
    loadChildren: () => import('./movie/moviewdetail/moviewdetail.module').then( m => m.MoviewdetailPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modal/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./modal/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./modal/result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./modal/play/play.module').then( m => m.PlayPageModule)
  },
  {
    path: 'drama/:dramaId',
    loadChildren: () => import('./drama/dramadetail/dramadetail.module').then( m => m.DramadetailPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
