import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private rest:RestService,
    private location:Location
  ) { }

  ngOnInit() {
  }

  onClickSubmit(formValues){
    this.rest.register(formValues).subscribe(result=>{
      alert(JSON.stringify(result));
      this.location.back();
    })
    
  }

}
