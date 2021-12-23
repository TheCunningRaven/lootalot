import { Component, OnInit } from '@angular/core';
import { IProductBrand } from '../shared/interfaces/productBrand';
import { IProduct } from '../shared/interfaces/products';
import { IProductType } from '../shared/interfaces/productType';
import { ShopService } from './shop.service';
import { ShopParameters } from '../../app/shared/classes/shopParameters';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  types: IProductType[];
  brands: IProductBrand[];
  shopParams = new ShopParameters();
  sortOptions = [
    {name:'Alphabetical', value: 'name'},
    {name:'Price: Low to High', value: 'priceAsc'},
    {name:'Price: High to Low', value: 'priceDesc'},
  ]
  totalItems = 64;
  currentPage = 4;
  totalCount:number;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductBrands();
    this.getProductTypes();
  }

  filterBrand(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }
  filterType(typeId: number) {
    console.log(typeId);
    this.shopParams.typeId = typeId;
    this.getProducts();
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data; //look at rxjs response.body mapping in service.ts
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }
  getProductBrands() {
    this.shopService.getProductBrands().subscribe(response => {
      this.brands = [{ id: 0, name: 'All' }, ...response];
    }, error => {
      console.log(error);
    });
  }
  getProductTypes() {
    this.shopService.getProductTypes().subscribe(response => {
      this.types = [{ id: 0, name: 'All' }, ...response];
    }, error => {
      console.log(error);
    });
  }
  onSortSelect(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(pageNumber: any): void {
    this.shopParams.pageNumber = pageNumber; //this event i
    this.getProducts();
  }
}
