import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensingNodesComponent } from './sensing-nodes.component';

describe('SensingNodesComponent', () => {
  let component: SensingNodesComponent;
  let fixture: ComponentFixture<SensingNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensingNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensingNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
