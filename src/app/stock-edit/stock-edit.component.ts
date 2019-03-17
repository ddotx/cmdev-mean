import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/assets/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  public baseUrl = environment.baseUrl;
  public imageSrc: any = null;
 // public uploadedImageSize = "200px";
  public mProduct: Product = new Product();
  node_static_url = environment.node_static_url;
  mIsSubmitted = false;
  
  constructor(
    private location:Location,
    private route:ActivatedRoute,
    private rest:RestService
  ) { }

  ngOnInit() {
    //Get product id from sender route
    // this.route.params.subscribe(result=>{
    //   this.mProduct.product_id = result['id'];
    //   alert(this.mProduct.product_id);
    // })

    this.route.params.subscribe(async result=>{
      let id = result['id'];
      this.mProduct = await this.rest.getProduct(id).toPromise();
    })
  }

  onUploadImage(event) {
    this.mProduct.image = event.target.files[0];

    if (this.mProduct.image ) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mProduct.image);
    }
  }

  async onClickSubmit() {
      var formData = new FormData();
      formData.append("name", this.mProduct.name);
      formData.append("price", this.mProduct.price.toString());
      formData.append("stock", this.mProduct.stock.toString());
      formData.append("upload_file", this.mProduct.image);
      formData.append("product_id", this.mProduct.product_id);
      this.mIsSubmitted = true;
  
      await this.rest.updateProduct(formData).toPromise();
      this.mIsSubmitted=true;
      this.location.back();
    }
  
    onClickCancel() {
      this.location.back();
    }
  
  }

