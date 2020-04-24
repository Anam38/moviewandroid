import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DramadetailPageRoutingModule } from './dramadetail-routing.module';

import { DramadetailPage } from './dramadetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DramadetailPageRoutingModule
  ],
  declarations: [DramadetailPage]
})
export class DramadetailPageModule {}
