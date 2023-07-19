import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEnfermedadComponent } from './consulta-enfermedad.component';

describe('ConsultaEnfermedadComponent', () => {
  let component: ConsultaEnfermedadComponent;
  let fixture: ComponentFixture<ConsultaEnfermedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEnfermedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
