import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyPageComponent } from './third-party-page.component';

describe('ThirdPartyPageComponent', () => {
  let component: ThirdPartyPageComponent;
  let fixture: ComponentFixture<ThirdPartyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdPartyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
