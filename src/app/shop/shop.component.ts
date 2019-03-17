import { Component, OnInit } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Product } from '../models/product';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  mAnimatedID = "";
  mOrderArray = new Array<Product>();
  mProductArray = new Array<Product>();
  mIsPaymentShown: boolean = false;
  mTotalPrice: number = 0;
  mTaxAmt: number = 0;
  mSelectedOrderLine: Product;
  errortext: string;
  //isPaymentMade: boolean = false;
  node_static_url = environment.node_static_url;
  baseUrl = environment.baseUrl;

  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
    this.rest.getProducts().subscribe(result => {
      this.mProductArray = result;
    })
  }

  pushNewOrder(item) {
    let foundIndex = this.mOrderArray.indexOf(item);

    if (foundIndex == -1) {
      item.qty = 1;
      this.mOrderArray.unshift(item);
      this.mSelectedOrderLine = item;
    } else {
      item.qty++;
    }
    this.countSumPrice();
  }

  countSumPrice() {
    this.mTotalPrice = 0;
    for (let item of this.mOrderArray) {
      this.mTotalPrice += item.price * item.qty;
    }

    this.mTaxAmt = this.mTotalPrice * 0.07;
    // if (this.mTotalPrice == 0) {
    //   this.isPaymentMade = false;
    // }
  }

  // public get isPaymentEnabled() {
  //   return (this.mTotalPrice > 0)
  // }

  onClickBtnPayment() {
    if (this.mTotalPrice > 0) {
      this.mIsPaymentShown = !this.mIsPaymentShown;
    } else {

    }
  }


  isSelectedItem(item) {
    return this.mOrderArray.indexOf(item) == -1 ? false : true;
  }

  removeOrder(item) {
    var index = this.mOrderArray.indexOf(item);

    this.mProductArray.map(item => {
      if (item.product_id == item.product_id) {
        item.qty = 1;
      }
    });

    this.mOrderArray.splice(index, 1);
    this.countSumPrice();

  }


  clearAllItems() {
    // clear value of ordered items
    for (var i = 0; i < this.mProductArray.length; i++) {
      this.mProductArray[i].qty = 1;
    }

    this.mOrderArray = [];
    this.countSumPrice();
    this.mIsPaymentShown = false;
  }

  public get jsonOrderArray() : string {
    return JSON.stringify(this.mOrderArray);
  }
  

  onPaymentCompleted() {
    this.mIsPaymentShown = false;
    this.clearAllItems()
  }


}
