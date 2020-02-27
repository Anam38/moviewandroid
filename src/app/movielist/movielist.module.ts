import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovielistPageRoutingModule } from './movielist-routing.module';

import { MovielistPage } from './movielist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovielistPageRoutingModule
  ],
  declarations: [MovielistPage]
})
export class MovielistPageModule {}
