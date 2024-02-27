import { inject, Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { productsActions, userActions } from './dummyshop.actions';
// import { Store } from '@ngrx/store';
// import { productsFeature } from '../store/dummyshop.reducer';
// import { fromProducts } from '../store/dummyshop.selectors';
import { ProductService } from '../services/product.service';
import { Product } from './product';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/interfaces/user.interface';
import { of } from 'rxjs';
import { Login } from '../auth/interfaces/login.interface';

interface ProductsResponse {
  products: Product[], 
  total: number, 
  limit: number, 
  skip: number
}

@Injectable()
export class ProductsEffects {
  #actions$ = inject(Actions);
  #productsService = inject(ProductService);
//   #store = inject(Store);
  load$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(productsActions.load),
      switchMap(() => this.#productsService.load()),
      map(( data: ProductsResponse ) =>
      productsActions.loadSuccess({
          products: data.products,
          total: data.total,
          limit: data.limit,
          skip: data.skip
        }),
      ),
      catchError(error => of(productsActions.loadFailure({ error })))
    );
  });
}

// @Injectable()
// export class UserEffects {
//   #actions$ = inject(Actions);
//   #authsService = inject(AuthService);
//   login$ = createEffect(() => {
//     return this.#actions$.pipe(
//       ofType(userActions.login),
//       tap(val => console.log(`login effect: ${val}`)),
//       switchMap((loginInfo: Login) => this.#authsService.login(loginInfo)),
//       map(( user: User ) =>
//       userActions.loginSuccess({
//         email: user.email,
//         firstName: user.firstName,
//         gender: user.gender,
//         id: user.id,
//         lastName: user.lastName,
//         token: user.token,
//         username: user.username,
//         image: user.image
//         }),
//       ),
//       catchError(error => of(userActions.loginFailure({ error })))
//     );
//   });
// }