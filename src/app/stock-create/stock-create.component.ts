import { Component, OnInit } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Product } from '../models/product';
import { RestService } from '../services/rest.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  baseUrl = environment.baseUrl;
  public uploadedImageSize:string;
  public imageSrc: any = null;
  public mProduct: Product = new Product(); //Have to initial
  //public mProduct = Product
  // public mProduct:any = {
  //   name: "",
  //   stock: 0,
  //   price: 0
  // };
// TODO:
  node_static_url = environment.node_static_url; 
  mIsSubmitted = false;

  constructor(
    private rest:RestService,
    private location:Location
  ) { }

  ngOnInit() {
  }

  async onAddProduct(){
    let formData = new FormData();
    formData.append('name',this.mProduct.name);
    formData.append('stock',this.mProduct.stock.toString());
    formData.append('price',this.mProduct.price.toString());
    formData.append('upload_file',this.mProduct.image);

    await this.rest.addProduct(formData).toPromise();
    this.location.back();
    //alert(JSON.stringify(this.mProduct))
  }

  onUploadImage(event) {
    this.mProduct.image = event.target.files[0];

    if (this.mProduct.image) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mProduct.image);
    }
  }

  onClickCancel(){
    //this.mProduct.price = 0
    this.location.back();
  }

}
