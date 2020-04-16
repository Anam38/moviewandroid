import { Component } from '@angular/core';
import { StorageService, HistoryItem } from '../services/storage/storage.service';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { ApiProviderService } from '../services/api/api-provider.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AuthProviderService } from '../services/auth/auth-provider.service'


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
  UserAuth : string;

  constructor(
    public File: File,
    public router: Router,
    public camera : Camera,
    public apiprovider : ApiProviderService,
    public storageService : StorageService,
    public toastController: ToastController,
    public alertController: AlertController,
    public authService: AuthProviderService,
    public actionSheetController: ActionSheetController
  ) {
    this.UserAuth = this.storageService.GetUserSession();
    this.getHistoryPaying();
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

              var dataImg = data;

              this.ProfileImg = dataImg;

              this.ImageUpload(dataImg);
          });
     }, (err) => {
      // Handle error
      this.presentToast(err.message);
    });
    
    
  }
  // take from galery
  takeFromGalery(){
    const options: CameraOptions = {
      quality: 70,
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
     var dataImg = 'data:image/jpeg;base64,' + imageData;
     
     this.ProfileImg = dataImg;
     
     this.ImageUpload(dataImg);
    
    }, (err) => {
     // Handle error
     this.presentToast(err.message);
    });
  }
  
  // upload img 
  ImageUpload(DataImg){
    this.authService.ImgUpload(DataImg).then(resdata => {

      if(resdata.state == 'success'){
        // update img url user
        this.PathImg(resdata.metadata.fullPath);

      }else{
        this.presentToast('Failed..!');
      }
      
    }).catch((err) => {
      this.presentToast(err.message);
      console.log(err.message);
      
    })
  }

  // get url img 
  PathImg(imgUrl){
    this.authService.PathImg(imgUrl).then(url => {
      this.ImgUpdate(url);
    }).catch(err => {
      console.log(err.message);
    })
  }

  // update img profile
  ImgUpdate(dataImg){
    this.authService.UserProfileImg(dataImg).then(resdata => {
      
      // update session user
      this.sessionUpadate()
      
      this.presentToast('Change succesfully');

      
    }).catch(err => {
      console.log(err.message);
      this.presentToast(err.message);
    })
  }

  //update profile user
  updateProfile(username, email, newPassword){
    
    var noticeName = null; 
    var noticeEmail = null; 
    var noticePass = null; 
    var username = username.value;
    var email = email.value;
    var newPassword = newPassword.value;

    if(username && username != this.UserAuth['displayName']){
      this.authService.UserProfileName(username).then(resdata => {
        console.log('name success update');
      }).catch(err => {
        this.presentToast(err.message);
      })
    }else{
      noticeName = 1;
    }
    
    if(email && email != this.UserAuth['email']){
      this.authService.UserProfileEmail(email).then(resdata => {
        console.log('email success update');
      }).catch(err => {
        this.presentToast(err.message);
      })
    }else{
      noticeEmail = 2;
    }
    
    if(newPassword){
      this.authService.UserProfilePassword(newPassword).then(resdata => {
        console.log('Password success update');
      }).catch(err => {
        this.presentToast(err.message);
      })
    }else{
      noticePass = 3;
    }
    
    if(!noticePass || !noticeEmail || !noticeName){
      // update session user
      this.sessionUpadate()

    }else{
      this.presentToast("Doesn't Changes");
    }
  }

  //get and update session user
  sessionUpadate(){
     // get profile user
     this.UserAuth = this.authService.UserProfile();
     // update session user
     this.authService.UserUpdateSession();
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
