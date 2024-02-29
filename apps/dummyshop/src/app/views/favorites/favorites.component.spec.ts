import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
// import { EndpointSimulationService } from '../../services/endpoint-simulation.service';
import { FavoritesComponent } from './favorites.component';
import { ProductsRepository } from '../../services/products-repositoty.service';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let store: ProductsRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: ProductsRepository, useValue: { user: () => {return} } } ,
        { provide: Store, useValue: { favoriteProducts: () => {return []}, set: () => {return []} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(ProductsRepository);
    (component.store as any)= { favoriteProducts: () => {return []}, set: () => {return []}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch load action on initialization', () => {
    component.ngOnInit();
  });
});
