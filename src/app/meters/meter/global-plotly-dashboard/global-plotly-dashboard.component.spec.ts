import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPlotlyDashboardComponent } from './global-plotly-dashboard.component';

describe('GlobalPlotlyDashboardComponent', () => {
  let component: GlobalPlotlyDashboardComponent;
  let fixture: ComponentFixture<GlobalPlotlyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalPlotlyDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPlotlyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
