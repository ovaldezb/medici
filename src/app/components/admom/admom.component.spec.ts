import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmomComponent } from './admom.component';

describe('AdmomComponent', () => {
  let component: AdmomComponent;
  let fixture: ComponentFixture<AdmomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
