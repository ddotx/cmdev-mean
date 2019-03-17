import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/assets/environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { TransactionRequest, TransactionResponse } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});  
  private hostUrl = `http://localhost:8081/`;  // don't use local in case of cross domain or ip address
  private apiUrl = `${this.hostUrl}api/v2`;
  private loginUrl = `${this.apiUrl}/login`;
  private registerUrl = `${this.apiUrl}/register`;
  private productUrl = `${this.apiUrl}/product`;  
  private uploadImageUrl = `${this.apiUrl}/upload_file`;
  private transactionUrl = `${this.apiUrl}/transaction`;
  private reportUrl = `${this.apiUrl}/report`;
  
  constructor(
    private http:HttpClient
  ) { }

  login(credential){
    return this.http.post<any>(this.loginUrl, credential,{headers:this.headers});
  }

  isLoggedIn(){
    let authenInfo = JSON.parse(localStorage.getItem(environment.localAuthenInfo));        
    return (authenInfo != null);
  }

  register(credential){
    return this.http.post<any>(this.registerUrl, credential,{headers:this.headers});
  }

  getProducts(){
    // let authenInfo = JSON.parse(localStorage.getItem(environment.localAuthenInfo));
    // this.headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8', 'x-access-token':authenInfo.token});
    return this.http.get<any[]>(this.productUrl,{headers: this.headers})
  }

  getProduct(id: number) {
    const url = `${this.productUrl}/id/${id}`; 
    return this.http.get<any>(url, {headers: this.headers});    
  }

  updateProduct(product){           
    return this.http.put<any>(this.productUrl, product);
  }

  deleteProduct(id) {
    
    const url = `${this.productUrl}/id/${id}`;
    return this.http.delete<void>(url, {headers: this.headers});
  }

  addProduct(product){    
    return this.http.post<any>(this.productUrl, product);
  }

  //search
  getProductByKeyword(keyword: string) {
    const url = `${this.productUrl}/name/${keyword}`;
    return this.http.get<Product[]>(url);    
  }

  searchWithDebounce(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => {
        if (term != null && term != ""){
          return this.getProductByKeyword(term)
        }else{
          return this.getProducts()
        }
      });
  }

//Transaction
sendTransaction(tranaction:TransactionRequest){
    const url = `${this.transactionUrl}`;
    return this.http.post(url, tranaction, {headers: this.headers});
  }


  getTransaction(){
    const url = `${this.transactionUrl}`;
    return this.http.get<TransactionResponse[]>(url);

  }

  getTransactionById(id:string){
    const url = `${this.transactionUrl}/id/${id}`;
    return this.http.get<TransactionResponse>(url);
  }

}
