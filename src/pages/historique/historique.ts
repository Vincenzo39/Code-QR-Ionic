import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/User";
import {ScanQrProvider} from "../../providers/scan-qr/scan-qr";
import {CodeQrProvider} from "../../providers/code-qr/code-qr";
import { CodeQR } from '../../models/CodeQR';
import { ScanQR } from '../../models/ScanQR';

@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage {

  currentUser: User;
  codeSelected: CodeQR;
  lstCodeQR: Array<CodeQR>;
  lstScanQR: Array<ScanQR>;
  mode: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanProvider: ScanQrProvider, public codeProvider: CodeQrProvider) {
    this.currentUser = this.navParams.get('currentUser');

    this.codeProvider.GetAllCodeQRByIdUserCreator(this.currentUser.Id).then((data: Array<CodeQR>) => {
      this.lstCodeQR = data;
    })
    .catch(error => { console.log(error); });
  }

  selectCode(code: CodeQR)
  {
    this.codeSelected = code;
    this.mode = 1;
    this.scanProvider.GetAllScanQRByIdCodeQR(this.codeSelected.Id).then((data: Array<ScanQR>) => {      
      this.lstScanQR = data;
    })
    .catch(error => { console.log(error); });
  }
}
