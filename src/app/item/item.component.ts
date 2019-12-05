import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  number: number;

  constructor() { 
    this.number = 2;
  }

  ngOnInit() {
  }

  

}
