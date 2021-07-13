import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import {Product}from '../product'
import { ProductsService } from '../products.service';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin:20,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  constructor(private _ProductsService:ProductsService,private __CartService:CartService,private __ToastrService:ToastrService) { }

  products:Product[]=[];//All Prodcts
  electronicsProducts:Product[]=[];
   menClothesProducts:Product[]=[];
   womenClothesProducts:Product[]=[];
   jewelryProducts:Product[]=[];
    searchValue:string='';
    
    loading:any;
   
  setAllProducts()
  {
     this.showLoadingBar();
    this._ProductsService.getAllProducts().subscribe((response)=>{
      
      this.products=response;
      if (this.products)
         this.hideLoadingBar()
    });
   
  }

    setElectronicsProducts()
    {
      this.showLoadingBar(); 
      this._ProductsService.getAllProducts().subscribe((response)=>{
        if (response)
              this.hideLoadingBar();
        this.electronicsProducts= response.filter((item:Product)=>{
           return item.category=="electronics";
       });
    
     });
    }
    setMenClothesProducts()
    { 
      this.showLoadingBar(); 
      this._ProductsService.getAllProducts().subscribe((response)=>{
        if (response)
        this.hideLoadingBar();
        this.menClothesProducts= response.filter((item:Product)=>{
           return item.category==("men's clothing");
           
       });
      
     
     });
    }
    setwomenClothesProducts()
    { 
      this.showLoadingBar(); 
      this._ProductsService.getAllProducts().subscribe((response)=>{
        if (response)
        this.hideLoadingBar();
        this.womenClothesProducts= response.filter((item:Product)=>{
           return item.category==("women's clothing");
           
       });
      
     
     });
    }
    addCart(product:Product)
    {
        this.__CartService.setCart(product);
        this.__ToastrService.success('Added Successfully');
    }

    setJewelryProduct()
    {
      this.showLoadingBar(); 
      this._ProductsService.getAllProducts().subscribe((response)=>{
        if (response)
        this.hideLoadingBar();
        
        this.jewelryProducts= response.filter((item:Product)=>{
          
           return item.category==("jewelery");
           
       });
      
      
     });
    }
    getSearchValue()
    {
      this._ProductsService.getSearchValue().subscribe((res)=>{
        this.searchValue=res;
      })
    }
    
  
      hideLoadingBar()
      {
        this.loading=false;
      }
    showLoadingBar()
    {
      this.loading=true;
    }


  ngOnInit(): void {
   
    this.setAllProducts();
    this.setElectronicsProducts();
    this.setMenClothesProducts();
    this.setwomenClothesProducts();
    this.setJewelryProduct();
    this.getSearchValue();
   
    
  }

}
