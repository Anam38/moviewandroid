import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { COUNTRY } from '../../../assets/country';

// page
import { SearchPage } from '../search/search.page';
import { ResultPage } from '../result/result.page';
import { from } from 'rxjs';

// Declare jquery
declare var $;

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  category : string;

  YearsList : any;
  CountryList : any;
  categoryList : any;

  constructor(
    navParams: NavParams,
    private modalController : ModalController,
  ) {
    this.category = navParams.get('category');    
  }
  
  ngOnInit() {
    this.categoryList = ['Action','Adventure','Adult','Comedy','Crime','Drama','Horror','Mystery','Romance','Sci - Fi','Thriller','War'];
    this.CountryList = ['Amerika','Australia','China','France','Hongkong','India','Indonesia','Jepang','Kanada','Korea','Singapura','Thailand'];
    this.YearsList = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'];
  }
  // open modal searching
  async result(param) {
    const modal = await this.modalController.create({
      component: ResultPage,
      componentProps: {
        'category': param
      }
    });
    
    return await modal.present();
  }

  // open modal searching
  async SearchModal() {
    const modal = await this.modalController.create({
      component: SearchPage
    });
    
    return await modal.present();
  }
  // dismissmodal
  dismissModal() {
    this.modalController.dismiss();
  }
}
