import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

import { LoadingController, ToastController, AlertController ,ActionSheetController, ModalController } from '@ionic/angular';

// API Provider
import { DramaService } from '../../services/api/drama/drama.service';
import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { FavoriteItem, StorageService, HistoryItem } from '../../services/storage/storage.service';
import { DomSanitizer } from '@angular/platform-browser';

// Declare jquery
declare var $;

@Component({
  selector: 'app-dramadetail',
  templateUrl: './dramadetail.page.html',
  styleUrls: ['../../../assets/scss/main.scss','./dramadetail.page.scss'],
})
export class DramadetailPage implements OnInit {
  dramaId : string;
  dramaPlayUrl : string;
  
  dramaDetail : object;
  dramafavorite : object;
  dramaRecomend : object;
  
  favoriteId : any;
  newFavoriteItem : FavoriteItem = <FavoriteItem>{};
  newHistoryItem : HistoryItem = <HistoryItem>{};

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public nativeHttp: HTTP,
    public router: Router,
    public storage: Storage,
    public route: ActivatedRoute,
    public apiprovider : DramaService,
    public storageService : StorageService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public dom : DomSanitizer,
    private modalController : ModalController,
  ) { }

  ngOnInit() {
    var self = this;

    this.dramaId = JSON.stringify(this.apiprovider.ID);
    console.log(JSON.stringify(this.apiprovider.ID));
    
    this.detailmovie(this.dramaId);
  }

  // get data detail movie
  detailmovie(movieId){
    
    var movieId = movieId.substring(1, movieId.length-1);
    
    if(!environment.production){
      this.apiprovider.dramaDetail(movieId)
      .subscribe(
        resdata => {
          console.log(resdata);
          
          this.dramaDetail = [resdata];
          this.dramafavorite = resdata;
          this.dramaPlayUrl = resdata['player_url'];
          this.favoriteId = resdata['imdbID']
          
          // this.checkFavorite(resdata['imdbID']);
          // this.Recomendation(resdata['Actors'],resdata['title']);
          
        },err=> {
          console.log('error',err);
        });
    }else{
        let nativeCall = this.nativeHttp.get(URL_API_GDPLA_MOVIE+'imdb/'+movieId, {}, {
            'Content-Type' : 'application/json'
          });
          from(nativeCall).subscribe(
              resdata => {
          this.dramafavorite = resdata;
          this.dramaDetail = [JSON.parse(resdata.data)];
          this.dramaPlayUrl = JSON.parse(resdata.data).player_url        
          this.favoriteId = JSON.parse(resdata.data).imdbID   

          // this.checkFavorite(JSON.parse(resdata.data).imdbID);
          // this.Recomendation(JSON.parse(resdata.data).Actors,JSON.parse(resdata.data).title);
      
          },err=> {
              console.error(err);
          });
      }
    }

}
