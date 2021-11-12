import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './interfaces/pagination';
import { IProduct } from './interfaces/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  products: IProduct[];

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products').subscribe((response: IPagination) => {
      this.products = response.data;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
