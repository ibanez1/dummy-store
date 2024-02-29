import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductsRepository } from '../../services/products-repositoty.service';
import { Product } from '../../store/product';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NavBarComponent } from '../../components/navbar/navbar.component';
import { EmptyPageComponent } from '../../components/empty-page/empty-page.component';

@Component({
  selector: 'dummyshop-workspace-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, NavBarComponent, EmptyPageComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FavoritesComponent implements OnInit{
  router = inject(Router);
  store: ProductsRepository = inject(ProductsRepository);
  favoriteProducts: WritableSignal<Product[]> = signal([]);
    ngOnInit(): void{
      const favorites: Product[] = this.store.favoriteProducts();
      this.favoriteProducts.set(favorites);
    }
}