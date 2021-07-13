import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cartNumber:any;
  constructor( private __CartService:CartService,private __ProductsService:ProductsService,private __AuthService:AuthService,private __Router:Router) { 
   
  }
  
  searchValue:string='';
  isLogin():boolean
  {
    if(this.__AuthService.isLogin())
          return true;
          return false;
  }
  logOut()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('carts');
    this.refresh();
    
  }

  refresh()
  {
    window.location.reload();
    this.__Router.navigateByUrl('/login');
  }

  setSearchValue(searchValue:string)
  {
    this.__ProductsService.setSearchValue(searchValue);
    console.log(searchValue);
  }
  

 

  ngOnInit(): void {
    
    if (this.isLogin()) {
      this.__CartService.userCartsList.subscribe((res)=>{
        this.cartNumber=res.length;
      });
    
    }
    else
      {
        this.__CartService.cartsList.subscribe((res)=>{
          this.cartNumber= res.length;
         
        });
       
      }
   
    
    
     
  }
    
}
  
