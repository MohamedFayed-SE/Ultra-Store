import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ToastrModule} from 'ngx-toastr'
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let donee:DoneFn;
  let toaster:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent],
      imports:[ReactiveFormsModule,HttpClientModule,ToastrService,
        ToastrModule.forRoot({
          // progressBar:true,
           preventDuplicates:true,
           timeOut:2500,
         }),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
      toaster=TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', (done:DoneFn) => {
    expect(component).toBeTruthy();
    done();
  });
  // first name and last name have the same validation
  it('[first_name ,last_name] check  errors',(done:DoneFn)=>{

    let firstName=component.regestrationForm.get('first_name');
    expect(firstName?.errors).toBeTruthy();
    firstName?.setValue('da');
    expect(firstName?.errors?.minlength).toBeTruthy();
    firstName?.setValue('asdasdsadsadsa');
    expect(firstName?.errors?.maxlength).toBeTruthy();
    done();
    
  });
  it('[first_name,last_name] check validation',()=>{
    let firstName=component.regestrationForm.get('first_name');
    firstName?.setValue('fayed');
    expect(firstName?.errors).toBeNull();
    expect(firstName?.valid).toBeTruthy();
  });

  it('[emial] check erros',()=>{
    let email=component.regestrationForm.get('email');
    expect(email?.errors?.required).toBeTruthy();
    email?.setValue('dadsadsa@');
    expect(email?.errors?.email).toBeTruthy();
  });
  it('[email] check validation',()=>{
      let email=component.regestrationForm.get('email');
      email?.setValue('mohamedfayed@gmail.com');
      expect(email?.errors).toBeNull();
  });

  it('[password] check erros',()=>{
    let password=component.regestrationForm.get('password');
    expect(password?.errors?.required).toBeTruthy();
    password?.setValue('dasdaso5456');
    expect(password?.errors?.pattern).toBeTruthy();

  });
  it('[password] check validation',()=>{
    let password=component.regestrationForm.get('password');
    password?.setValue('Adsadas4546')
    expect(password?.errors).toBeNull();
   

  });



});
