import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

//PROVIDER
import { ApiProviderService } from 'src/app/services/api/api-provider.service';
import { SearchItem, StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

//Declare jquery
declare var $;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  
  resultSearch  : object;

  searchItem : SearchItem[] = []
  newSearchItem : SearchItem = <SearchItem>{};

  constructor(
    public router: Router,
    public storageService : StorageService,
    public apiprovider : ApiProviderService,
    private modalController : ModalController,
  ) { 
    this.loadSearch();
  }
  
  // move to detail movie
  public movieDetail(param) {
      
    var title = param[0];
    var movieID = param[1];      
    
    for (var _i = 0; _i < param[0].length; _i++) {
      title = title.replace(" ", "-");
    }
    
    this.apiprovider.ID = movieID

    this.dismissModal();

    this.router.navigate(['movie/'+title]);
  }

  // input focus
  focusInput(){
    document.getElementById('history-search').classList.remove("hide");
    document.getElementById('result-search').classList.add("hide");
  }

  // dismissmodal
  dismissModal() {
    this.modalController.dismiss();
  }
  
  //search to api 
  searching(keyword = null){
    // get data from module
    if(keyword === null){
      keyword = this.newSearchItem.keyword;
    }

    this.newSearchItem.keyword = keyword;

    // send data to api in provider
    this.apiprovider.SearchMovie(keyword)
    .subscribe(resdata => {
      
      this.resultSearch = resdata;

      document.getElementById('history-search').classList.add("hide");
      document.getElementById('result-search').classList.remove("hide");
      
      // put to history serching
      this.AddSearch();
      
      
    })
  }
  
  // STORE SEARCH FUNCTION
  // load data history searching
  loadSearch(){
    this.storageService.GetSearch().then(items =>{
      this.searchItem = items;  
    })
  }
  
  // create history searching
  AddSearch(){
      // push id item and created_at
      this.newSearchItem.id = Date.now();
      this.newSearchItem.modified = Date.now();
      
      this.storageService.StoreSearch(this.newSearchItem).then(item => {
        this.newSearchItem = <SearchItem>{};

        this.loadSearch();
      })
    }

    //delete history searching
    DeleteSearch(item: SearchItem){      
      this.storageService.DeleteSearch(item.id).then(item => {
        this.loadSearch();
      })
    }
    
    //delete all history seaching
    DeleteAll(key){
      this.storageService.removeStore(key).then(item =>{
        this.loadSearch();
      })
    }
}
