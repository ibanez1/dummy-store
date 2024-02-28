import { ChangeDetectionStrategy, Component, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductsRepository } from '../../services/products-repositoty.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NavBarComponent } from '../../components/navbar/navbar.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'dummyshop-workspace-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, NavBarComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent implements OnInit{
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

  previousPage() {
    this.#store.load({ limit: 10, skip: this.viewModel().skip - 10 });
  }

  nextPage() {
    this.#store.load({ limit: 10, skip: this.viewModel().skip + 10 });
  }
  
  ngOnInit(): void{
    this.#store.load();
  }
}
