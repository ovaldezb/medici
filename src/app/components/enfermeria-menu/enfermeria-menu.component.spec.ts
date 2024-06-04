import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermeriaMenuComponent } from './enfermeria-menu.component';

describe('EnfermeriaMenuComponent', () => {
  let component: EnfermeriaMenuComponent;
  let fixture: ComponentFixture<EnfermeriaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnfermeriaMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnfermeriaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
