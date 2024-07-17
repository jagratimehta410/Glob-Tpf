import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Participant } from '../../participant';
import { FormsModule } from '@angular/forms';
import { ParticipantService } from '../../participant.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  email2: string = '';
  url: string = "http://localhost:4200/reset";
  public sendEmail(e: Event, email: string) {
    e.preventDefault();
    // this.otp = this.generateOTP();

    const formData = {
      // user_name: this.name,
      user_email: email,
      subject: "Reset Password",
      message: "Reset Password Link",
      otp: this.url
    };

    emailjs.send('service_y58wz8l', 'template_ptdv287', formData, 'XzrY-_DP0kaNNqu_F')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  saveEmail(e: Event) {
    const mail = prompt("Enter Your Email:", this.email2);
    if (mail) {
      localStorage.setItem('email', mail);
      this.email2 = mail;
      this.sendEmail(e, mail)
      console.log(`Email saved: ${mail}`);
    } else {
      console.log('No email entered.');
    }
    alert("Reset Link is send to your mail")
  }

  constructor(private services: ParticipantService, private router: Router) { }
  onSubmit() {
    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait while we log you in.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(null);
      }
    });

    this.services.getParticipantByEmailAndPassword(this.email, this.password).subscribe(
      (participant: Participant) => {
        Swal.close();
        sessionStorage.setItem('username', participant.email);
        sessionStorage.setItem('password', this.password);
        sessionStorage.setItem('role', participant.roles.toString());
        sessionStorage.setItem('enabled', JSON.stringify(participant.enabled));

        if (participant && participant.roles) {
          if (participant.roles.includes("ROLE_PARTICIPANT") && participant.enabled) {
            this.router.navigate(['/participant']);
          } else if (participant.roles.includes("ROLE_ADMIN") && participant.enabled) {
            this.router.navigate(['/admin']);
          } else if (participant.roles.includes("ROLE_ADMIN_SUPER") && participant.enabled) {
            this.router.navigate(['/admin']);
          } else {
            // Redirect to default route if no matching role or enabled status
            window.location.reload(); // Change '/default' to your default route
          }
        } else {
          // Redirect to default route if participant or roles are null
          this.router.navigate(['/default']); // Change '/default' to your default route
          console.error('Participant or roles not as expected:', participant);
        }
      },
      (error: HttpErrorResponse) => {
        Swal.close();
        Swal.fire({
          title: 'Login Failed',
          text: error.message,
          icon: 'error'
        });
      }
    );
  }
}
