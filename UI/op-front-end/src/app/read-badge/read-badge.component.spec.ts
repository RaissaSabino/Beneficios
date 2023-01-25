import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBadgeComponent } from './read-badge.component';

describe('ReadBadgeComponent', () => {
  let component: ReadBadgeComponent;
  let fixture: ComponentFixture<ReadBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
