import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsModalComponent } from './projects-modal.component';

describe('ProjectsModalComponent', () => {
  let component: ProjectsModalComponent;
  let fixture: ComponentFixture<ProjectsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ProjectsModalComponent]
});
    fixture = TestBed.createComponent(ProjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
