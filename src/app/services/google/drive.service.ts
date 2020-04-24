import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(
    public google : GooglePlus
  ) { 
    
  }
  
}
