import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private httpClient: HttpClient) { }

  signInUser(loginId: string,password:string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/login`,{loginId:loginId, password: password});
  }

  registerUser(loginId: string,password:string,ownIdData: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/register`,{loginId:loginId, password: password, ownIdData: ownIdData});
  }
}
