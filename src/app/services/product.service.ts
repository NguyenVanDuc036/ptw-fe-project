import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts():Observable <Product[]>{
    return this.http.get<Product[]>('http://localhost:3500/api/products');
  }

  getProductsDetail(id:any):Observable <Product[]>{
    return this.http.get<Product[]>(`http://localhost:3500/api/products/${id}`);
  }

  deleteProduct(id:any):Observable <Product[]>{
    return this.http.delete<Product[]>(`http://localhost:3500/api/products/${id}`);
  }


  insertProduct(item:Product): Observable<Product> {
    	const headers = { 'content-type': 'application/json'} 
    	console.log(JSON.stringify(item))						
      return this.http.post<Product>('http://localhost:3500/api/products/', item, {'headers':headers});
  }

  updateProduct(item:Product , id:any): Observable<Product> {
    const headers = { 'content-type': 'application/json'} 
    console.log(JSON.stringify(item))						
    return this.http.put<Product>(`http://localhost:3500/api/products/${id}`, item, {'headers':headers});
}


}
