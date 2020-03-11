import { Component } from '@angular/core';
import { StorageService, FavoriteItem } from '../services/storage/storage.service';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiProviderService } from '../services/api/api-provider.service';

// Declare jquery
declare var $;

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.page.html',
  styleUrls: ['../../assets/scss/main.scss','./favorit.page.scss']
})
export class FavoritPage {

  favoriteItem :  FavoriteItem[] = [];

  constructor(
    public router: Router,
    public apiprovider : ApiProviderService,
    public storageService : StorageService,
    public toastController: ToastController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController
  ) { 
    var self = this;

    this.loadSearch();
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
  
  // STORE SEARCH FUNCTION
  // load data history searching
  loadSearch(){
    this.storageService.GetFavorite().then(items =>{
      this.favoriteItem = items;              
    })
  }

  //delete history searching
  DeleteFavorite(movieId){      
    this.storageService.DeleteFavorite(movieId).then(item => {
      this.presentToast('Succes remove from Favorite');
      this.loadSearch();
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

  onPress(movieId) {
    this.presentActionSheet(movieId);
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
