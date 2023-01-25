import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationRegisterComponent } from './station-register.component';

describe('StationRegisterComponent', () => {
  let component: StationRegisterComponent;
  let fixture: ComponentFixture<StationRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
