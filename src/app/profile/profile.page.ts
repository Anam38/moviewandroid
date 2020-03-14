import { Component } from '@angular/core';
import { StorageService, HistoryItem } from '../services/storage/storage.service';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { ApiProviderService } from '../services/api/api-provider.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';


// Declare jquery
declare var $;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['../../assets/scss/main.scss','./profile.page.scss']
})
export class ProfilePage {

  HistoryItem :  HistoryItem[] = [];
  ProfileImg : string;

  constructor(
    public File: File,
    public router: Router,
    public camera : Camera,
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

  // open present action change image
  async changePhoto(){
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Take Photo',
        role: 'destructive',
        icon: 'camera',
        cssClass : 'action-sheet-style-buttons',
        handler: () => {
           this.takePhoto(); 
        }
      },{
        text: 'Galery',
        icon: 'images',
        role: 'images',
        cssClass : 'action-sheet-style action-sheet-style-buttons',
        handler: () => {
          this.takeFromGalery();
        }
      },
      {
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
  
  // take photo
  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit : true,
      targetHeight : 300,
      targetWidth : 300
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //  this.ProfileImg = 'data:image/jpeg;base64,' + imageData;

          let filename = imageData.substring(imageData.lastIndexOf('/') + 1);
          let path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
          this.File.readAsDataURL(path, filename).then(data => {

              this.ProfileImg = data;
          });

    }, (err) => {
      // Handle error
      this.presentToast(err.message);
    });
    
  }
  // take from galery
  takeFromGalery(){
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum : false,
      allowEdit : true,
      targetHeight : 300,
      targetWidth : 300
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.ProfileImg = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
     // Handle error
     this.presentToast(err.message);
    });
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
