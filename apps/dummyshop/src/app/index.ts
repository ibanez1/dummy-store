import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productsFeature, userFeature } from './store/dummyshop.reducer';
import { ProductsEffects } from './store/dummyshop.effects';


export const provideDummyShop = () => [
  provideState(productsFeature),
  provideState(userFeature),
  provideEffects([ProductsEffects]),
];
