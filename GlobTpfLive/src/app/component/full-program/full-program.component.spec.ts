import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProgramComponent } from './full-program.component';

describe('FullProgramComponent', () => {
  let component: FullProgramComponent;
  let fixture: ComponentFixture<FullProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
