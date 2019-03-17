import { Component, OnInit } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  onClickLogout(){
    localStorage.removeItem(environment.localAuthenInfo);
    this.router.navigate(["/login"]);
  }

}
