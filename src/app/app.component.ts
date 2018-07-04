import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, MenuController } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { ProfilPage } from "../pages/profil/profil";
import { GroupPage } from "../pages/group/group";
import { CodePage } from "../pages/code/code";
import { ScanPage } from "../pages/scan/scan";
import { HistoriquePage } from "../pages/historique/historique";

import { UserProvider } from "../providers/user/user";
import { AuthProvider } from "../providers/auth/auth";
import { User } from '../models/User';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  currentUser: User;
  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public userProvider: UserProvider,
    public authProvider: AuthProvider, 
    public toastCtrl: ToastController,
    public menu: MenuController,
    public socket: Socket
  ) {
    this.currentUser = {} as User;
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Accueil', component: HomePage, icon: 'home'},
      {title: 'Groupe', component: GroupPage, icon: 'people'},
      {title: 'QR Code', component: CodePage, icon: 'barcode'},
      {title: 'Scan', component: ScanPage, icon: 'qr-scanner'},
      {title: 'Historique', component: HistoriquePage, icon: 'book'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);

      this.storage.get('access_token').then((val) => {
        if(val != null)
        {
          this.userProvider.GetUserByToken(val).then((data: User) => {
            this.socket.connect();
            this.socket.on('codeIsScanned', (res) => {
              if(this.currentUser.Id == res.idUserCreator)
              {
                let toast = this.toastCtrl.create({
                  message: res.message,
                  duration: 5000,
                });
                
                toast.present();
              }
            });

            this.currentUser = data;
            this.nav.setRoot(HomePage, {currentUser: this.currentUser});        
           })
           .catch(error => { this.nav.setRoot(LoginPage); });
        }
        else
        {
          this.nav.setRoot(LoginPage);
        }
      }); 
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {currentUser: this.currentUser});
  }

  logout() {
    this.socket.disconnect();
    this.storage.remove('access_token');
    this.nav.setRoot(LoginPage);
  }

  EditProfil()
  {
    this.nav.setRoot(ProfilPage, {currentUser: this.currentUser});
  }
}
