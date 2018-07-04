import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { ErrorHelperProvider } from '../error-helper/error-helper';
import { Group } from '../../models/Group';

@Injectable()
export class GroupProvider {

  url:string;
  constructor(public http: Http, public authProvider: AuthProvider, public ErrorHelper: ErrorHelperProvider) {
    this.url = this.authProvider.globalUrl + "/api/Group";
  }

  public Create_Group(group: Group)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.post(this.url + '/Create_Group', group, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });

      });
    });
  }

  public Update_Group(group: Group)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.put(this.url + '/Update_Group', group, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });

      });
    });
  }

  public GetGroupById(idGroup : number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/GetGroupById?idGroup=' + idGroup, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });
      });
    });
  }

  public GetAllGroupByIdUseOwner(idUserOwner : number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/GetAllGroupByIdUseOwner?idUserOwner=' + idUserOwner, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });
      });
    });
  }

  public GetAllGroupByIdUser(idUser : number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.get(this.url + '/GetAllGroupByIdUser?idUser=' + idUser, val as RequestOptions)
        .toPromise()
        .then((response) =>
        {
          resolve(response.json());
        })
        .catch((error) => { console.log(error); reject(this.ErrorHelper.GetMessageError(error)); });
      });
    });
  }

  public DeleteGroupById(idGroup: number)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.delete(this.url + '/DeleteGroupById?idGroup=' + idGroup, val as RequestOptions)
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
