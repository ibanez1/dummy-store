import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)

  hitEndpoint() {
    return this.http.get('https://dummyjson.com/products')
  }
}
