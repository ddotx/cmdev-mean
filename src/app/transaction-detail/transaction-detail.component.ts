import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { TransactionResponse } from '../models/transaction';
import { environment } from 'src/assets/environments/environment';
import { RestService } from '../services/rest.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  mTransactionID: string;
  mOrderArray: Product[] = [];
  mTransaction = new TransactionResponse();
  node_static_url = environment.node_static_url;

  constructor(
    private route: ActivatedRoute,
    private rest: RestService,
    private location:Location
  ) { }

  // ngOnInit() {
  //   this.route.params.subscribe(async result => {
  //     let id = result['id'];
  //     //alert(id)
  //     this.mTransaction = await this.rest.getTransactionById(this.mTransactionID).toPromise();
  //     this.mDataArray = JSON.parse(this.mTransaction.order_list);

  //   })
  // }

  ngOnInit() {
    this.route.params.subscribe(async result=>{
      let id = result['id']
      console.info("%cTransaction ID = " + id , "color: white; background-color: green;")
      this.mTransactionID = result['id']
      this.mTransaction = await this.rest.getTransactionById(this.mTransactionID).toPromise()
      this.mOrderArray = JSON.parse(this.mTransaction.order_list)      
    })
  }

  onClickClose() {
this.location.back();
  }

}
