import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.html',
})
export class ContactForm {
  formData: FormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  async onSubmit() {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.submitSuccess = true;
      this.resetForm();
    } catch {
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: '',
      budget: '',
    };
  }
}
