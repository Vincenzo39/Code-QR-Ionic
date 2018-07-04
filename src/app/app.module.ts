import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule }       from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';
import {Keyboard} from '@ionic-native/keyboard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { MyApp } from './app.component';

import { CodeQrProvider } from '../providers/code-qr/code-qr';
import { GroupProvider } from '../providers/group/group';
import { ScanQrProvider } from '../providers/scan-qr/scan-qr';
import { UserProvider } from '../providers/user/user';
import { UserGroupProvider } from '../providers/user-group/user-group';
import { AuthProvider } from '../providers/auth/auth';
import { ErrorHelperProvider } from '../providers/error-helper/error-helper';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {ProfilPage} from "../pages/profil/profil";
import {GroupPage} from "../pages/group/group";
import {CodePage} from "../pages/code/code";
import {ScanPage} from "../pages/scan/scan";
import {HistoriquePage} from "../pages/historique/historique";

const config: SocketIoConfig = { url: 'https://qrcodesocket.azurewebsites.net/', options: {} };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilPage, 
    GroupPage,
    CodePage,
    ScanPage,
    HistoriquePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
    NgxQRCodeModule,
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilPage, 
    GroupPage,
    CodePage,
    ScanPage,
    HistoriquePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CodeQrProvider,
    GroupProvider,
    ScanQrProvider,
    UserProvider,
    UserGroupProvider,
    AuthProvider,
    Keyboard,
    ErrorHelperProvider
  ]
})
export class AppModule {}
