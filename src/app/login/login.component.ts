import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  mIsError = false;


  constructor(
    private router:Router, 
    private rest:RestService
    ) { }

  ngOnInit() {
    if (this.rest.isLoggedIn() == true){
      this.router.navigate(["stock"])
    }
  }

  onClickSubmit(formValues){

    this.rest.login(formValues).subscribe(result=>{
      // alert(JSON.stringify(result))
      if (result.auth == true){
        localStorage.setItem(environment.localAuthenInfo, JSON.stringify(result))
        this.mIsError = false;
        this.router.navigate(["stock"])
      }else{
        this.mIsError = true
      }
    })    
  }

}
  
