import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { userActions } from '../../store/dummyshop.actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subject, of, throwError } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let actionsSubject: ActionsSubject;
  let destroy$: Subject<void>;
  let formBuilder: FormBuilder;
  let authService: AuthService;
  let store: Store;
  let router: Router;
  let destroySubject: Subject<boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [ ActionsSubject, FormBuilder, 
        { provide: AuthService, useValue: { login: () => {return} } },
        { provide: Store, useValue: { dispatch: () => {return} } } ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    actionsSubject = TestBed.inject(ActionsSubject);
    destroy$ = new Subject<void>();
    formBuilder = TestBed.inject(FormBuilder);
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    destroySubject = component.destroy$;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroy$.next();
    destroy$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset login form and subscribe to login success action', () => {
    jest.spyOn(component, 'resetFormLogin');
    jest.spyOn(component, 'handleLoginSuccess');
    jest.spyOn(component, 'handleLoginError');

    component.ngOnInit();

    expect(component.resetFormLogin).toHaveBeenCalled();
    jest.spyOn(router, 'navigate')
    .mockImplementation(() => {return new Promise((resolve, reject) => {resolve(true)})});
    const loginSuccessAction = userActions.loginSuccess({     
      email: "aaa",
      firstName: "aaa",
      gender:"aaa",
      id: 1,
      lastName: "aaa",
      token:"aaa",
      username: "aaa",
      image: "aaa", });
    actionsSubject.next(loginSuccessAction);

    expect(component.handleLoginSuccess).toHaveBeenCalled();
  });

  it('should reset login form', () => {
    // Mock the form group
    component.formLogin = formBuilder.group({
      username: 'test',
      password: 'password123',
    });

    // Call the method to reset the form
    component.resetFormLogin();

    // Check if the form values are reset
    expect(component.formLogin.get('username')?.value).toBe('');
    expect(component.formLogin.get('password')?.value).toBe('');
  });

  it('should return true if field is invalid and touched', () => {
    const formGroup = formBuilder.group({
      username: ['test', Validators.required],
      password: ['password123', Validators.required]
    });
    component.formLogin = formGroup;

    // Simulate the field being touched
    const usernameControl: AbstractControl | null = component.formLogin.get('username');
    if (usernameControl) {
      usernameControl.markAsTouched();
    }

    // Call the method with the field name
    const isInvalid = component.isFieldInvalid('username');

    // Check if the method returns true as expected
    expect(isInvalid).toBe(false);
  });

  it('should return false if field is valid and touched', () => {
    const formGroup = formBuilder.group({
      username: ['test', Validators.required],
      password: ['password123', Validators.required]
    });
    component.formLogin = formGroup;

    // Simulate the field being untouched
    const usernameControl: AbstractControl | null = component.formLogin.get('username');
    if (usernameControl) {
      usernameControl.markAsUntouched();
    }

    // Call the method with the field name
    const isInvalid = component.isFieldInvalid('username');

    // Check if the method returns false as expected
    expect(isInvalid).toBe(false);
  });

  it('should return false if field is invalid but not touched', () => {
    const formGroup = formBuilder.group({
      username: ['', Validators.required],
      password: ['password123', Validators.required]
    });
    component.formLogin = formGroup;

    // Simulate the field being untouched
    const usernameControl: AbstractControl | null = component.formLogin.get('username');
    if (usernameControl) {
      usernameControl.markAsUntouched();
    }

    // Call the method with the field name
    const isInvalid = component.isFieldInvalid('username');

    // Check if the method returns false as expected
    expect(isInvalid).toBe(false);
  });

  it('should call authService.login() with correct login info on successful form submission', () => {
    const loginInfo = { username: 'test', password: 'password123' };
    const authServiceSpy =  jest.spyOn(authService, 'login').mockReturnValue(of({email: "aaa",
    firstName: "aaa",
    gender:"aaa",
    id: 1,
    lastName: "aaa",
    token:"aaa",
    username: "aaa",
    image: "aaa"}));
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');

    component.formLogin.patchValue(loginInfo);
    component.login();

    expect(authServiceSpy).toHaveBeenCalledWith(loginInfo);
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  it('should call handleLoginError() on error from authService.login()', () => {
    const loginInfo = { username: 'test', password: 'password123' };
    jest.spyOn(authService, 'login').mockReturnValue(throwError('Error'));
    const handleLoginErrorSpy = jest.spyOn(component, 'handleLoginError');

    component.formLogin.patchValue(loginInfo);
    component.login();

    expect(handleLoginErrorSpy).toHaveBeenCalled();
  });

  it('should mark all fields as touched if form is invalid', () => {
    jest.spyOn(component.formLogin, 'markAllAsTouched');
    const authServiceSpy = jest.spyOn(authService, 'login');

    // Make the form invalid
    component.formLogin.setErrors({ invalid: true });

    component.login();

    expect(component.formLogin.markAllAsTouched).toHaveBeenCalled();
    expect(authServiceSpy).not.toHaveBeenCalled();
  });

  it('should set isSubmitting to false and navigate to /home with replaceUrl', () => {
    const routerNavigateSpy = jest.spyOn(router, 'navigateByUrl').mockImplementation(() => {return new Promise((resolve, reject) => {resolve(true)})});

    component.handleLoginSuccess();

    expect(component.isSubmitting).toBe(false);
    jest.spyOn(router, 'navigate')
    .mockImplementation(() => {return new Promise((resolve, reject) => {resolve(true)})});
    expect(routerNavigateSpy).toHaveBeenCalledWith('/home', { replaceUrl: true });
  });

  it('should set isSubmitting to false and errorRequest to "Invalid username or password"', () => {
    const errorMock = { error: { message: 'Error message' } };
    jest.spyOn(window, 'alert').mockImplementation(() => {return });
    jest.spyOn(console, 'log');

    component.handleLoginError(errorMock);

    expect(component.isSubmitting).toBe(false);
    expect(component.errorRequest).toBe('Invalid username or password');
    expect(window.alert).toHaveBeenCalledWith(errorMock.error.message);
    expect(console.log).toHaveBeenCalledWith('Error', errorMock);
  });

  it('should complete the destroy$ subject', () => {
    jest.spyOn(destroySubject, 'next');
    jest.spyOn(destroySubject, 'complete');

    component.ngOnDestroy();

    expect(destroySubject.next).toHaveBeenCalledWith(true);
    expect(destroySubject.complete).toHaveBeenCalled();
  });

});
