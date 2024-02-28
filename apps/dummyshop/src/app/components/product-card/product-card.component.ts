import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductsRepository } from '../../services/products-repositoty.service';
import { Product } from '../../store/product';

@Component({
  selector: 'dummyshop-workspace-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  favoriteSlected = false;
  router = inject(Router);
  #store: ProductsRepository = inject(ProductsRepository);

  ngOnInit() {
      this.favoriteSlected = this.#store.favoriteProducts().some((fav: Product) => fav.id === this.product.id);
  }

  public addToFavorites(product: Product) {
    this.favoriteSlected = !this.favoriteSlected;
    this.#store.selectFavorite(product);
  }

  public removeFromFavorites(product: Product) {
    this.favoriteSlected = !this.favoriteSlected;
    this.#store.unSelectFavorite(product);
  }

}
