import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesFarmaciaComponent } from './reportes-farmacia.component';

describe('ReportesFarmaciaComponent', () => {
  let component: ReportesFarmaciaComponent;
  let fixture: ComponentFixture<ReportesFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesFarmaciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
