import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiExplorer } from './api-explorer';

describe('ApiExplorer', () => {
  let component: ApiExplorer;
  let fixture: ComponentFixture<ApiExplorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiExplorer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiExplorer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
