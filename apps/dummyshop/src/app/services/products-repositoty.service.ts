import { inject, Injectable, Signal } from '@angular/core';
import { productsActions } from '../store/dummyshop.actions';
import { Product } from '../store/product';
import { fromProducts } from '../store/dummyshop.selectors';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class ProductsRepository {
  #store = inject(Store);

  get products(): Signal<Product[]> {
    return this.#store.selectSignal(fromProducts.selectProducts);
  }
  get pagedProducts(): Signal<{
    products: (Product & { selected: boolean })[];
    total: number | undefined;
    limit: number | undefined;
    skip: number | undefined;
    // total: number;
    // page: number;
  }> {
    return this.#store.selectSignal(fromProducts.selectPagedProducts);
  }
  findById(id: number): Signal<Product | undefined> { 
    return this.#store.selectSignal(fromProducts.selectById(id));
  }
  load(): void {
    this.#store.dispatch(productsActions.load());
  }
//   nextPage() {
//     this.#store.dispatch(productsActions.nextPage());
//   }
//   previousPage() {
//     this.#store.dispatch(productsActions.previousPage());
//   }
  select(id: number): void {
    this.#store.dispatch(productsActions.select({ id }));
  }
  unselect(): void {
    this.#store.dispatch(productsActions.unselect());
  }
}
