import { Component, OnInit } from '@angular/core';
import { IProductBrand } from '../shared/interfaces/productBrand';
import { IProduct } from '../shared/interfaces/products';
import { IProductType } from '../shared/interfaces/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  types: IProductType[];
  brands: IProductBrand[];
  selectedBrandId = 0;
  selectedTypeId = 0;
  sortSelected = 'name';
  sortOptions = [
    {name:'Alphabetical', value: 'name'},
    {name:'Price: Low to High', value: 'priceAsc'},
    {name:'Price: High to Low', value: 'priceDesc'},
  ]
  totalItems = 64;
  currentPage = 4;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductBrands();
    this.getProductTypes();
  }

  filterBrand(brandId: number) {
    this.selectedBrandId = brandId;
    this.getProducts();
  }
  filterType(typeId: number) {
    console.log(typeId);
    this.selectedTypeId = typeId;
    this.getProducts();
  }
  getProducts() {
    this.shopService.getProducts(this.selectedBrandId, this.selectedTypeId, this.sortSelected).subscribe(response => {
      this.products = response.data; //look at rxjs response.body mapping in service.ts
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
    this.sortSelected = sort;
    this.getProducts();
  }
  pageChanged(pageNo: number): void {
    this.currentPage = pageNo;
  }
}