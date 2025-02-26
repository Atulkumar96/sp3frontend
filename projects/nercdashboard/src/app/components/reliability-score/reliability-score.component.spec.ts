import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliabilityScoreComponent } from './reliability-score.component';

describe('ReliabilityScoreComponent', () => {
  let component: ReliabilityScoreComponent;
  let fixture: ComponentFixture<ReliabilityScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReliabilityScoreComponent]
    });
    fixture = TestBed.createComponent(ReliabilityScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
