import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Participant } from '../../participant';
import { ParticipantService } from '../../participant.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  particpiant: Participant = {
    name: '',
    email: '',
    password: '',
    contact: '',
    roles: ["Select Role"],
    enabled: false
  };

  loading: boolean = false;

  constructor(private particpentService: ParticipantService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.loading = true; // Start loading
    Swal.fire({
      title: 'Please wait...',
      text: 'Processing your registration',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(null);
      }
    });

    this.particpentService.addParticpent(this.particpiant).subscribe(
      response => {
        Swal.fire({
          title: 'Good job!',
          text: 'Sign up done !',
          icon: 'success'
        });
        this.loading = false; // Stop loading
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
        this.loading = false; // Stop loading
      }
    );
  }
}
