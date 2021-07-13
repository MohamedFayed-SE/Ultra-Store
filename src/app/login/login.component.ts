import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router,private _Toaster:ToastrService) { }
  error:string='';


  loginForm:FormGroup= new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required])
  })
/*-----------Check if User Enter all Required Data--------*/
  requiredValidation(formControlName:string)
  {
    return !! this.loginForm.get(formControlName)?.errors?.required && this.loginForm.get(formControlName)?.touched;
  }
  logIn()
  {
      this._AuthService.signIn(this.loginForm.value).subscribe((response)=>{
        if(response.message=='success')
            {
                  this.setToken(response.token)
                    this.reload().then(()=>{
                      this.goToHome().then(()=>{
                        this.messageSuccess();
                      });
                    })
                 
                }
            else
            this.error=response.message;
          
      });
  }

  setToken(token:any)
  {
    localStorage.setItem('userToken',token);
  }

  
  signUp()
  {
    this._Router.navigateByUrl('/signup');
  }

   goToHome() //updated Componant to Get User Data and Navigate him to Home Componant
  {
    return new Promise<void>((resolve, reject) => {
      this._Router.navigateByUrl('/home');
      resolve();
    });
  
    
  
    //this.messageSuccess();
    
  }
   messageSuccess()
  {
    this._Toaster.success('your Are Successfully logged In','Welcome To Ultra');
    
  
  }
  reload()
  {
    return new Promise<void>((resolve, reject) => {
      window.location.reload();
      resolve();
    })
  }
  ngOnInit(): void {
  }

}
