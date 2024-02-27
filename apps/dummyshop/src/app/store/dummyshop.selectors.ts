import { createSelector } from '@ngrx/store';
import { productsFeature } from './dummyshop.reducer';
import { Product } from './product';

const { selectProducts, selectSelectedId } = productsFeature;

const selectById = (id: number) =>
  createSelector(selectProducts, (state: Product[]): Product | undefined =>
    state.find((p) => p.id === id),
  );

// const selectSkip = createSelector(
//   productsFeature.selectProductsState,
//   (state) => state.page < state.total,
// );
// const selectLimit = createSelector(
//   productsFeature.selectPage,
//   (page) => page > 1,
// );

// const selectTotal= createSelector(
//   productsFeature.selectPage,
//   (page) => page > 1,
// );

const selectPagedProducts = createSelector(
  selectProducts,
  selectSelectedId,
  productsFeature.selectTotal,
  productsFeature.selectLimit,
  productsFeature.selectSkip,
  (products, selectedId, total, limit, skip) => ({
    products: products.map((product: Product) => ({
      ...product,
      selected: product.id === selectedId,
    })),
    total,
    limit,
    skip
  }),
);

export const fromProducts = {
  selectProducts,
  selectPagedProducts,
  selectById,
//   selectHasPreviousPage,
//   selectHasNextPage,
};
