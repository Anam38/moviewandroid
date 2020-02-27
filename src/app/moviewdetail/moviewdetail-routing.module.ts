import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviewdetailPage } from './moviewdetail.page';

const routes: Routes = [
  {
    path: '',
    component: MoviewdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviewdetailPageRoutingModule {}
