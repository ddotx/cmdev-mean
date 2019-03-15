import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  register(credential){
    return this.http.post<any>(this.registerUrl, credential,{headers:this.headers});
  }
}
