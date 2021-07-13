import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import   jwt_decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient) { }

    tokenDecode=new BehaviorSubject(null);

    getUserInfo():Observable<any>
    {
      if (localStorage.getItem('userToken'))
          {
            let token=localStorage.getItem('userToken')!;
            
            this.tokenDecode.next(jwt_decode(token));
          }
          return this.tokenDecode.asObservable();
    }

  SignUp(regestrationFrom:FormGroup):Observable<any>
  {
    return this.http.post('https://routeegypt.herokuapp.com/signup',regestrationFrom);
  }

  signIn(signInFrom:FormGroup):Observable<any>
  {
    return this.http.post('https://routeegypt.herokuapp.com/signin',signInFrom);
  }
 
  isLogin()
  { 
    if (localStorage.getItem('userToken'))
          return true;
          return false;
  }
}
