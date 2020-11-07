import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionReadingsComponent } from './pollution-readings.component';

describe('PollutionReadingsComponent', () => {
  let component: PollutionReadingsComponent;
  let fixture: ComponentFixture<PollutionReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollutionReadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollutionReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
