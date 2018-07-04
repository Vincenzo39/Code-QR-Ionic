import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { ErrorHelperProvider } from '../error-helper/error-helper';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {
  // public globalUrl:string ="http://localhost:54861";
  // public globalUrl: string = "http://10.4.0.39/ContosoUniversity";
  public globalUrl: string = "https://apicodeqr.azurewebsites.net";
  url:string;
  
  constructor(public http: Http, public ErrorHelper: ErrorHelperProvider, public storage: Storage) {
    this.url = this.globalUrl + "/token";
  }
  
  GetHeaderToken()
  {
    return new Promise((resolve) => {
      this.storage.get('access_token').then((val) => {
        let headers = new Headers({ 'Authorization': 'bearer ' +  val });
        let options = new RequestOptions({ headers: headers });
        resolve(options);
      });
    });
  }

  public Connexion(UserName : string, Password: string)
  {
      return new Promise((resolve, reject) => {
        this.http.post(this.url,"UserName=" + UserName + "&Password=" +  Password + "&grant_type=" + 'password')
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { reject(this.ErrorHelper.GetMessageError(error, true)); });
      });
  }
}
