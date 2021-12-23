import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() totalCount:number;
  @Input() pageSize:number;
  @Output() pageChangedEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  changePage(event:any){
    this.pageChangedEvent.emit(event.page);
  }
}
