import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  dataPlay : [];

  constructor(
    navParams: NavParams,
    public dom : DomSanitizer,
    private modalController : ModalController
    ) { 
    this.dataPlay = navParams.get('data');
    console.log(navParams.get('data'));
    
  }

  ngOnInit() {
  }

  // set url to iframe
  video_play(url){
    return this.dom.bypassSecurityTrustResourceUrl(url);
  }

  // dismissmodal
  dismissModal() {
    this.modalController.dismiss();
  }
}
