import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from './product';
import { Login } from '../auth/interfaces/login.interface';

export const productsActions = createActionGroup({
  source: 'Products',
  events: {
    load: props<{ limit: number, skip: number }>(),
    'Load Success': props<{
      products: Product[];
      total: number;
      limit: number;
      skip: number;
    }>(),
    loadFailure : props<{ error: string }>(),
    // 'Next Page': emptyProps(),
    // 'Previous Page': emptyProps(),
    selectFavorite: props<Product>(),
    unSelectFavorite: props<Product>(),
    select: props<{ id: number }>(),
    unselect: emptyProps(),
  },
});

export const userActions = createActionGroup({
  source: 'User',
  events: {
    login: props<Login>(),
    'Login Success': props<{
      email: string;
      firstName: string;
      gender: string;
      id: number;
      lastName: string;
      token: string;
      username: string;
      image: string;
      }>(),
    'Login Failure': props<{ error: string}>(),
    logout: emptyProps(),
  },
});