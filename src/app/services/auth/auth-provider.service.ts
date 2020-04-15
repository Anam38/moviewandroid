import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { StorageService } from '../../services/storage/storage.service';
import * as firebase from 'Firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  userData : any;
  
  userDB = firebase.database().ref('users/');

  constructor(
    public router: Router,  
    public googlePlus: GooglePlus,  
    public FireAuth : AngularFireAuth,
    public FireStore : AngularFirestore,
    public UserSession : StorageService
  ) {
    this.UserLoginCheck();
   }

  //  login with google
   googleLogin(): Promise<any> {
    return this.googlePlus.login({
    }).then( res => {
          // login with Credential
          // const user = firebase.auth.GoogleAuthProvider.credential(res.accessToken)
          console.log(res);
          
          // this.UserLoginCredential(res.accessToken);

    }).catch(err => {
      this.onError('googleLogin',err);
    })
  }

  // login with credential
  UserLoginCredential(idToken){
    return firebase.auth().signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(null , idToken)
    ).then(res =>{
      console.log(res);
    }).catch(err => {
      this.onError('UserLoginCredential', err);
    });
  }   

  // login User firebase
  UserLogin(email, password){
    return this.FireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // register user to firebase
  UserRegister(email, password){
    return this.FireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  //create user to database
  UserUpdate(user : User): Promise<any>{
    return firebase.auth().currentUser.updateProfile({
      'displayName' : user.displayName,
      'photoURL'  : '../../../assets/img/user.png'
    }).catch((error) => {
      this.onError('UserUpdate',error);
    })
  }

  // update user profile img
  UserProfileImg(DataImg){

    var path = DataImg;
    
    return firebase.auth().currentUser.updateProfile({
      'photoURL' : path
    });
  }

  // update user profile password
  UserProfileName(DataName){
    return firebase.auth().currentUser.updateProfile({
     'displayName' : DataName
    });
  } 

  // update user profile password
  UserProfileEmail(DataEmail){
    return firebase.auth().currentUser.updateEmail(DataEmail);
  } 

  // update user profile password
  UserProfilePassword(DataPassword){
    return firebase.auth().currentUser.updatePassword(DataPassword);
  } 

  // Store user in localStorage
  SetUserData(user) {
    const userRef : AngularFirestoreDocument<any> = this.FireStore.doc(`users/${user.uid}`);
    const userData : User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  //get data user
  UserProfile(){
    this.userData = firebase.auth().currentUser;
    return this.userData;
  }
  
  // update sesison user
  UserUpdateSession(){
    var user = firebase.auth().currentUser;
    if(user){

      this.userData = user;
      this.UserSession.UserSession(this.userData);

    }
  }

  // check sesision user
  UserLoginCheck(){
    this.FireAuth.authState.subscribe(user => {      
      if (user) {        

        this.userData = user;
        this.UserSession.UserSession(this.userData);
      
      }
    })
  }

  // Sign-out 
  SignOut() {
    // return this.googlePlus.logout().then(()=> {
    //   console.log('logout');
    // })
    return this.FireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  // upload img to storage firebase
  ImgUpload(dataImg){
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`userimages/${filename}.jpg`);

    return imageRef.putString(dataImg, firebase.storage.StringFormat.DATA_URL);
  }

  // get img path from firebase
  PathImg(url){
    var storage = firebase.storage().ref();
    var pathImg = storage.child(url);

    return pathImg.getDownloadURL();

  }

  // on response error
  onError(funtion, err){
    console.log('Error in '+funtion+': ' ,err.message);
  }
}

