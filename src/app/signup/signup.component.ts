import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error:string='';
  constructor(private __AuthService:AuthService,private toaster:ToastrService,private router:Router) { }
  regestrationForm:FormGroup=new FormGroup({
    'first_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    'last_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required,Validators.pattern('[A-Z]([a-z]|[0-9]){6,}')])
  });
 
  checkValidationInput(formControlName:string)
  {
     return !! this.regestrationForm.get(formControlName)?.touched; 
  }

  checkRequiredValidation(formControlName:string) // return true if there is any error
  {
      return !! this.regestrationForm.get(formControlName)?.errors?.required 
  }
  checkMinLengthValidation(formControlName:string)// return true if there is any error
  {
    return !! this.regestrationForm.get(formControlName)?.errors?.minlength 
  }
  checkMaxLengthValidation(formControlName:string)// return true if there is any error
  {
    return !! this.regestrationForm.get(formControlName)?.errors?.maxlength 
  }
  checkEmailValidation()// return true if there is any error
  {
    return !! this.regestrationForm.get('email')?.errors?.email;
  }
  checkPasswordValidation()//return true if there is any error
  {
    return !! this.regestrationForm.get('password')?.errors?.pattern
  }


  CheckRegestrationInfo():boolean
  {
    console.log(this.regestrationForm);
      if(this.regestrationForm.status=='VALID')
          return true;

        return false;
  }
  regestrationSubmit()
  {
    if(!this.CheckRegestrationInfo())
        return;
        this.__AuthService.SignUp(this.regestrationForm.value).subscribe((response)=>{
          if(response.message=='success')
              {
                this.toaster.success('Please Login',' Registered successfully');
                this.router.navigateByUrl('/login');
              }
            else
            {
              this.error=response.message;
              //console.log(response.message);
            }
        })
    
         
       

  }

  errorMessage()
  {
    if(this.error.length>0)
      return true;
      else
      return false;
  }


  ngOnInit(): void {
  }

}
