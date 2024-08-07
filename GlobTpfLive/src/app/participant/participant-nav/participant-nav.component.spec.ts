import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantNavComponent } from './participant-nav.component';

describe('ParticipantNavComponent', () => {
  let component: ParticipantNavComponent;
  let fixture: ComponentFixture<ParticipantNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipantNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
