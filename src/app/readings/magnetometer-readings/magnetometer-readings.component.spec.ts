import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnetometerReadingsComponent } from './magnetometer-readings.component';

describe('MagnetometerReadingsComponent', () => {
  let component: MagnetometerReadingsComponent;
  let fixture: ComponentFixture<MagnetometerReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagnetometerReadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnetometerReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
