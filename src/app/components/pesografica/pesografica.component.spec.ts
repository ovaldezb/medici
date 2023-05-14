import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesograficaComponent } from './pesografica.component';

describe('PesograficaComponent', () => {
  let component: PesograficaComponent;
  let fixture: ComponentFixture<PesograficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesograficaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesograficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
