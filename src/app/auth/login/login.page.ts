import { Component, OnInit } from '@angular/core';

// provider
import { AuthProviderService, User } from '../../services/auth/auth-provider.service'
import { from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StatusbarService } from '../../services/statusbar/statusbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../../../assets/scss/main.scss','./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public router: Router,
    public statusbar : StatusbarService,
    public UserAuth: AuthProviderService,
    public toastController: ToastController,
  ) { 
    // set status bar 
    this.statusbar.StatusbarTrans();
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.router.navigate(['tabs/movie']);
    }
  }

  // login function
  LoginUser(email, password){
    this.UserAuth.UserLogin(email.value, password.value)
    .then((res) => {

      console.log('login success');
      this.router.navigate(['tabs/movie']);

    }).catch((error) => {
        this.presentToast(error.message);
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
