import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaMovilComponent } from './factura-movil.component';

describe('FacturaMovilComponent', () => {
  let component: FacturaMovilComponent;
  let fixture: ComponentFixture<FacturaMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaMovilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
