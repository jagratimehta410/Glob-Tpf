import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../project.service';
import { Project } from '../../project';
import { Filehandle } from '../../filehandle';
import { DomSanitizer } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ProjectGallary } from '../../project-gallary';

@Component({
  selector: 'app-full-program',
  standalone: true,
  imports: [RouterLink, CommonModule, BreadcrumbComponent],
  templateUrl: './full-program.component.html',
  styleUrl: './full-program.component.css'
})
export class FullProgramComponent implements OnInit {
  prjimage: any
  project: Project = {
    title: '',
    description: '',
    projectDetails: {
      startingDate: '',
      endingDate: '',
      benifit: []
    },
    work: []
  }
  title: string | null = ''

  projectgallary!: ProjectGallary;



  getImageUrl(base64Data: string | undefined): string {
    return `data:image/jpeg;base64,${base64Data}`;
  }
  constructor(private projectservice: ProjectService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (sessionStorage != undefined) {
      this.title = sessionStorage.getItem('title');
    }
    this.projectservice.getDetail(this.title).subscribe(
      resp => {

        this.project = this.createImage(resp);
        this.prjimage = this.sanitizer.bypassSecurityTrustStyle('url(' + this.project.projectImage?.at(0)?.picByte + ')');

      },
      error => console.log(error)
    );

    console.log(this.projectgallary)
  }

  getBackgroundStyles() {
    return {
      'background-image': 'url(' + this.prjimage + ') !important'
    };
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

}
