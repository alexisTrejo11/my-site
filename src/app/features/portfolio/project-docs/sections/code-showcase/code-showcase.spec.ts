import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeShowcase } from './code-showcase';

describe('CodeShowcase', () => {
  let component: CodeShowcase;
  let fixture: ComponentFixture<CodeShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeShowcase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeShowcase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
