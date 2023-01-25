import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventQuerryComponent } from './event-querry.component';

describe('EventQuerryComponent', () => {
  let component: EventQuerryComponent;
  let fixture: ComponentFixture<EventQuerryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventQuerryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventQuerryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
