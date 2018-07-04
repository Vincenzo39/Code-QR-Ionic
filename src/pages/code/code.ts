import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {User} from "../../models/User";
import {CodeQrProvider} from "../../providers/code-qr/code-qr";
import { CodeQR } from '../../models/CodeQR';
import { AlertController } from 'ionic-angular';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
})
export class CodePage {

  currentUser: User;
  mode: number = 0;
  lstCodeQR:Array<CodeQR>;
  codeSelected: CodeQR;
  codeForm: FormGroup;
  displayImage: SafeUrl = "";

  constructor(public domSanitizer: DomSanitizer, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public formBuilder : FormBuilder, public codeProvider: CodeQrProvider) {
    this.currentUser = this.navParams.get('currentUser');
    this.showCode();
  }

  showCode()
  {
    this.mode = 0;
    this.codeProvider.GetAllCodeQRByIdUserCreator(this.currentUser.Id).then(data => {
      this.lstCodeQR = data as Array<CodeQR>;
    })
    .catch(error => { console.log(error); });
  }

  selectCode(code: CodeQR)
  {
    this.mode = 1;
    this.codeSelected = code;

    this.codeForm = this.formBuilder.group({
      Name: [this.codeSelected.Name, Validators.compose([Validators.required])],
      Description: [this.codeSelected.Description, Validators.compose([Validators.required])], 
      Data: [this.codeSelected.Data, Validators.compose([Validators.required])], 
      Width: [this.codeSelected.Width],
      Height: [this.codeSelected.Height]
    });
  }

  updateCode(code: CodeQR)
  {
    code.IdUserCreator = this.codeSelected.IdUserCreator;
    code.Id = this.codeSelected.Id;

    if(this.codeForm.valid) 
    {
      if(code.Id != undefined)
      {
        this.codeProvider.Update_CodeQR(code).then(data => {
          this.showCode();
        })
        .catch(error => { console.log(error); });
      }
      else 
      {
        this.codeProvider.Create_CodeQR(code).then(data => {
          this.showCode();
        })
        .catch(error => { console.log(error); });
      }
    }
  }

  addNewCode()
  {
    this.codeSelected = new CodeQR();
    this.codeSelected.IdUserCreator = this.currentUser.Id;
    this.selectCode(this.codeSelected);
  }

  deleteCode(code: CodeQR)
  {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: "Continuer la suppression du Qr code '" + code.Name + "' ?",
      buttons: [
        {
          text: 'Annuler'        
        },
        {
          text: 'Valider',
          handler: () => {
            this.codeProvider.DeleteCodeQRById(code.Id).then(data => {
              this.showCode();
            })
            .catch(error => { console.log(error); });
          }
        }
      ]
    });
    alert.present();
  }

  showQrCode()
  {
    this.mode = 2;
    this.displayImage = this.getSafeUrl(this.codeSelected.CodeQR_Base64);
  }

  getSafeUrl(value: string)
  {
    return this.domSanitizer.bypassSecurityTrustUrl("data:Image/*;base64," + value);
  }
}
