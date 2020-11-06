import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensingNodesMapComponent } from './sensing-nodes-map.component';

describe('SensingNodesMapComponent', () => {
  let component: SensingNodesMapComponent;
  let fixture: ComponentFixture<SensingNodesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensingNodesMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensingNodesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
