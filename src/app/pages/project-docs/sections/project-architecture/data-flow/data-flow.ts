import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowStep } from '../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-data-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-flow.html',
})
export class DataFlow {
  requestFlow = input.required<FlowStep[]>();
  eventFlow = input.required<FlowStep[]>();
}
