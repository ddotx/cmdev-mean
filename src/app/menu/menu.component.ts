import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //Pre-selected menu at first sight
  selectedMenu = 'stock';
  
  constructor() { }

  ngOnInit() {
  }

}
