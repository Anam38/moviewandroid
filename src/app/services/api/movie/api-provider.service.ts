import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../../../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  public param: any;
  public ID: any;

  constructor(public http: HttpClient,public nativeHttp: HTTP,) { }

  //data api search
  SearchMovie(keyword){
    return this.http.get(URL_API_GDPLA_MOVIE+'movie/search?title='+keyword);
  }

  //data api search
  SearchWithCategory(param){
    var category = param[0];
    var keyword = param[1];
    
    return this.http.get(URL_API_GDPLA_MOVIE+'movie/search?'+category+'='+keyword);
  }

  // data api home page
  moviewApiUrl(param){
    switch(param) {
      case 'playnow': {

        return this.http.get(URL_API_GDPLA_MOVIE+'movie/newest?page=1');

        break;
      }
      case 'soon' : {

        return this.http.get(URL_API_TMDB+'upcoming?api_key='+API_KEY_TMDB+'&language=en-US&page=1');

        break;
      }
    }
  }
  // load movie
  loadmovie(page){
    return this.http.get(URL_API_GDPLA_MOVIE+'movie/newest?page='+page);
  }
  // recomendation movie
  RecomendationMovie(param){
    return this.http.get(URL_API_GDPLA_MOVIE+'movie/search?actor='+param);
  }
  // data api detail page
  moviewDetail(moviewId) {  
    
      return this.http.get(URL_API_GDPLA_MOVIE+'imdb/'+moviewId);
  
  }
}
