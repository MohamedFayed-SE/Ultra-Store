import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private __ToastrService:ToastrService) { }

  contactForm:FormGroup=new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(12)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    city:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    adderss:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    message:new FormControl(null,[Validators.required,Validators.minLength(8)])
  });
  sendContantInfo()
  {
    if (this.contactForm.status=='VALID')
        this.messageSuccess();
        else
          this.messageError();
          console.log(this.contactForm);
  }
  messageSuccess()
  {
    this.__ToastrService.success('Message send We we will Contact to You as soon as possiabel','ULTRA STORE')
  }
  messageError()
  {
    this.__ToastrService.error('please  Check that all Infromation is Valid');
  }
  ngOnInit(): void {
  }

}
