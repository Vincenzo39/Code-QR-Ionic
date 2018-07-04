import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHelperProvider {

  constructor() {}

  public GetMessageError(error : any, isFromConnexion: boolean = false):string
  {
    var res = "";
    try 
    {
      var jsonBody = JSON.parse(error._body); 
      if(isFromConnexion)
      {
        jsonBody = JSON.parse(jsonBody.error);
      }
      res = jsonBody.Message
    } 
    catch (error) 
    {
      res = "Une erreur est survenue";
    }
    
    return res;
  }
}
