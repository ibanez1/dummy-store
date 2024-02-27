import { Product } from '../store/product';
import { createFeature, createReducer, on } from '@ngrx/store';
import { productsActions } from './dummyshop.actions';
import { userActions } from './dummyshop.actions';
import { User } from '../auth/interfaces/user.interface';

export interface ProductsState {
    products: Product[];
    favorites: Product[];
    total: number | undefined;
    limit: number | undefined;
    skip: number | undefined;
    selectedId: number | undefined;
    user: User | undefined;
  }

export const initialState: ProductsState = {
    products: [],
    favorites: [],
    total: undefined,
    limit: undefined,
    skip: undefined,
    selectedId: undefined,
    user: undefined
  };

  export const productsFeature = createFeature({
    name: 'products',
    reducer: createReducer<ProductsState>(
      initialState,
      on(
        productsActions.load,
        (state): ProductsState => ({
          ...state,
        }),
      ),
      on(
        productsActions.loadSuccess,
        (state, { products, total, limit, skip }): ProductsState => ({
          ...state,
          products,
          total,
          limit,
          skip
        }),
      ),
      on(
        productsActions.selectFavorite,
        (state, newFavoriteProduct): ProductsState => ({
          ...state,
          favorites: [...state.favorites, newFavoriteProduct]
        }),
      ),
      on(
        productsActions.unSelectFavorite,
        (state, favoriteProductToBeRemoved): ProductsState => ({
          ...state,
          favorites: state.favorites.filter((product) => product.id !== favoriteProductToBeRemoved.id),
        }),
      ),
    ),
  });
  
  
  export interface UserState {
    user: User | undefined;
  }

export const initialStateUser: UserState = {
    user: undefined
  };

  export const userFeature = createFeature({
    name: 'user',
    reducer: createReducer<UserState>(
      initialStateUser,
      on(
        userActions.login,
        (state): UserState => ({
          ...state,
        }),
      ),
      on(
        userActions.loginSuccess,
        (state,  user ): UserState => ({
          ...state,
          user
        }),
      ),
    ),
  });
  
  