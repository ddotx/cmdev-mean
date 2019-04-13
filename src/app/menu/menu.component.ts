import { Component, OnInit } from '@angular/core';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  baseUrl = environment.baseUrl;
  //Pre-selected menu at first sight
  selectedMenu = 'stock';
  
  constructor() { }

  ngOnInit() {
  }

}
