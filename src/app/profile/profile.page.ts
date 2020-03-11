import { Component } from '@angular/core';
import { StorageService, HistoryItem } from '../services/storage/storage.service';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { ApiProviderService } from '../services/api/api-provider.service';
import { Router } from '@angular/router';

// Declare jquery
declare var $;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['../../assets/scss/main.scss','./profile.page.scss']
})
export class ProfilePage {

  HistoryItem :  HistoryItem[] = [];

  constructor(
    public router: Router,
    public apiprovider : ApiProviderService,
    public storageService : StorageService,
    public toastController: ToastController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController
  ) {
    
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
  // get data history watching
  getHistoryPaying(){
    this.storageService.GetHistory().then(items => {

      this.HistoryItem = items;
      
      setTimeout(function(){
        document.getElementById('loading-history').setAttribute("style", "display:none;");
      },500)
    })
  }

  //delete history searching
  DeleteHistory(movieId){      
    this.storageService.DeleteHistory(movieId).then(item => {
      this.presentToast('Succes remove History');
      this.getHistoryPaying();
    })
  }
  //delete all history seaching
  DeleteAll(key){
    this.storageService.removeStore(key).then(item =>{
      this.getHistoryPaying();
    })
  }

  // on press item
  onPress(movieId) {
    this.presentActionSheet(movieId);
  }
    // call action sheet
    async presentActionSheet(movieId) {
      const actionSheet = await this.actionSheetController.create({
        buttons: [{
          text: 'Remove From History',
          role: 'destructive',
          icon: 'trash',
          cssClass : 'action-sheet-style-buttons',
          handler: () => {
            this.DeleteHistory(movieId);
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

    // call Toast funtion
    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }
}
