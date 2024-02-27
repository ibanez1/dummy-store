import { Product } from '../store/product';
import { createFeature, createReducer, on } from '@ngrx/store';
import { productsActions } from './dummyshop.actions';
import { userActions } from './dummyshop.actions';
import { User } from '../auth/interfaces/user.interface';

export interface ProductsState {
    products: Product[];
    total: number | undefined;
    limit: number | undefined;
    skip: number | undefined;
    selectedId: number | undefined;
    user: User | undefined;
  }

export const initialState: ProductsState = {
    products: [],
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
    //   on(
    //     customersActions.select,
    //     (state, { id }): CustomersState => ({
    //       ...state,
    //       selectedId: id,
    //     }),
    //   ),
    //   on(
    //     customersActions.unselect,
    //     (state): CustomersState => ({
    //       ...state,
    //       selectedId: undefined,
    //     }),
    //   ),
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
  
  