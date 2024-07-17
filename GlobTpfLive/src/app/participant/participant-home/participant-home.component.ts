import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParticipantNavComponent } from '../participant-nav/participant-nav.component';

@Component({
  selector: 'app-participant-home',
  standalone: true,
  imports: [RouterOutlet, ParticipantNavComponent],
  templateUrl: './participant-home.component.html',
  styleUrl: './participant-home.component.css'
})
export class ParticipantHomeComponent {

}
