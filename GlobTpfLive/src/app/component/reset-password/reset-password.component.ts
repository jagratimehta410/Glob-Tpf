import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { ParticipantService } from '../../participant.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  email2: string = '';
  // email: string | undefined;
  constructor(private participentService: ParticipantService) { }
  ngOnInit(): void {
    /*const mail = prompt("Enter Your Email:", this.email2);
    if (mail) {
      localStorage.setItem('email', mail);
      this.email2 = mail;
      console.log(`Email saved: ${mail}`);
    } else {
      console.log('No email entered.');
    }
*/
  }

  onSubmit() {
    // Retrieve the email from localStorage
    const email = localStorage.getItem("email");

    // Check if email is not null
    if (email) {
      // Process the form submission (e.g., send the new password to the server)
      this.participentService.updatePassword(email, this.password).subscribe({
        next: (response) => {
          // Handle the response from the server
          console.log('Password updated successfully:', response);
          localStorage.removeItem("email")
        },
        error: (err) => {
          // Handle the error from the server
          console.error('Error updating password:', err);
        }
      });
    } else {
      // Handle the case when email is null (e.g., show an error message)
      console.error("No email found in local storage.");
    }
  }

}
