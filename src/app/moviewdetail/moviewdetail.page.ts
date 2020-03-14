import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

import { LoadingController, ToastController, AlertController ,ActionSheetController, ModalController } from '@ionic/angular';

// API Provider
import { ApiProviderService } from '../services/api/api-provider.service';

import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../../environments/environment';
import { Url } from 'url';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { FavoriteItem, StorageService, HistoryItem } from '../services/storage/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { importExpr } from '@angular/compiler/src/output/output_ast';

// Declare jquery
declare var $;

@Component({
  selector: 'app-moviewdetail',
  templateUrl: './moviewdetail.page.html',
  styleUrls: ['../../assets/scss/main.scss','./moviewdetail.page.scss']
})

export class MoviewdetailPage implements OnInit {
  movieId : string;
  moviewPlayUrl : string;
  
  movieDetail : object;
  moviefavorite : object;
  movieRecomend : object;
  
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
    public apiprovider : ApiProviderService,
    public storageService : StorageService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public dom : DomSanitizer,
    private modalController : ModalController,
    ) {
      this.router.events.subscribe(async () => {
        const isModalOpened = await this.modalController.getTop();

        if(isModalOpened){

          var modalId = isModalOpened.id.split('-');
          let no = parseInt(modalId[2])-1;
          
          var ion = modalId[0]+'-'+modalId[1]+'-'+no
          
          this.modalController.dismiss('','',ion);
        }
      })
     }
    
  ngOnInit() {
    var self = this;

    this.movieId = JSON.stringify(this.apiprovider.ID);
    this.detailmovie(this.movieId);
  }
  
  // on scroll down
  onScroll(event) {
    if(event.detail.scrollTop > 0){
      document.getElementById('header').setAttribute("style", "background-color:#1f1f22");
    }else if(event.detail.scrollTop  == 0 ){
      document.getElementById('header').removeAttribute("style");
    }
  };
  
  // check if else movie have in store
  favorites(event,movieId){
    if(event.srcElement.getAttribute('color') == null){
      this.addfavorite()
    }else{
      this.presentActionSheet(movieId)  
    }
  }

  // get data recomendation base on actor 
  async Recomendation(actor){
    let item = [];
    let items = [];
    actor = actor.split(',');

    for(let i = 0; i < actor.length; i++){
      this.apiprovider.RecomendationMovie(actor[i]).subscribe(resdata => {
          item.push(resdata);
        })  
      }
      
      this.movieRecomend = item;
  }
 
  // get data detail movie
  detailmovie(movieId){
    
    var movieId = movieId.substring(1, movieId.length-1);

    // this.apiprovider.moviewDetail(movieId)
    //   .subscribe(
    //     resdata => {
    //       this.movieDetail = [resdata];
    //       this.moviefavorite = resdata;
    //       this.moviewPlayUrl = resdata['player_url'];
    //       this.favoriteId = resdata['imdbID']

    //       this.checkFavorite(resdata['imdbID']);
    //       this.Recomendation(resdata['Actors']);
    //       // console.log(resdata);
          
    //     },err=> {
    //       console.log('error',err);
    //     });

    let nativeCall = this.nativeHttp.get(URL_API_GDPLA_MOVIE+'imdb/'+movieId, {}, {
      'Content-Type' : 'application/json'
    });
    from(nativeCall).subscribe(
      resdata => {
        this.moviefavorite = resdata;
        this.movieDetail = [JSON.parse(resdata.data)];
        this.moviewPlayUrl = JSON.parse(resdata.data).player_url        
        this.favoriteId = JSON.parse(resdata.data).imdbID        
        },err=> {
          console.error(err);
      });
  }

  // set url to iframe
  video_play(url){
    return this.dom.bypassSecurityTrustResourceUrl(url);
  }

  // show iframe to play movie
  async playvideo(moviewId){

    const loading = await this.loadingController.create({
      duration: 5000,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();
    setTimeout(function(){
      
      document.getElementById('header').setAttribute("style", "background-color:#1f1f22");

      document.getElementById('movie-card').setAttribute("style", "display:none;");
      document.getElementById('detail-body').setAttribute('style', 'top: 300px !important;');
      document.getElementById('video-play').setAttribute("style", "display:block;position:fixed;z-index:9;width:100%;background:black;");
      
      
    },5000);

    // add to history view movie
    this.addHistory()
    
    const { role, data } = await loading.onDidDismiss();
  }

  // STORE SEARCH FUNCTION
  // load data favorite
  checkFavorite(movieId){
    this.storageService.FindFavorite(movieId).then(items =>{
      if(items){
        this.favoriteId = items;
        $("#like").attr('color','danger');
      }
    })
  }

  //add to favorite store
  addfavorite(){    
    this.newFavoriteItem.id      = Date.now();
    this.newFavoriteItem.movieId = this.moviefavorite['imdbID'];
    this.newFavoriteItem.title   = this.moviefavorite['Title'];
    this.newFavoriteItem.poster  = this.moviefavorite['Poster'];
    this.newFavoriteItem.modified= Date.now();
    
    this.storageService.StoreFavorite(this.newFavoriteItem).then(item => {
      this.newFavoriteItem = <FavoriteItem>{};
      $("#like").attr('color','danger');
      this.presentToast('Added to Favorite');
    })
  }

  //delete history searching
  DeleteFavorite(movieId){      
    this.storageService.DeleteFavorite(movieId).then(item => {
      this.presentToast('Succes remove from Favorite');
    })
  }

  // STORE HISTORY FUNCTION
  //add to favorite store
  addHistory(){    
    this.newHistoryItem.id      = Date.now();
    this.newHistoryItem.movieId = this.moviefavorite['imdbID'];
    this.newHistoryItem.title   = this.moviefavorite['Title'];
    this.newHistoryItem.poster  = this.moviefavorite['Poster'];
    this.newHistoryItem.modified= Date.now();
    
    this.storageService.StoreHistory(this.newHistoryItem).then(item => {
      this.newHistoryItem = <HistoryItem>{};
    })
  }

  // call Toast funtion
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  
// call action sheet
async presentActionSheet(movieId) {
  const actionSheet = await this.actionSheetController.create({
    buttons: [{
      text: 'Remove From Favorite',
      role: 'destructive',
      icon: 'trash',
      cssClass : 'action-sheet-style-buttons',
      handler: () => {
        this.DeleteFavorite(movieId);
        $("#like").removeAttr('color');
      }
    },{
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      cssClass : 'action-sheet-style action-sheet-style-buttons',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}
}
