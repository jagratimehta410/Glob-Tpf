import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminGallaryComponent } from '../admin-gallary/admin-gallary.component';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { AdminAllParticipantComponent } from '../admin-all-participant/admin-all-participant.component';
import { ParticipantService } from '../../participant.service';
import { ProjectService } from '../../project.service';
import { Participant } from '../../participant';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [RouterLink, AdminGallaryComponent, AdminHomeComponent, AdminUsersComponent, AdminAllParticipantComponent],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AdminNavComponent implements OnInit {
  counter: number = 0;
  isSuperAdmin: boolean = false;
  email: any;
  password: any = sessionStorage.getItem('password');
  adminName: string = "John Doe";
  adminImage: string | null = "https://www.gravatar.com/avatar/?d=mp";
  constructor(private router: Router, private participantService: ParticipantService, private pdf: ProjectService) { }
  ngOnInit(): void {
    this.email = sessionStorage.getItem('username');
    this.password = sessionStorage.getItem('password');
    if (!(sessionStorage.getItem('role') === "ROLE_ADMIN" || sessionStorage.getItem('role') === "ROLE_ADMIN_SUPER")) {
      window.location.href = "/";
    }
    if (sessionStorage.getItem('role') === "ROLE_ADMIN_SUPER") {
      this.isSuperAdmin = true;
    }
    this.participantService.getParticipantByEmailAndPassword(this.email, this.password).subscribe(
      (participant: Participant) => { this.adminName = participant.name });
    this.participantService.getUserCount().subscribe(res => this.counter = res);
  }


  deleteStorage() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('role')
  }

  downloadPdf() {
    this.pdf.getPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'product.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
