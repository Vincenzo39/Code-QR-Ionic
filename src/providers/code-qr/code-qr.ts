import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { ErrorHelperProvider } from '../error-helper/error-helper';
import { CodeQR } from '../../models/CodeQR';

@Injectable()
export class CodeQrProvider {

  url:string;
  constructor(public http: Http, public authProvider: AuthProvider, public ErrorHelper: ErrorHelperProvider) {
    this.url = this.authProvider.globalUrl + "/api/CodeQR";
  }

  public Create_CodeQR(code: CodeQR)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.post(this.url + '/Create_CodeQR', code, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });

      });
    });
  }

  public Update_CodeQR(code: CodeQR)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.put(this.url + '/Update_CodeQR', code, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });

      });
    });
  }

  public GetAllCodeQRByIdUserCreator(idUser : number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/GetAllCodeQRByIdUserCreator?idUser=' + idUser, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });
      });
    });
  }

  public DeleteCodeQRById(idCodeQR: number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.delete(this.url + '/DeleteCodeQRById?idCodeQR=' + idCodeQR, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });

      });
    });
  }

  public AddCodeQRToGroup(idGroup: number, idCodeQR: number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.post(this.url + '/AddCodeQRToGroup?idGroup=' + idGroup + '&idCodeQR='+idCodeQR, null, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });

      });
    });
  }

  public GetDataDecrypt(data : string)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/GetDataDecrypt?data=' + encodeURIComponent(data), val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });
      });
    });
  }

  public CheckIfUserCanReadDataQrCode(idCodeQR : number, idUser: number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/CheckIfUserCanReadDataQrCode?idCodeQR=' + idCodeQR + "&idUser=" + idUser, val as RequestOptions)
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
