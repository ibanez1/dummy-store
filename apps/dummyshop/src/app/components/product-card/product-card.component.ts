import { ChangeDetectionStrategy, Component, Input, OnInit, computed, inject, signal } from '@angular/core';
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
  favoriteSelected = signal(false);
  router = inject(Router);
  #store: ProductsRepository = inject(ProductsRepository);

  ngOnInit() {
      const favoriteSlected = this.#store.favoriteProducts().some((fav: Product) => fav.id === this.product.id);
      this.favoriteSelected.set(favoriteSlected);
  }

  public changeFavoriteState(product: Product) {
    if(this.favoriteSelected()){
      this.#store.unSelectFavorite(product);
    } else {
      this.#store.selectFavorite(product);
    }
    this.favoriteSelected.update(() => !this.favoriteSelected());
  }

}
