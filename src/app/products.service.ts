import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  searchValue=new Subject();
  getAllProducts():Observable<any>
  {
    return this.http.get('https://fakestoreapi.com/products');
  }

  setDetails(id:number)
  {
    return this.http.get(`https://fakestoreapi.com/products/${id}`);
  }

  setSearchValue(searchValue:string)
  {
     this.searchValue.next(searchValue);
  }
  getSearchValue():Observable<any>
  {
    return this.searchValue.asObservable();
  }

  




}
