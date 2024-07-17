import { Component, OnInit } from '@angular/core';
import { Project } from '../../project';
import { ProjectService } from '../../project.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';
import { Filehandle } from '../../filehandle';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custome-program',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custome-program.component.html',
  styleUrl: './custome-program.component.css'
})
export class CustomeProgramComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectservices: ProjectService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    this.projectservices.getAllProjects().pipe(
      map((projects: Project[]) => projects.map((project: Project) => this.createImage(project)))
    ).subscribe(response => {
      this.projects = response.map(project => {
        return project;
      });
    });
  }

  createImage(project: Project): Project {
    return project;
  }

  dataUrlToBlob(picByte: any, imageType: any) {
    const byteString = window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8array], { type: imageType });
    return blob;
  }


  getAdjustedIndex(index: number): number {
    return index;
  }

  getImageUrl(base64Data: string | undefined): string {
    return `data:image/jpeg;base64,${base64Data}`;
  }
  getDetails(title: any, imageurl: any) {
    sessionStorage.setItem('title', title)
    this.router.navigate(['/details'])
    // window.location.href = '/details'
  }
}
