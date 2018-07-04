import { Http, RequestOptions } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import { ErrorHelperProvider } from '../error-helper/error-helper';
import { UserGroup } from '../../models/UserGroup';

@Injectable()
export class UserGroupProvider {

  url:string;
  constructor(public http: Http, public authProvider: AuthProvider, public ErrorHelper: ErrorHelperProvider) {
    this.url = this.authProvider.globalUrl + "/api/UserGroup";
  }

  public AddUserToGroup(lstUserGroup: Array<UserGroup>)
  {
    return new Promise((resolve, reject) => {
      this.authProvider.GetHeaderToken().then((val) => {
        
        this.http.post(this.url + '/AddUserToGroup', lstUserGroup, val as RequestOptions)
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
