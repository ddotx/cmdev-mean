import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransactionRequest } from '../models/transaction';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() productOrder: any
  @Input() totalNumber: any
  @Output() onCompleted = new EventEmitter<void>()
  givenNumber = "";

  constructor(
    private rest:RestService
  ) { }


  ngOnInit() {
  }

  convertToNumber(value): number {
    return Number(value.replace(/,/g, ''));
  }

  public get changeNumber(): number {

    let result = this.convertToNumber(this.givenNumber) - this.totalNumber;
    if (result >= 0) {
      return result;
    } else {
      return 0;
    }
  }


  public get isPaidEnough() {
    if (Number(this.givenNumber) >= this.totalNumber) {
      return true;
    }
    return false
  }



  public onClickReset() {
    this.givenNumber = "0";
  }

  onClickGiven(addGiven: number) {
    this.givenNumber = String(Number(this.givenNumber) + addGiven);
  }

  onClickExact() {
    this.givenNumber = String(this.totalNumber);
  }
  onClickSubmit(){
    let trans = new TransactionRequest();
    trans.total = this.totalNumber;
    trans.paid = Number(this.givenNumber);
    trans.change = Number(this.givenNumber) - this.totalNumber;
    trans.payment_type = "cash";
    trans.payment_detail = "full";
    trans.seller_id = "sr0001";
    trans.buyer_id = "by0000";
    trans.order_list = this.productOrder;

    this.rest.sendTransaction(trans).subscribe(result=>{
      this.onCompleted.emit();

      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
