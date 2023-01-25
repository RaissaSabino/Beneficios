import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCpfEdvComponent } from './read-cpf-edv.component';

describe('ReadCpfEdvComponent', () => {
  let component: ReadCpfEdvComponent;
  let fixture: ComponentFixture<ReadCpfEdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCpfEdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadCpfEdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
