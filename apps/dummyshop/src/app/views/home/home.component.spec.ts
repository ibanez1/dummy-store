import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
// import { EndpointSimulationService } from '../../services/endpoint-simulation.service';
import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';
import { ProductsRepository } from '../../services/products-repositoty.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: ProductsRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientModule, RouterTestingModule],
      // providers: [EndpointSimulationService]
      providers: [
        { provide: ProductsRepository, useValue: { user: () => {return} } } ,
        { provide: Store, useValue: { dispatch: () => {return} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(ProductsRepository);
    (component.store as any)= { load: () => {return}, pagedProducts: () => {return { products: [], total: 0, limit: 0, skip: 0 }}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch load action with correct payload', () => {
    const expectedPayload = { limit: 0, skip: 0 };
    component.store = TestBed.inject(ProductsRepository);
    component.store.load = jest.fn();
    ((component as any).store as any).user = jest.fn().mockReturnValue({ id: 1, name: 'test'});
    component.previousPage();

    expect(component.store.load).toHaveBeenCalledWith(expectedPayload);
  });

  it('should dispatch load action with correct payload', () => {
    const expectedPayload = { limit:0, skip: 0 };

    component.store = TestBed.inject(ProductsRepository);
    component.store.load = jest.fn();
    (component.store as any).user = jest.fn().mockReturnValue({ id: 1, name: 'test'});

    component.nextPage();

    expect(component.store.load).toHaveBeenCalledWith(expectedPayload);

  });
  it('should dispatch load action on initialization', () => {
    component.ngOnInit();
  });
});
