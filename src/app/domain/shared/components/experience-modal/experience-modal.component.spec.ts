import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceModalComponent } from './experience-modal.component';

describe('ExperienceModalComponent', () => {
  let component: ExperienceModalComponent;
  let fixture: ComponentFixture<ExperienceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ExperienceModalComponent]
});
    fixture = TestBed.createComponent(ExperienceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
