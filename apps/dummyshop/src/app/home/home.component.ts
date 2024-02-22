import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs'
import { ProductService } from '../services/product.service';

@Component({
  selector: 'dummyshop-workspace-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  productService = inject(ProductService)
  data$: Observable<any> = this.productService.hitEndpoint();
}
