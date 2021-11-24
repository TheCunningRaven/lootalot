import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/interfaces/pagination';
import { IProductType } from '../shared/interfaces/productType';
import { IProductBrand } from '../shared/interfaces/productBrand';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
     baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { 

  }
  getProducts(brandId?:number,typeId?:number, sort?:string){ // Hover over to see return type. USE INTERFACE i.e IPagination
    let params = new HttpParams();
    if(sort){
      params = params.append('sort', sort)
    }
    if (brandId){
      params = params.append('brandId', brandId.toString());
    }
    if (typeId){
      params = params.append('typeId', typeId.toString());
    }
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      )
  }
  getProductTypes(){
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
  getProductBrands(){
    return this.http.get<IProductBrand[]>(this.baseUrl + 'products/brands');
  }
}
