import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectGallaryComponent } from './add-project-gallary.component';

describe('AddProjectGallaryComponent', () => {
  let component: AddProjectGallaryComponent;
  let fixture: ComponentFixture<AddProjectGallaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProjectGallaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProjectGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
