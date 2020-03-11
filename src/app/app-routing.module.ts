import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'more/:param',
    loadChildren: () => import('./movielist/movielist.module').then( m => m.MovielistPageModule)
  },
  {
    path: 'movie/:movieId',
    loadChildren: () => import('./moviewdetail/moviewdetail.module').then( m => m.MoviewdetailPageModule)
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
