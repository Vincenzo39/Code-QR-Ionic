import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {AuthProvider} from "../../providers/auth/auth";
import {UserProvider} from "../../providers/user/user";
import { Storage } from '@ionic/storage';
import { User } from "../../models/User";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  authForm: FormGroup;
  error:string = "";

  constructor(public userProvider: UserProvider, public storage: Storage, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public authProvider: AuthProvider, public formBuilder : FormBuilder) {
    this.menu.enable(false, "myMenu");

    this.authForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required])]
    });
  }
  // login and go to home page
  login(value: any): void  
  {
    this.error = "";

    if(this.authForm.valid) 
    {
      this.authProvider.Connexion(value.username, value.password).then(data => {
        this.storage.set('access_token', data["access_token"]);
        location.reload();
       })
       .catch(error => { this.error = error; });
    }
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }
}
