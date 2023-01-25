import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmBeneficiaryComponent } from './adm-beneficiary.component';

describe('AdmBeneficiaryComponent', () => {
  let component: AdmBeneficiaryComponent;
  let fixture: ComponentFixture<AdmBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmBeneficiaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
