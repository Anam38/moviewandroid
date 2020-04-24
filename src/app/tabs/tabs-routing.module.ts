import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movie',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../movie/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'drama',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../drama/drama/drama.module').then(m => m.DramaPageModule)
          }
        ]
      },
      {
        path: 'anime',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../anime/anime/anime.module').then(m => m.AnimePageModule)
          }
        ]
      },
      {
        path: 'favorit',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../favorit/favorit.module').then(m => m.FavoritPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/movie',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/movie',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
