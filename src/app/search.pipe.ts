import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../app/product'
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(prodcuts:any[],searchValue:string):any  {

      return prodcuts.filter((item)=>{
        return item.title.toLowerCase().includes(searchValue.toLowerCase());         
     });
  }

}
