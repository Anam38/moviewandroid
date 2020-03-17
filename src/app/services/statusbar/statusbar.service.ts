import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class StatusbarService {

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
  ) {
   }

  public StatusbarTrans(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleBlackTranslucent();
    });
  }

  public StatusbarColor(color = null){
    if(color == null){
      color = '#151517';
    }

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString(color);
    });
  }
}
