import { Component, ViewChild  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  data : object;
  loaderCount : any[];
  movie_pages : string;
  
  constructor(
    public navCtrl: NavController,
    public http: HttpClient  
    ) {
      this.loaderCount = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];      
      // this.movieplayingnow();

    }

    doRefresh(event) {
      console.log('Begin async operation');
      setTimeout(() => {
        console.log('Async operation has ended');
        // this.movieplayingnow()
        event.target.complete();
      }, 2000);
    }
    
  //   movieplayingnow(){
  //     this.http.get(URL_API_GDPLA_MOVIE+'newest?page=1')
  //     .subscribe(
  //       resdata => {
  //         this.data = resdata;
  //         this.movie_pages = '1';
  //         console.log(resdata);
          
  //         setTimeout(function(){
  //             document.getElementById('loader').hidden = true;
  //             console.log(resdata)
  //         },1000);
  //       },err=> {
  //         console.log('error');
  //     });
  //   }

  //   movienextpage(page){

  //     var html : string;

  //     this.http.get(URL_API_GDPLA_MOVIE+'newest?page='+page)
  //     .subscribe(
  //       resdata => {

  //         this.movie_pages = page;

  //         for (const item of resdata) {
  //               html += '<ion-col size="4">'+
  //                         '<ion-card style="margin: 0px 0px;height: 167px; ">'+
  //                           '<div style="position: absolute;left: 0px;padding: 1px;background-color: rgba(39, 59, 89, 0.7);">'+
  //                             '<ion-icon name="star" color="warning" style="font-size:10px"></ion-icon>'+
  //                             '<span style="color: white;font-size: 10px;padding-left: 3px;font-weight: bold;">'+ item.rating +'</span>'+
  //                             '<ion-icon name="time" color="warning" style="padding-left: 5px;font-size:10px"></ion-icon>'+
  //                             '<span style="color: white;font-size: 10px;padding-left: 3px;font-weight: bold;">'+ item.runtime +'</span>'+
  //                           '</div>'+
  //                           '<span style="background: rgba(11, 171, 0, 0.58);color: #fff;font-size: 10px;font-weight: 600;height: auto;line-height: normal;padding: 4px 6px;position:absolute; right: 0px;top: 0px; width: auto;border-bottom-left-radius: 7px;">'+item.quality.split(' ')[0] +'</span>'+
  //                           '<img src="'+item.poster+'" alt="" style="height:100%;">'+
  //                           '<span style="background-image: url('+"../../assets/img/background-title.png"+');position: absolute;height: 30%;width: 100%;bottom: 0px;left: 0px;">'+
  //                             '<ion-card-title style="font-size: 12px;position: absolute;text-align: center !important;bottom: 10px;color: white;width: 100%;">'+ item.title +'(' +item.year +')</ion-card-title>'+
  //                           '</span>'+
  //                         '</ion-card>'+
  //                       '</ion-col>'
  //           }
  //           html = html.replace("undefined","");
            
  //           document.getElementById('movie-list-content').insertAdjacentHTML('beforeend', html);
          
  //       },err=> {
  //         console.log('error');
  //     });
  //   }
  
  // // load data after scroll up 
  // loadData(event,page) {

  //   var page = page+1;
    
  //   setTimeout(() => {
  //     console.log('Done');

  //     this.movienextpage(page);

  //     event.target.complete();

  //   }, 1000);
  // }

  // dropgenre(){
  //   let element = <HTMLInputElement> document.getElementById("genre-checkbox");  
  //   let country = <HTMLInputElement> document.getElementById("country-checkbox");  
  //   let years = <HTMLInputElement> document.getElementById("years-checkbox");  
  //   if (element.checked) {

  //     country.checked = false
  //     years.checked = false

  //     document.getElementById('genre-drop').setAttribute("style", "display:block");
  //     document.getElementById('country-drop').setAttribute("style", "display:none");
  //     document.getElementById('years-drop').setAttribute("style", "display:none");
  //   }else{
  //     document.getElementById('genre-drop').setAttribute("style", "display:none");
  //   }
  // }
  // dropcountry(){
  //   let element = <HTMLInputElement> document.getElementById("country-checkbox");  
  //   let genre = <HTMLInputElement> document.getElementById("genre-checkbox");  
  //   let years = <HTMLInputElement> document.getElementById("years-checkbox");  

  //   if (element.checked) {

  //     genre.checked = false
  //     years.checked = false

  //     document.getElementById('country-drop').setAttribute("style", "display:block");
  //     document.getElementById('genre-drop').setAttribute("style", "display:none");
  //     document.getElementById('years-drop').setAttribute("style", "display:none");
  //   }else{
  //     document.getElementById('country-drop').setAttribute("style", "display:none");
  //   }
  // }
  // dropyears(){
  //   let element = <HTMLInputElement> document.getElementById("years-checkbox");  
  //   let country = <HTMLInputElement> document.getElementById("country-checkbox");  
  //   let genre = <HTMLInputElement> document.getElementById("genre-checkbox"); 

  //   if (element.checked) {

  //     genre.checked = false
  //     country.checked = false

  //     document.getElementById('years-drop').setAttribute("style", "display:block");
  //     document.getElementById('genre-drop').setAttribute("style", "display:none");
  //     document.getElementById('country-drop').setAttribute("style", "display:none");
  //   }else{
  //     document.getElementById('years-drop').setAttribute("style", "display:none");
  //   }
  // }
}
