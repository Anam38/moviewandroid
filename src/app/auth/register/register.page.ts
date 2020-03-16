import { Component, OnInit } from '@angular/core';

// provider
import { AuthProviderService, User } from '../../services/auth/auth-provider.service'
import { from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../../../assets/scss/main.scss','./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUserItem : User = <User>{};

  constructor(
    public router : Router,
    public UserAuth: AuthProviderService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.router.navigate(['tabs/movie']);
    }
  }

  async register(email, password){
    
    await this.UserAuth.UserRegister(email.value, password.value)
    .then((res) => {

      this.newUserItem.uid = res.user.uid;

      this.UserAuth.UserUpdate(this.newUserItem);
      
      this.presentToast('Register Successfully')
    
    }).catch((error) => {
        this.presentToast(error.message)
        console.log(error.message)
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
}
