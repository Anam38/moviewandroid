import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController, NavParams , ToastController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ApiProviderService } from '../services/api/api-provider.service';

// Declare jquery
declare var $;

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.page.html',
  styleUrls: ['../../assets/scss/main.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MovielistPage implements OnInit {

  data    : object;

  loaderCount : any[];

  title   : any;
  pages : number;

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router, 
    public route: ActivatedRoute,
    public apiprovider : ApiProviderService, 
  ) {   
    this.loaderCount = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    this.pages = 1;
  }

  ngOnInit() {
    var param = this.activatedRoute.snapshot.paramMap.get('param');
    var title = param.replace('-', ' ').toLocaleUpperCase();
    this.title = title
    
    this.movieplayingnow()
  }

  // data api play now
  movieplayingnow(){
  this.apiprovider.moviewApiUrl('playnow')
  .subscribe(
    resdata => {
      this.data = resdata;
      
        setTimeout(function(){          
            document.getElementById('loaders').hidden = true;
        },500);
        
      },err=> {
        console.log('error',err);
      });
    }

  // refresh page
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.pages = 1;
      this.movieplayingnow()
      event.target.complete();
    }, 2000);
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

  // load data after scroll up 
  loadData(event,page) {

    var page = page+1;
    
    setTimeout(() => {
      console.log(page);

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
        this.pages = page;
        
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
          
          document.getElementById('movie-list-contents').insertAdjacentHTML('beforeend', html);
        
      },err=> {
        console.log('error',err);
    });
  }
}
