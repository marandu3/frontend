import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {

  contactForm: FormGroup;
  sending = false;
  sent = false;
  error = false;
  darkMode = true; // Replace with your theme service
  toastMessage: string = '';
  showToast = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  sendEmail() {
    if (this.contactForm.invalid) return;

    this.sending = true;
    this.error = false;

    emailjs.send(
      'maranduemail2003', // service ID
      'template_d9acnxj', // template ID
      this.contactForm.value,
      'ebQFXEEZHSc4oAhyN' // public key
    ).then((result: EmailJSResponseStatus) => {
      this.sending = false;
      this.sent = true;
      this.toast('Message Sent Successfully!', 'success');
      this.contactForm.reset();

      setTimeout(() => this.sent = false, 3000);
    }, (err) => {
      console.error(err);
      this.sending = false;
      this.error = true;
      this.toast('Failed to Send. Try Again!', 'error');
      setTimeout(() => this.error = false, 3000);
    });
  }

  toast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.showToast = true;
    const toastEl = document.getElementById('toast');
    if (toastEl) {
      toastEl.className = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    }
    setTimeout(() => this.showToast = false, 3000);
  }

}
