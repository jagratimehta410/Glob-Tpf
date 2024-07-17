import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeProgramComponent } from './custome-program.component';

describe('CustomeProgramComponent', () => {
  let component: CustomeProgramComponent;
  let fixture: ComponentFixture<CustomeProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
