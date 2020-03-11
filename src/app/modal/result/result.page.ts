import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

//PROVIDER
import { ApiProviderService } from 'src/app/services/api/api-provider.service';
import { Router } from '@angular/router';

// page
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['../../../assets/scss/main.scss','./result.page.scss'],
})
export class ResultPage implements OnInit {
  loaderCount : any;

  keyword : string;

  dataResults : object;

  constructor(
    public router: Router,
    public navParams: NavParams,
    public apiprovider : ApiProviderService,
    private modalController : ModalController,
    ) { 
      this.loaderCount = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      this.keyword = navParams.get('category');
      this.Searching(this.keyword);
    }

  ngOnInit() {
  }
  // searching
  Searching(param){    
    this.apiprovider.SearchWithCategory(param).subscribe(resdata => {
      
      this.dataResults = resdata;      
      
      setTimeout(function(){
          document.getElementById('loader-result').hidden = true;
      },500);
    })
  }
  // open modal searching
  async SearchModal() {
    const modal = await this.modalController.create({
      component: SearchPage
    });
    
    return await modal.present();
  }
  // move to detail movie
  public movieDetail(param) {
      
    var title = param[0];
    var movieID = param[1];      
    
    for (var _i = 0; _i < param[0].length; _i++) {
      title = title.replace(" ", "-");
    }
    
    this.apiprovider.ID = movieID

    this.router.navigate(['movie/'+title]);

    this.dismissModal();
  }

  // dismissmodal
  dismissModal() {
    this.modalController.dismiss();
  }
}
