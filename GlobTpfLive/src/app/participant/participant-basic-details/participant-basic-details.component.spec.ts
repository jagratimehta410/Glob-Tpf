import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantBasicDetailsComponent } from './participant-basic-details.component';

describe('ParticipantBasicDetailsComponent', () => {
  let component: ParticipantBasicDetailsComponent;
  let fixture: ComponentFixture<ParticipantBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantBasicDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipantBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
