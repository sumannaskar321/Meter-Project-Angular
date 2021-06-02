import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetClassComponent } from './asset-class.component';

describe('AssetClassComponent', () => {
  let component: AssetClassComponent;
  let fixture: ComponentFixture<AssetClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
