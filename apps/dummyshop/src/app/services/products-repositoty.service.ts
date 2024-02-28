import { inject, Injectable, Signal } from '@angular/core';
import { productsActions, userActions } from '../store/dummyshop.actions';
import { Product } from '../store/product';
import { fromProducts, fromUser } from '../store/dummyshop.selectors';
import { Store } from '@ngrx/store';
import { User } from '../auth/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class ProductsRepository {
  #store = inject(Store);

  get products(): Signal<Product[]> {
    return this.#store.selectSignal(fromProducts.selectProducts);
  }

  get favoriteProducts(): Signal<Product[]> {
    return this.#store.selectSignal(fromProducts.selectFavorites);
  }

  get pagedProducts(): Signal<{
    products: (Product & { selected: boolean })[];
    total: number | undefined;
    limit: number | undefined;
    skip: number | undefined;
  }> {
    return this.#store.selectSignal(fromProducts.selectPagedProducts);
  }

  get user(): Signal<User | undefined> {
    return this.#store.selectSignal(fromUser.selectUser);
  }

  loadUser(user: User): void {
    this.#store.dispatch(userActions.loginSuccess(user));
  }

  findById(id: number): Signal<Product | undefined> { 
    return this.#store.selectSignal(fromProducts.selectById(id));
  }
  load(queryParams = {limit: 5, skip: 0}): void {
    this.#store.dispatch(productsActions.load(queryParams));
  }

  selectFavorite(product: Product): void {
    this.#store.dispatch(productsActions.selectFavorite(product));
  }

  unSelectFavorite(product: Product): void {
    this.#store.dispatch(productsActions.unSelectFavorite(product));
  }
  select(id: number): void {
    this.#store.dispatch(productsActions.select({ id }));
  }
  unselect(): void {
    this.#store.dispatch(productsActions.unselect());
  }
}
