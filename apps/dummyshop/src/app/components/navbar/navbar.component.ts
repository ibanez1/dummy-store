import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductsRepository } from '../../services/products-repositoty.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'dummyshop-workspace-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NavBarComponent implements OnInit{
  router = inject(Router);
  authService = inject(AuthService);
  store: ProductsRepository = inject(ProductsRepository);
  user = this.store.user()

  ngOnInit(): void {
    if(!this.user && sessionStorage.getItem('user')) {
      const userStr: string | null = sessionStorage.getItem('user');
      if(!Object.is(userStr, null)) {
        this.store.loadUser(JSON.parse(userStr ? userStr : ''));
      }
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
