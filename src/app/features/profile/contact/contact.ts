import { Component } from '@angular/core';
import { ContactForm } from './components/contact-form/contact-form';
import { ContactInfo } from './components/contact-info/contact-info';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, ContactInfo],
  template: `
    <div class="mb-12 px-24 flex flex-col gap-20 "><app-contact-form /> <app-contact-info /></div>
  `,
})
export class Contact {}
