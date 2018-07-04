import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import {UserProvider} from "../../providers/user/user";
import {User} from "../../models/User";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  registerForm: FormGroup;
  error:string = "";
  currentUser: User;

  constructor(public nav: NavController, public navParams: NavParams, public formBuilder : FormBuilder, public userProvider: UserProvider, public storage: Storage) {
    this.currentUser = this.navParams.get('currentUser');

    this.registerForm = this.formBuilder.group({
      FirstName: [this.currentUser.FirstName, Validators.compose([Validators.required])],
      LastName: [this.currentUser.LastName, Validators.compose([Validators.required])], 
      Email: [this.currentUser.Email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      ConfirmPassword: ['', Validators.compose([Validators.required, this.equalto('Password')])]
    });
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        
        let input = control.value;
        
        let isValid=control.root.value[field_name]==input
        if(!isValid) 
        return { 'equalTo': {isValid} }
        else 
        return null;
        };
    }

    updateUser(value: User): void 
    {
      this.error = "";
      value.Id = this.currentUser.Id;

      if(this.registerForm.valid) 
      {
        this.userProvider.Update_User(value).then(data => {
          location.reload();
        })
        .catch(error => { this.error = error; });
      }
    }
}
