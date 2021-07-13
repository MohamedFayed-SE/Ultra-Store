import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgardService implements CanActivate {
  constructor(private _router:Router) { }

  canActivate():boolean|Observable<boolean>
  {
      let token=localStorage.getItem('userToken');
      if(token)
      {
        this._router.navigateByUrl('/home');
        return false;
      }
     
        
      return true;
      
      
        

      
    }
        
       
  }

 

