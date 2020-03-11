import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { promise } from 'protractor';


// item search interface
export interface SearchItem {
  id      : number,
  keyword : string,
  modified: number,
}

// item History interface
export interface HistoryItem {
  id      : number,
  movieId : string,
  title   : string,
  poster  : string,
  modified: number,
}

// item Favorite interface
export interface FavoriteItem {
  id      : number,
  movieId : string,
  title   : string,
  poster  : string,
  modified: number,
}

const SEARCH_KEY = "search";
const HISTORY_KEY = "history";
const FAVORITE_KEY = "favorite";

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(
    private storage : Storage,
  ) { }
  
  // SEARCH STORE FUNCTION
  // add history searching
  public StoreSearch(item : SearchItem) : Promise<any>{
    return this.storage.get(SEARCH_KEY).then((items : SearchItem[]) => {
      if(items) {
        items.push(item)
        return this.storage.set(SEARCH_KEY, items);
      }else{
        return this.storage.set(SEARCH_KEY, [item]);
      }
    })
  }

  // get data history searching
  public GetSearch() : Promise<SearchItem[]>{
    return this.storage.get(SEARCH_KEY);
  }

  // delete history searching
  public DeleteSearch(id : number) : Promise<SearchItem> {
    return this.storage.get(SEARCH_KEY).then((items : SearchItem[]) => {
      if(!items || items.length === 0){
        return null;
      }
      
      let toKeep : SearchItem[] = [];
      
      for(let i of items) {
        if(i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(SEARCH_KEY, toKeep);
    })
  }

  // HISTORY STORE FUNCTION
  // add history playing
  public StoreHistory(item : HistoryItem): Promise<any>{
    return this.storage.get(HISTORY_KEY).then((items : HistoryItem[]) => {
      if(items) {
        items.push(item)
        return this.storage.set(HISTORY_KEY, items);
      }else{
        return this.storage.set(HISTORY_KEY, [item]);
      }
    })
  }

  // gata data history playing
  public GetHistory() : Promise<HistoryItem[]>{
    return this.storage.get(HISTORY_KEY);
  }

  // delete history playing
  public DeleteHistory(movieId : string) : Promise<HistoryItem>{
    return this.storage.get(HISTORY_KEY).then((items : HistoryItem[]) => {
      if(!items || items.length === 0){
        return null;
      }
      
      let toKeep : HistoryItem[] = [];
      
      for(let i of items) {
        if(i.movieId !== movieId){
          toKeep.push(i);
        }
      }
      
      return this.storage.set(HISTORY_KEY, toKeep);
    })
  }

  // FAVORIE STORE FUNCTION
  // add favorite movie
  public StoreFavorite(item : FavoriteItem): Promise<any>{
    return this.storage.get(FAVORITE_KEY).then((items : FavoriteItem[]) => {
      if(items) {
        items.push(item)
        return this.storage.set(FAVORITE_KEY, items);
      }else{
        return this.storage.set(FAVORITE_KEY, [item]);
      }
    })
  }

  //find data favorite with movieId
  public FindFavorite(movieId : string) : Promise<any>{
    return this.storage.get(FAVORITE_KEY).then((items : FavoriteItem[]) => {
      if(!items || items.length === 0){
        return null;
      }
      
      for(let i of items){
        if(i.movieId == movieId){
          return i.movieId;
        }
      }
    })
  }

  // get data favorite movie
  public GetFavorite() : Promise<FavoriteItem[]>{
    return this.storage.get(FAVORITE_KEY);
  }

  // get data favorite movie
  public DeleteFavorite(movieId : string): Promise<FavoriteItem>{
    return this.storage.get(FAVORITE_KEY).then((items : FavoriteItem[]) => {
      if(!items || items.length === 0){
        return null;
      }
      
      let toKeep : FavoriteItem[] = [];
      
      for(let i of items) {
        if(i.movieId !== movieId){
          toKeep.push(i);
        }
      }
      return this.storage.set(FAVORITE_KEY, toKeep);
    })
  }

  // remove storage where key
  public removeStore(key){
    return this.storage.remove(key);
  }
}
