import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { FavoritPageRoutingModule } from './favorit-routing.module';

import { FavoritPage } from './favorit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    FavoritPageRoutingModule
  ],
  declarations: [FavoritPage]
})
export class FavoritPageModule {}
