import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCusumComponent } from './upload-cusum.component';

describe('UploadCusumComponent', () => {
  let component: UploadCusumComponent;
  let fixture: ComponentFixture<UploadCusumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCusumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCusumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
