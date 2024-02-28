import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../store/product';
import { lastValueFrom, map } from 'rxjs';


interface ProductsResponse {
  products: Product[], 
  total: number, 
  limit: number, 
  skip: number
}

interface QueryParams {
  limit: number, 
  skip: number
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient);
  #baseUrl = 'https://dummyjson.com/auth/products';

  load(queryParams: QueryParams) {
    const url = this.#baseUrl + `?limit=${queryParams.limit}&skip=${queryParams.skip}`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${token}`);
    return this.#http.get<ProductsResponse>(url, { 'headers': headers }).pipe(map((data: ProductsResponse) => ({ ...data })));
  }
}
