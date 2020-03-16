import { Component, ViewEncapsulation , ElementRef, NgZone } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../modal/search/search.page';
import { CategoryPage } from '../modal/category/category.page';

// Declare jquery
declare var $;

// API Provider
import { ApiProviderService } from '../services/api/api-provider.service';

import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['../../assets/scss/main.scss','./home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {

  // variabel
  playNow : object;
  soon    : object;
  populer : object;

  loaderCount : any[];

  url_img     : string;

  movie_pages : number;

  constructor(
    private zone: NgZone,
    public router: Router,
    public storage: Storage,
    public platform: Platform,
    public navCtrl: NavController,
    public apiprovider : ApiProviderService,
    public modalController : ModalController,
    ) {
      var user = JSON.parse(localStorage.getItem('user'));
      if(!user){
        this.router.navigate(['login']);
      }

      this.url_img = URL_IMG_TMDB;
      this.movie_pages = 1;
      
      this.loaderCount = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      
      this.movieplayingnow();
      this.soonmovie();

      var self = this;
      // jquery srcipt
      this.zone.run(() => {
        $(document).on('click','#moviedetail',function(){
            var movietitle = $(this).attr('dataTitle');
            var movieID = $(this).attr('dataID');
            
            self.movieDetail([movietitle,movieID]);

          })
        })
      //end  jquery srcipt
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
    }

  public moviemore(param){
    this.apiprovider.param = param
    this.router.navigate(['more/'+param]);
  }

  // refresh page
    doRefresh(event) {
      console.log('Begin async operation');
      setTimeout(() => {
        console.log('Async operation has ended');
        this.movie_pages = 1;
        this.movieplayingnow()
        event.target.complete();
      }, 2000);
    }
    
    // data api play now
    movieplayingnow(){
      this.apiprovider.moviewApiUrl('playnow')
      .subscribe(
        resdata => {
          this.playNow = resdata;
          
            setTimeout(function(){
                document.getElementById('loader').hidden = true;
            },500);
            
          },err=> {
            console.log('error');
          });
        }
    
    // get data api movie soon
    soonmovie() {
          this.apiprovider.moviewApiUrl('soon')
          .subscribe(
            resdata => {
              this.soon = resdata['results'] ;
        },err=> {
          console.log('error');
      });
    }

    

    // load data after scroll up 
    loadData(event,page) {

      var page = page+1;
      
      if(page >= 3){
        document.getElementById('loadMovie').hidden = true;
      }
      
      setTimeout(() => {
        console.log('Done');

        this.movienextpage(page);

        event.target.complete();

      }, 1000);
    }

    // get data movie after scroll up
    movienextpage(page){

      var html : string;

      this.apiprovider.loadmovie(page)
      .subscribe(
        resdata => {
          this.movie_pages = page;
          
          let data = resdata
          
          for (let item in data) {
                html += '<ion-col size="4" id="moviedetail" dataTitle="'+data[item].title+'" dataID="'+data[item].imdb+'">'+
                          '<ion-card class="card-body-grid">'+
                            '<div class="rating-duration">'+
                              '<ion-icon name="star" color="warning" class="icon-size-11"></ion-icon>'+
                              '<span class="rating">'+ data[item].rating +'</span>'+
                              '<ion-icon name="time" color="warning" class="duration icon-size-11"></ion-icon>'+
                              '<span class="rating">'+ data[item].runtime +'</span>'+
                            '</div>'+
                            '<span class="mv-quality '+ data[item].quality.split(' ')[0].toLowerCase() +'">'+data[item].quality.split(' ')[0] +'</span>'+
                            '<img src="'+data[item].poster+'" alt="">'+
                            '<span class="movie-info">'+
                              '<ion-card-title class="card-title">'+ data[item].title +'(' +data[item].year +')</ion-card-title>'+
                            '</span>'+
                          '</ion-card>'+
                        '</ion-col>'

            }
            html = html.replace("undefined","");
            
            document.getElementById('movie-list-content').insertAdjacentHTML('beforeend', html);
          
        },err=> {
          console.log('error');
      });
    }

    // open modal searching
    async SearchModal() {
      const modal = await this.modalController.create({
        component: SearchPage
      });

      return await modal.present();
    }

    // open modal searching category
    async CategoryModal(category) {
      const modal = await this.modalController.create({
        component: CategoryPage,
        componentProps: {
          'category': category
        }
      });

      return await modal.present();
    }
}
