import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment, API_KEY_TMDB, URL_API_TMDB, URL_IMG_TMDB, URL_API_GDPLA_MOVIE } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  public param: any;

  constructor(public http: HttpClient) { }

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

  // data api detail page
  moviewDetail(moviewId): Observable<any> {  

    return this.http.get(URL_API_GDPLA_MOVIE+'imdb/'+moviewId)
  
  }
}
