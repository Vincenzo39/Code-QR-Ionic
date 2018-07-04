import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { ErrorHelperProvider } from '../error-helper/error-helper';
import {ScanQR} from "../../models/ScanQR";
import { DateTime } from 'ionic-angular/umd';

@Injectable()
export class ScanQrProvider {

  url:string;
  constructor(public http: Http, public authProvider: AuthProvider, public ErrorHelper: ErrorHelperProvider) {
    this.url = this.authProvider.globalUrl + "/api/ScanQR";
  }

  public Create_ScanQR(IdUser: number, IdCodeQR: number, DateScan: Date, Data: string)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.post(this.url + '/Create_ScanQR', {IdUser: IdUser, IdCodeQR: IdCodeQR, Date: DateScan, Data: Data}, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });

      });
    });
  }

  public GetAllScanQRByIdCodeQR(idCodeQR : number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/GetAllScanQRByIdCodeQR?idCodeQR=' + idCodeQR, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });
      });
    });
  }
}
