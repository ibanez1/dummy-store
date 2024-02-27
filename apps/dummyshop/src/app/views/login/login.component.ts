import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { userActions } from '../../store/dummyshop.actions';
import { Subject, catchError, of, takeUntil, throwError } from 'rxjs';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'dummyshop-workspace-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy{
  formLogin: FormGroup;
  isSubmitting = false;
  errorRequest: string | null = null;
  #store = inject(Store);
  destroy$ = new Subject<boolean>();
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private actionsListener$: ActionsSubject
  ) {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.resetFormLogin();
    this.actionsListener$
      .pipe(ofType(userActions.loginSuccess))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleLoginSuccess();
        },
        error: error => this.handleLoginError(error)
      })
  }

  /**
   * Reinicia el formulario de inicio de sesión estableciendo los valores de los campos en blanco.
   */
  resetFormLogin(): void {
    this.formLogin.reset({
      username: '',
      password: '',
    });
  }

  /**
 * Verifica si un campo del formulario es inválido.
 * @param fieldName El nombre del campo del formulario.
 * @returns Un valor booleano que indica si el campo es inválido.
 */
  isFieldInvalid(fieldName: string) {
    const field = this.formLogin.get(fieldName);
    return field?.invalid && field?.touched;
  }

  /**
* Realiza la acción de inicio de sesión.
* Si el formulario es válido, envía la solicitud de inicio de sesión al servicio de autenticación.
* Si se produce un error, muestra un mensaje de error en el snackbar.
*/
  login(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const username = this.formLogin.get('username')?.value.trim();
    const password = this.formLogin.get('password')?.value;
  
    const loginInfo = {
      username,
      password,
    };
    this.isSubmitting = true;

    console.log("login:::::::::::", loginInfo);
    // this.#store.dispatch(userActions.login(loginInfo));

    this.authService.login(loginInfo).subscribe(
      (user) => {
        this.#store.dispatch(userActions.loginSuccess(user));
      }, (error: any) => {
        this.handleLoginError(error);
      }
    )

  }

  /**
* Maneja el éxito del inicio de sesión.
* Restablece el estado del formulario y redirige al usuario a la página de destino.
*/
  handleLoginSuccess(): void {
    this.isSubmitting = false;
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  /**
   * Maneja el error del inicio de sesión.
   * Muestra un mensaje de error en el snackbar y restablece el estado del formulario.
   * @param error El objeto de error recibido.
   */
  handleLoginError(error: any): void {
    this.isSubmitting = false;
    this.errorRequest = 'Invalid username or password';
    console.log('Error', error);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
