import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/interfaces/pagination';
import { IProductType } from '../shared/interfaces/productType';
import { IProductBrand } from '../shared/interfaces/productBrand';
import { map } from 'rxjs/operators';
import { ShopParameters } from '../shared/classes/shopParameters';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
     baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { 

  }
  getProducts(shopParams:ShopParameters){ // Hover over to see return type. USE INTERFACE i.e IPagination
    let params = new HttpParams();
    if (shopParams.brandId !== 0){
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId.toString());
    }
    params = params.append('sort', shopParams.sort)
    params = params.append('pageIndex',shopParams.pageNumber.toString());
    params = params.append('pageSize',shopParams.pageSize.toString());

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
