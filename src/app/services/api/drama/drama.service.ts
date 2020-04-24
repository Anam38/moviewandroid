import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../../../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class DramaService {

  public param: any;
  public ID: any;

  constructor(public http: HttpClient,public nativeHttp: HTTP,) { }

  //data api search
  SearchDrama(keyword){
    return this.http.get(URL_API_GDPLA_MOVIE+'drama/search?title='+keyword);
  }

  //data api search
  SearchWithCategory(param){
    var category = param[0];
    var keyword = param[1];
    
    return this.http.get(URL_API_GDPLA_MOVIE+'drama/search?'+category+'='+keyword);
  }

  // data api home page
  DramaApiUrl(param){
    switch(param) {
      case 'playnow': {

        return this.http.get(URL_API_GDPLA_MOVIE+'drama/newest?page=1');

        break;
      }
      case 'soon' : {

        return this.http.get(URL_API_TMDB+'upcoming?api_key='+API_KEY_TMDB+'&language=en-US&page=1');

        break;
      }
    }
  }
  // load movie
  loadDrama(page){
    return this.http.get(URL_API_GDPLA_MOVIE+'drama/newest?page='+page);
  }
  // recomendation movie
  RecomendationDrama(param){
    return this.http.get(URL_API_GDPLA_MOVIE+'drama/search?actor='+param);
  }
  // data api detail page
  dramaDetail(dramaId) {  
    
      return this.http.get(URL_API_GDPLA_MOVIE+'drama/id/'+dramaId);
  
  }
}
