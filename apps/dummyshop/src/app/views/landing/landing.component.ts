import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { Store } from '@ngrx/store';
import { userActions } from '../../store/dummyshop.actions';

@Component({
  selector: 'dummyshop-workspace-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent, LoginComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit, OnDestroy{
  static isBrowser = new BehaviorSubject<boolean>(false);
  authService = inject(AuthService);
  platformId = inject(PLATFORM_ID);
  isBorwser = false;
  isAuthenticated = false;
  #store = inject(Store);
  router = inject(Router);

  constructor() {
    LandingComponent.isBrowser.next(isPlatformBrowser(this.platformId));
  }

  ngOnInit() {
    LandingComponent.isBrowser.subscribe((isBrowser) => {
      if (isBrowser) {
        this.isBorwser = true;
        if(this.authService.isAuthenticated()){
          this.isAuthenticated = true;
          const user = this.authService.getUserInfo();
          this.#store.dispatch(userActions.loginSuccess(user));
          this.router.navigate(['/home']);
        } else {
          this.isAuthenticated = false;
          this.router.navigate(['/login']);
        }
      } else {
        console.log('I am not a browser');
      }
    });
  }

  ngOnDestroy() {
    LandingComponent.isBrowser.unsubscribe();
  }
}
