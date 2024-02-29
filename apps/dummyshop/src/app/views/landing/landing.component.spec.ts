import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { AuthService } from '../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { userActions } from '../../store/dummyshop.actions';
import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let authService: AuthService;
  let store: Store;
  let isBrowser;
  let platformId;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent, RouterTestingModule, HttpClientModule, HttpClientModule],
      providers: [  
        { provide: AuthService, useValue: { isAuthenticated: () => {return}, getUserInfo: () => {return} } },
        { provide: Store, useValue: { dispatch: () => {return} } },
        { provide: Router, useValue: { navigate: () => {return} } }
        ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    platformId = TestBed.inject(PLATFORM_ID);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    isBrowser = {next: jest.fn(), subscribe: jest.fn()};
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
