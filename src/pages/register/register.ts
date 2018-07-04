import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl  } from '@angular/forms';
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup;
  error:string = "";

  constructor(public nav: NavController, public formBuilder : FormBuilder, public userProvider: UserProvider) {

    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.compose([Validators.required])],
      LastName: ['', Validators.compose([Validators.required])], 
      Email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
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

  register(value: any): void 
  {
    this.error = "";

    if(this.registerForm.valid) 
    {
      this.userProvider.Create_User(value).then(data => {
         this.nav.setRoot(LoginPage);
       })
       .catch(error => { this.error = error; });
    }
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
