import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { environment } from 'src/assets/environments/environment';
import { Observable, of, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { Router } from '@angular/router';
//import { Product } from '../models/product';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  //mDataArray : any [];
  mDataArray: Observable<any[]>;
  baseUrl = environment.baseUrl;
  //public mProduct: Product = new Product();
  node_static_url = environment.node_static_url;
  mOutOfStockCount:any;
  searchTerm$ = new Subject<string>();

  constructor(
    private rest:RestService,
    private router:Router
  ) { }

  ngOnInit() {
    // this.rest.getProducts().subscribe(result=>{
    //   this.mDataArray = result;
    // })
    this.mDataArray = this.rest.getProducts(); //trigger to view using Observable -> async pipe

    /* Search with debounce */
    this.rest.searchWithDebounce(this.searchTerm$).subscribe(results => {
      this.mDataArray = of(results);
    });


  }
  async onSearch(keyword) {
    if (keyword == null || keyword == "") {
      this.mDataArray = this.rest.getProducts();
    } else {
      let result = await this.rest.getProductByKeyword(keyword).toPromise();
      this.mDataArray = of(result);
    }
  }

  deleteProduct(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async result => {
      if (result.value) {
        await this.rest.deleteProduct(id).toPromise();
        this.mDataArray = this.rest.getProducts();
      }
    })
  }

  editProduct(productID) {
    this.router.navigate(["/stock/edit/" + productID])
    //this.router.navigate(["/stock/edit/" + id]);
  }

}
