import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {Product} from '../app/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  constructor( private __AuthService:AuthService) {
    
    if(!this.isUser())
    {
      this.getCartsFromLocal(); //Get Guest Carts IF user didnt Logged IN
    
    }
     

    else
    {
      this.getUserCartsFromLocal();// get User Cart if User is Logged IN
    
     
    }
       
  
   }

  carts:Product[]=[]; // if is guest
  cartsList=new BehaviorSubject<any>([]);
  userCarts:Product[]=[]; // if is current User (loogedIn)
  userCartsList=new BehaviorSubject<any>([]); // if is Current User (loggedIn)
   userEmail:any;

   getUserEmail()
   {
      this.__AuthService.getUserInfo().subscribe((res)=>{
        this.userEmail=res.email;
      });
      
   }
  getCartsFromLocal()
  {

      if(localStorage.getItem('carts'))
      {
        this.carts= JSON.parse(localStorage.getItem('carts')!);
        this.cartsList.next(this.carts);
      }
        
         else
         {
           this.upDateCarts();
         }

  }

   getUserCartsFromLocal()
  {
    
    this.getUserEmail();
     
     if (localStorage.getItem(this.userEmail)) {
         console.log('found it');
            this.userCarts=JSON.parse(localStorage.getItem(this.userEmail)!);
            this.userCartsList.next(this.userCarts);
            console.log(this.userCarts);
     }
     else
        this.upDateCarts();

       // console.log('dasdasdas',this.userEmail);

    
  }

  
  isUser()
 {
   if (this.__AuthService.isLogin())
          return true;
      return false;
  
 }

  getcartsList():Observable<Product[]> 
  {
    if (this.isUser()) 
    {
      return this.userCartsList.asObservable();
    }
    else
        return this.cartsList.asObservable();
  }

  founded(product:Product):boolean //Check if this Product are added Before or Not
  {
    
    let flag=false;
    if (this.isUser())
     {
      this.userCarts.filter((item)=>{
        if(item.id==product.id)
            flag =true;    
      });
    }
    else
    {
      this.carts.filter((item)=>{
        if(item.id==product.id)
            flag =true;
            
           
      });
    }
      
      if(flag)
        return true;
        
      return false;
  }

 

  setCart(product:Product)
  {
    if (this.founded(product))
        return;
      product.quantity=1;
      product.totalPrice=product.price;
      if (this.isUser())
        this.userCarts.push(product);
      else
        this.carts.push(product);
     
      this.upDateCarts(); 
  }
  upDateCarts()
  {
    if(this.isUser())
    {
      this.userCartsList.next(this.userCarts);
      localStorage.setItem(this.userEmail,JSON.stringify(this.userCartsList.value)); 
     
    }
    else
    {
      this.cartsList.next(this.carts);
      localStorage.setItem('carts',JSON.stringify(this.cartsList.value));   
    }
     
  }
  totalPrice(product:Product)
  {
      let x=product.price;
      product.totalPrice=x*product.quantity!;

  }
  removeFromCart(index:number)
  {
    if (this.isUser())
        this.userCarts.splice(index,1);
    else
      this.carts.splice(index,1);    

      this.upDateCarts();
  }
 
  
 

 
}
