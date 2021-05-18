import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyDashboardComponent } from './plotly-dashboard.component';

describe('PlotlyDashboardComponent', () => {
  let component: PlotlyDashboardComponent;
  let fixture: ComponentFixture<PlotlyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotlyDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotlyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
