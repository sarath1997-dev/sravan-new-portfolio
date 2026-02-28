import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    location: new FormControl(''),
    message: new FormControl('', Validators.required),
  });

  isSubmitted = false;

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitted = true;
      const { name, email, location, message } = this.contactForm.value;

      const subject = `New Portfolio Contact from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nLocation: ${location || 'Not provided'}\n\nMessage:\n${message}`;

      const toEmail = 'myselfsravan21@gmail.com';
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(gmailUrl, '_blank');

      this.contactForm.reset();
      this.isSubmitted = false;
    }
  }
}
