import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'Firebase';

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
    public FireAuth : AngularFireAuth,
    public FireStore : AngularFirestore
  ) {
    this.UserUpdateSession();
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
      console.log(error.message)
    })
  }

  // update user profile img
  UserProfileImg(DataImg){

    var path = DataImg;
    
    return firebase.auth().currentUser.updateProfile({
      'photoURL' : path
    });
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
  GetUserData(){
    
  }

  // check sesision user
  UserUpdateSession(){
    this.FireAuth.authState.subscribe(user => {
      if (user) {        
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign-out 
  SignOut() {
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
}

