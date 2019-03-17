export class TransactionRequest{
  subtotal:number;
  discount:number;
  shipping_cost:number;
  tax_percent:number;  
  total:number;  
  paid:number;
  change:number;  
  order_list:string; 
  payment_type:string;
  payment_detail:string;  
  staff_id:string;
  seller_id:string;  
  buyer_id:string;  
  comment:string;

  constructor(){
    this.subtotal = 0;
    this.discount = 0;
    this.shipping_cost = 0;
    this.tax_percent = 0;
    this.total = 0;
    this.paid = 0;
    this.change = 0;
    this.order_list = "x";
    this.payment_type = "x";
    this.payment_detail = "x";
    this.staff_id = "x";
    this.seller_id = "x";
    this.buyer_id = "x";
    this.comment = "x";
  }
}

export class TransactionResponse{
  _id:number;
  transaction_id:number;
  subtotal:number;
  discount:number;
  shipping_cost:number;
  tax_percent:number;  
  total:number;  
  paid:number;
  change:number;  
  order_list:string; 
  payment_type:string;
  payment_detail:string;  
  staff_id:string;
  seller_id:string;  
  buyer_id:string;  
  comment:string; 
  timestamp:string;
}