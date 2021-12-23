import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(), //this loads array of providers on startup
    TooltipModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
