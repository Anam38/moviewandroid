import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { LoadingController } from '@ionic/angular';

// API Provider
import { ApiProviderService } from '../api-provider.service';

import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../../environments/environment';
import { Url } from 'url';


@Component({
  selector: 'app-moviewdetail',
  templateUrl: './moviewdetail.page.html',
  styleUrls: ['../../assets/scss/main.scss','./moviewdetail.page.scss']
})
export class MoviewdetailPage implements OnInit {

  movieId : string;
  movieDetail : object;
  moviewPlayUrl : string;
  
  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public apiprovider : ApiProviderService,
    public loadingController: LoadingController 
  ) { }

  ngOnInit() {
    this.movieId = JSON.stringify(this.apiprovider.param);
    this.detailmovie(this.movieId)
    
    console.log(btoa("12"));
  }
  
  detailmovie(movieId){

    var movieId = movieId.substring(1, movieId.length-1);
    
    this.apiprovider.moviewDetail(movieId)
    .subscribe(
      resdata => {
        this.movieDetail = [resdata];
        this.moviewPlayUrl = resdata.player_url
        console.log(resdata);
        
        },err=> {
          console.error(err);
      });
  }

  async playvideo(moviewId){
    var url = this.moviewPlayUrl

    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'wait a minute..',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();
    setTimeout(function(){
        document.getElementById('movie-card').setAttribute("style", "display:none");
        document.getElementById('video-play').setAttribute("style", "display:block");
        document.getElementById('video-play').insertAdjacentHTML('afterbegin', '<iframe src="'+url+'" style="width: 100%; display: block;padding: 1px 0px;border: 0px;"></iframe>');

      },5000);
    const { role, data } = await loading.onDidDismiss();
  }
}
