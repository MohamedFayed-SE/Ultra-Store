import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import {Product} from '../../app/product'
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({
    opacity: 0
  }))
]);
const fadeOut = trigger('fadeOut', [
  leaveTrans
]);


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    
    fadeOut
  ]
  

})
export class CartComponent implements OnInit {

  carts:Product[]=[];
  numberOfCarts:number=1;
  show:boolean=true;
  totalPrices= 1; // total Priceses For All Cart Products
 
  constructor(private __CartService:CartService, private _router:Router ,private __ToastrService:ToastrService) { }

  
    getCarts()
    {
      this.__CartService.getcartsList().subscribe((res)=>{
        this.carts=res;
      });
    }
    isEmpty():boolean
    {
      if(this.carts.length ==0)
          return true;
          return false
    }
    totalPrice(product:Product) //Calculate Total Price for One Product
    {
        this.__CartService.totalPrice(product);
    }

    overAllPrice() // calculate total price for All Products in the Cart
    {
        let totalPrice=0;
        this.carts.filter((item)=>{
          totalPrice+=item.totalPrice!;
        });
        
        return totalPrice;
    }
    
    increase(cart:Product) //Increase Number of Product to Buy
    {
      
      if(cart.quantity)
         {
           if(cart.quantity>7)
              {
                this.__ToastrService.warning('the maximum Of this Product to Order 8');
                return
              }
          cart.quantity++;
         }
         this.totalPrice(cart);
         
         this.upDateCart();
        
     
      
    } 
  
    decrease(cart:Product)//Decrease Number of Product to Buy
    {
      if(cart.quantity)
      {
        if(cart.quantity<=1)
          return;
        else
          cart.quantity--;

          this.totalPrice(cart);      
          this.upDateCart(); 
      }
        
    } 
    removeItem(index:number)
    {
     
      this.__CartService.removeFromCart(index);
      this.__CartService.cartsList.subscribe((res)=>{
      
      })
           
    }
    upDateCart() 
    {
    
      this.__CartService.upDateCarts();
    }

    shopNow()
    {
      this._router.navigateByUrl('/home');
    }
   buy()
   {
     this.totalPrices=this.overAllPrice();
   }
   
    orderForm:FormGroup= new FormGroup({
      'name':new FormControl(null,[Validators.required,Validators.min(4)]),
      'city':new FormControl(null,[Validators.required,Validators.min(3)]),
      'address':new FormControl(null,[Validators.required,Validators.min(5)]),
        'phone':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*[1-9]+$|^[1-9]+[0-9]*$')])
    });

    order()
    {
             
      if(this.orderForm.status=='VALID')
      {
      
        this.successMessage();
        this.resetOrderFrom();
      }
         
        else
              this.errorMessage();        
    }

    resetOrderFrom(){
      this.orderForm.reset();
    }
    successMessage()
    {
      this.__ToastrService.success('Operation Success');
    }
    errorMessage()
    {
      this.__ToastrService.error('please check Of your Infromation and try agin','please check all infromation is valid');
    }

  ngOnInit(): void {
    this.getCarts();
    
  }

}
