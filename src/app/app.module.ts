import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { HTTP } from '@ionic-native/http/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import { AppRoutingModule } from './app-routing.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

//provider
import { StorageService } from './services/storage/storage.service';
import { IonicGestureConfig } from './services/utils/IonicGestureConfig';
import { ApiProviderService } from './services/api/movie/api-provider.service';
import { StatusbarService } from './services/statusbar/statusbar.service';

// page
import { AppComponent } from './app.component';
import { SearchPage } from './modal/search/search.page';
import { CategoryPage } from './modal/category/category.page';
import { ResultPage } from './modal/result/result.page';
import { PlayPage } from './modal/play/play.page';


@NgModule({
  declarations: [
    AppComponent,
    SearchPage,
    CategoryPage,
    ResultPage,
    PlayPage
  ],
  entryComponents: [
    AppComponent,
    SearchPage,
    CategoryPage,
    ResultPage,
    PlayPage
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SuperTabsModule.forRoot(),
    AngularFirestoreModule
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig},
    ApiProviderService,
    StatusbarService,
    StorageService,
    Camera,
    HTTP,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
