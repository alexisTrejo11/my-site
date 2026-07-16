import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PERSONAL_DATA } from '../../../../../core/constants/personal-data';

@Component({
  selector: 'app-cta-section',
  imports: [CommonModule],
  templateUrl: './cta-section.html',
})
export class CtaSection {
  email = PERSONAL_DATA.email;
  linkedin = PERSONAL_DATA.linkedin;
  github = PERSONAL_DATA.github;
}
