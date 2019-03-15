import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    private rest:RestService //DI
  ) { }

  ngOnInit() {
  }

  onClickSubmit(formValues){
    //alert(JSON.stringify(formValues))
    this.rest.login(formValues).subscribe(result=>{

      alert(JSON.stringify(result));
      this.router.navigate(["stock"])
    });
    
  }
}
  
