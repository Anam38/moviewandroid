import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovielistPage } from './movielist.page';

const routes: Routes = [
  {
    path: '',
    component: MovielistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovielistPageRoutingModule {}
