import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact1',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './contact1.component.html',
  styleUrls: ['./contact1.component.css']
})
export class Contact1Component {

  name: string = "";
  email: string = "";
  subject: string = "";
  message: string = "";

  constructor() { }

  sendEmail(event: Event): void {
    event.preventDefault();

    Swal.fire({
      title: 'Sending...',
      text: 'Please wait while we send your message.',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const form = {
      user_name: this.name,
      user_email: this.email,
      subject: this.subject,
      message: this.message,
    };

    emailjs.send('service_y58wz8l', 'template_9oo1t4g', form, 'XzrY-_DP0kaNNqu_F')
      .then((response: EmailJSResponseStatus) => {
        console.log('Email sent successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Email sent successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        this.resetForm();
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to send email',
          text: 'Please try again later.',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  resetForm(): void {
    this.name = "";
    this.email = "";
    this.subject = "";
    this.message = "";
  }
}
