import { Http,Headers, RequestOptions } from '@angular/http';
import { ErrorHelperProvider } from '../error-helper/error-helper';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from '../../models/User';

@Injectable()
export class UserProvider {

  url:string;

  constructor(public http: Http, public ErrorHelper: ErrorHelperProvider, public authProvider: AuthProvider) {
    this.url = this.authProvider.globalUrl + "/api/User";
  }

  public Create_User(user: User)
  {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/Create_User',user)
      .toPromise()
      .then((response) =>
      {
        resolve(response.json());
      })
      .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });
    });
  }

  public Update_User(user: User)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.put(this.url + '/Update_User', user, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });

      });
    });
  }

  public GetUserByToken(token : string)
  {
    return new Promise((resolve, reject) => {

        let headers = new Headers({ 'Authorization': 'bearer ' +  token });
        let options = new RequestOptions({ headers: headers });

          this.http.get(this.url + '/GetUserByToken?token=' + token, options)
          .toPromise()
          .then((response) =>
          {
            resolve(response.json());
          })
          .catch((error) => { 
            reject(this.ErrorHelper.GetMessageError(error)); 
          });
    });
  }

  public GetAllUserNotInGroup(idGroup : number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/GetAllUserNotInGroup?idGroup=' + idGroup, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });
      });
    });
  }

  public GetAllUser()
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/GetAllUser', val as RequestOptions)
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
