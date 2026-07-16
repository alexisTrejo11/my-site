import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeatures } from './project-features';

describe('FeaturedProjects', () => {
  let component: ProjectFeatures;
  let fixture: ComponentFixture<ProjectFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFeatures],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectFeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
