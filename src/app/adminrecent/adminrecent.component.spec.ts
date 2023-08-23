import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrecentComponent } from './adminrecent.component';

describe('AdminrecentComponent', () => {
  let component: AdminrecentComponent;
  let fixture: ComponentFixture<AdminrecentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminrecentComponent]
    });
    fixture = TestBed.createComponent(AdminrecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
