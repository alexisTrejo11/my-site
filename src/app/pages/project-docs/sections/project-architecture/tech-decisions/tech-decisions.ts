import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechDecisionModel } from '../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-tech-decisions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-decisions.html',
})
export class TechDecisions {
  selectedDecision: TechDecisionModel | null = null;

  decisions = input.required<TechDecisionModel[]>();

  selectDecision(decision: TechDecisionModel) {
    this.selectedDecision = this.selectedDecision === decision ? null : decision;
  }
}
