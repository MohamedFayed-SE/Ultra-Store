import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Product} from '../../app/product';
import { CartService } from '../cart.service';
import {ToastrService} from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
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



constructor(private __ProductsService:ProductsService ,private __ActivatedRoute:ActivatedRoute ,private __CartService:CartService,private _router:Router,private __ToastrService:ToastrService,private spinner:NgxSpinnerService ) { }
  cartId:any;
  cartDetails:any;
  FamilarProducts:Product[]=[];
  spinnerName='sp1';
  spinnerType='ball-fussion';

  getCardId()
  {
    this.cartId=this.__ActivatedRoute.snapshot.paramMap.get('id');
    
  }
  
    getcartDetails()
    {
      return new Promise<void>((resolve, reject) => {
        this.showSpinner();
          this.getCardId();
          this.__ProductsService.setDetails(this.cartId).subscribe((response)=>{
              if (response)
                this.hideSpinner();
              this.cartDetails=response;
             
              resolve();
              
          });
       
    
       
      })
     
    }

     getFamilarProducts()
    {
        this.__ProductsService.getAllProducts().subscribe((response)=>{
           this.FamilarProducts= response.filter((item:Product)=>{
            
                return this.cartDetails.category==item.category;
            
              
              
          });
        });

    }
    addCart(product:Product)
  {
      this.__CartService.setCart(product);
      this.__ToastrService.success('Add Successfully')
  }
  reloadComponent() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
        
    });
    }
    hideSpinner()
    {
      setTimeout(()=>{
        this.spinner.hide(this.spinnerName);
      },1000);
     
    }
    showSpinner()
    {
      this.spinner.show(this.spinnerName);
    }

  ngOnInit(): void {
    this.getcartDetails().then(()=>{
      this.getFamilarProducts();
    });
    
    
   
    
    
  }

}
