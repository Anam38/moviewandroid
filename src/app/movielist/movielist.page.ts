import { Component, OnInit } from '@angular/core';
import { NavController, NavParams , ToastController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.page.html',
  styleUrls: ['../../assets/scss/main.scss']
})
export class MovielistPage implements OnInit {

  title : any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router, 
    public route: ActivatedRoute 
  ) {   
  }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.paramMap.get('param');    
    this.route.queryParams.subscribe(params => {
      console.log(params);
  });
  }

}
