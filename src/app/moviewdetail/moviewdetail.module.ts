import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviewdetailPageRoutingModule } from './moviewdetail-routing.module';

import { MoviewdetailPage } from './moviewdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviewdetailPageRoutingModule
  ],
  declarations: [MoviewdetailPage]
})
export class MoviewdetailPageModule {}
