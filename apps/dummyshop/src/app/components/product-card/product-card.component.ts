import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
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

export class ProductCardComponent {
  @Input() product: Product;
  @Input() favoriteSlected = false;
  router = inject(Router);
  #store: ProductsRepository = inject(ProductsRepository);

  public addToFavorites(product: any) {
    this.favoriteSlected = !this.favoriteSlected;
    this.#store.selectFavorite(product);
  }

  public removeFromFavorites(product: any) {
    this.favoriteSlected = !this.favoriteSlected;
    this.#store.unSelectFavorite(product);
  }

}
