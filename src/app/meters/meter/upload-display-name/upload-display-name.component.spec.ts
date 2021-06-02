import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDisplayNameComponent } from './upload-display-name.component';

describe('UploadDisplayNameComponent', () => {
  let component: UploadDisplayNameComponent;
  let fixture: ComponentFixture<UploadDisplayNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDisplayNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDisplayNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
