import { ChangeDetectionStrategy, Component, OnInit, Signal, computed, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ProductsRepository } from '../../services/products-repositoty.service';

@Component({
  selector: 'dummyshop-workspace-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  #store: ProductsRepository = inject(ProductsRepository);
  viewModel: Signal<any> = computed(() => {
    const pagedProducts = this.#store.pagedProducts();
    return {
      products: pagedProducts.products,
      total: pagedProducts.total,
      limit: pagedProducts.limit,
      skip: pagedProducts.skip
      // pageIndex: pagedCustomers.page - 1,
      // length: pagedCustomers.total,
    };
  });
  ngOnInit(): void{
    this.#store.load();
    console.log("this.store.products:::::::::::", this.#store.products())
  }

  logOut() {
    this.authService.logout();
    // this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
