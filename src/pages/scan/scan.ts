import { Component } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {User} from "../../models/User";
import {ScanQR} from "../../models/ScanQR";
import {CodeQrProvider} from "../../providers/code-qr/code-qr";
import {ScanQrProvider} from "../../providers/scan-qr/scan-qr";
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  currentUser: User;
  valueCode: string = "";
  errorCode: string = "";

  constructor(public socket: Socket, public scanProvider: ScanQrProvider, public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, public codeProvider: CodeQrProvider) {
    this.currentUser = this.navParams.get('currentUser');
    this.scanCode();
  }
 
  scanCode() {   

    this.valueCode = "";
    this.errorCode = "";

    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData !=null && barcodeData !=undefined)
      {
        this.codeProvider.GetDataDecrypt(barcodeData.text).then((data: string) => {
      
          var arrayData = data.split('|');
          var type = arrayData[0];
          var idCodeQr =  parseInt(arrayData[1]);
          var idUserCreator =  parseInt(arrayData[2]);
          var message =  arrayData[3];
         
          this.codeProvider.CheckIfUserCanReadDataQrCode(idCodeQr, this.currentUser.Id).then((user: User) => {
            
            if(user != null)
            {
              if(idUserCreator == this.currentUser.Id)
              {
                this.socket.emit('scanCode', {idUserCreator: idUserCreator, message: "Vous venez de lire : " + message}); 
              }
              else
              {
                this.socket.emit('scanCode', {idUserCreator: idUserCreator, message: this.currentUser.FirstName + " " + this.currentUser.LastName + " a lu : " + message}); 
              }

              this.valueCode = message;
              this.scanProvider.Create_ScanQR(this.currentUser.Id, idCodeQr, new Date(), message);
            }
            else
            {
              this.errorCode = "Vous n'avez pas le droit de lecture";
            }
          })
          .catch(error => { this.errorCode = error; });
    
        })
        .catch(error => { console.log(error); });

      }
    }, (err) => {
        this.errorCode = err;
        console.log('Error: ', err);
    });
  }
}
