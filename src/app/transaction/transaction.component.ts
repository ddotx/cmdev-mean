import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../services/rest.service';
import { TransactionResponse } from '../models/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  //mTranArray: Observable<any[]>;
  mTranArray:TransactionResponse[];

  constructor(
    private rest:RestService,
    private router:Router
  ) { }

  async ngOnInit() {
  
  // this.mTranArray = this.rest.getTransaction();
  this.mTranArray = await this.rest.getTransaction().toPromise();

  }

  onClickTransection(id){
    this.router.navigate([`transaction/detail/${id}`]);
  }

  getNumberOfSKU(rawOrder): number {
    let order = JSON.parse(rawOrder);
    return order.length;
  }

}
