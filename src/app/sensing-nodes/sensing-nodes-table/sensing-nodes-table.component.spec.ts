import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensingNodesTableComponent } from './sensing-nodes-table.component';

describe('SensingNodesTableComponent', () => {
  let component: SensingNodesTableComponent;
  let fixture: ComponentFixture<SensingNodesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensingNodesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensingNodesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
