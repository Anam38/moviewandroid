import { Component, ViewEncapsulation , ElementRef, NgZone } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../../modal/search/search.page';
import { CategoryPage } from '../../modal/category/category.page';
import { IonSlides } from '@ionic/angular';
// Declare jquery
declare var $;

// API Provider
import { DramaService } from '../../services/api/drama/drama.service';

import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../../../environments/environment';
import { StatusbarService } from '../../services/statusbar/statusbar.service';

@Component({
  selector: 'app-drama',
  templateUrl: 'drama.page.html',
  styleUrls: ['../../../assets/scss/main.scss','./drama.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DramaPage {

  // variabel
  playNow : object;
  soon    : object;
  populer : object;

  loaderCount : any[];

  url_img     : string;

  drama_pages : number;

  constructor(
    private zone: NgZone,
    public router: Router,
    public storage: Storage,
    public platform: Platform,
    public navCtrl: NavController,
    public statusbar : StatusbarService,
    public apiprovider : DramaService,
    public modalController : ModalController,
  ) {
      this.url_img = URL_IMG_TMDB;
      this.drama_pages = 1;
      
      this.loaderCount = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      
      this.dramaplayingnow();
      this.soonDrama();

      var self = this;
      // jquery srcipt
      this.zone.run(() => {
        $(document).on('click','#dramadetail',function(){
            var movietitle = $(this).attr('dataTitle');
            var movieID = $(this).attr('dataID');
            
            self.dramaDetail([movietitle,movieID]);

          })
        })
      //end  jquery srcipt
  }
  slidesDidLoadDrama(slides: IonSlides) {
    slides.startAutoplay();
  }

  // on scroll down
  onScroll(event) {
    if(event.detail.scrollTop > 35){
      document.getElementById('header-drama').setAttribute("style", "background-color:#151517;");
    }else if(event.detail.scrollTop  == 0 ){
      document.getElementById('header-drama').removeAttribute("style");
    }
  };

  public Dramamore(param){
    this.apiprovider.param = param
    this.router.navigate(['more/'+param]);
  }

  // refresh page
    doRefresh(event) {
      console.log('Begin async operation');
      setTimeout(() => {
        console.log('Async operation has ended');
        window.location.reload();
        this.drama_pages = 1;
        this.dramaplayingnow()
        event.target.complete();
      }, 2000);
    }
    
     // move to detail movie
    public dramaDetail(param) {
      
      var title = param[0];
      var dramaID = param[1];      
      
      for (var _i = 0; _i < param[0].length; _i++) {
        title = title.replace(" ", "-");
      }
      
      this.apiprovider.ID = dramaID

      this.router.navigate(['drama/'+title]);
    }

    // data api play now
    dramaplayingnow(){
      this.apiprovider.DramaApiUrl('playnow')
      .subscribe(
        resdata => {
          console.log(resdata);
          
          this.playNow = resdata;
          
            setTimeout(function(){
                document.getElementById('loader-drama').hidden = true;
            },500);
            
          },err=> {
            console.log('error');
          });
        }
      // get data api movie soon
    soonDrama() {
      this.apiprovider.DramaApiUrl('soon')
      .subscribe(
        resdata => {
          this.soon = resdata['results'] ;
    },err=> {
      console.log('error');
  });
}



  // load data after scroll up 
  loadDataDrama(event,page) {

    var page = page+1;
    
    if(page >= 3){
      document.getElementById('loadDrama').hidden = true;
    }
    
    setTimeout(() => {
      console.log('Done');

      this.dramanextpage(page);

      event.target.complete();

    }, 1000);
  }

  // get data movie after scroll up
  dramanextpage(page){

    var html : string;

    this.apiprovider.loadDrama(page)
    .subscribe(
      resdata => {
        this.drama_pages = page;
        
        let data = resdata
        
        for (let item in data) {
              html += '<ion-col size="4" id="dramadetail" dataTitle="'+data[item].title+'" dataID="'+data[item].id+'">'+
                        '<ion-card class="card-body-grid">'+
                          '<div class="rating-duration">'+
                            '<ion-icon name="star" color="warning" class="icon-size-11"></ion-icon>'+
                            '<span class="rating"></span>'+
                            '<ion-icon name="time" color="warning" class="duration icon-size-11"></ion-icon>'+
                            '<span class="rating"></span>'+
                          '</div>'+
                          '<span class="dr-episode "><i>Eps </i>'+data[item].total_episode+'</span>'+
                          '<img src="'+data[item].poster+'" alt="">'+
                          '<span class="movie-info">'+
                            '<ion-card-title class="card-title">'+ data[item].title +'</ion-card-title>'+
                          '</span>'+
                        '</ion-card>'+
                      '</ion-col>'

          }
          html = html.replace("undefined","");
          
          document.getElementById('drama-list-content').insertAdjacentHTML('beforeend', html);
        
      },err=> {
        console.log('error');
    });
  }

  // // open modal searching
  // async SearchModal() {
  //   const modal = await this.modalController.create({
  //     component: SearchPage
  //   });

  //   return await modal.present();
  // }

  // // open modal searching category
  // async CategoryModal(category) {
  //   const modal = await this.modalController.create({
  //     component: CategoryPage,
  //     componentProps: {
  //       'category': category
  //     }
  //   });

  //   return await modal.present();
  // }
}
