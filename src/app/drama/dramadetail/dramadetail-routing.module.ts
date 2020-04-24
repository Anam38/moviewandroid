import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DramadetailPage } from './dramadetail.page';

const routes: Routes = [
  {
    path: '',
    component: DramadetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DramadetailPageRoutingModule {}
