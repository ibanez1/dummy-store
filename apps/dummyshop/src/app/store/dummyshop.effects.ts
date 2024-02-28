import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { productsActions } from './dummyshop.actions';
import { ProductService } from '../services/product.service';
import { Product } from './product';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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
  router = inject(Router);
  load$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(productsActions.load),
      switchMap((action) => this.#productsService.load({limit: action.limit, skip: action.skip })),
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

  redirect$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(productsActions.loadFailure),
      tap(() => this.router.navigate(['/login']))
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