import { Component, Injectable, OnInit } from '@angular/core';
import { Project } from '../../project';
import { ProjectService } from '../../project.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Filehandle } from '../../filehandle';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

declare var bootstrap: any;

@Component({
  selector: 'app-display-project',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent implements OnInit {
  project: Project[] = [];
  paginatedProjects: Project[] = [];
  pageEvent: PageEvent | undefined;
  isEditable: boolean = false;
  modalImageUrl: SafeUrl | null = null;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading: boolean = true; // Add isLoading property
  selectedProject: Project | null = null; // To keep track of the project being updated
  images: File[] = []; // To store selected images for upload

  constructor(private projectservices: ProjectService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    this.projectservices.getAllProjects().pipe(
      map((projects: Project[]) => projects.map((project: Project) => this.createImage(project)))
    ).subscribe(response => {
      this.project = response.map(project => {
        this.isLoading = false;
        return project;
      });
      this.setPaginatedProjects();
    });
  }

  setPaginatedProjects() {
    const startIndex = this.pageEvent ? this.pageEvent.pageIndex * this.pageEvent.pageSize : 0;
    const endIndex = this.pageEvent ? startIndex + this.pageEvent.pageSize : this.project.length;
    this.paginatedProjects = this.project.slice(startIndex, endIndex);
  }

  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    this.pageSize = event.pageSize;
    this.setPaginatedProjects();
  }

  toggleEdit(proj: Project) {
    if (this.isEditable) {
      this.saveProject(proj);
    }
    this.isEditable = !this.isEditable;
  }

  saveProject(proj: Project) {
    this.projectservices.updateData(proj).subscribe(
      response => {
        console.log('Project updated successfully', response);
        window.location.href = "admin/displayproject";
      },
      error => {
        console.error('Error updating project', error);
      }
    );
  }

  deleteProject(project: Project) {
    this.projectservices.deleteById(project).subscribe(response => {
      Swal.fire({
        title: "Good job!",
        text: "Project Deleted",
        icon: "success"
      });
      this.project = this.project.filter(proj => proj !== project);
      this.setPaginatedProjects();
    }, error => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    });
  }

  createImage(project: Project): Project {
    return project;
  }

  getImageUrl(base64Data: string | undefined): string {
    return `data:image/jpeg;base64,${base64Data}`;
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

  openModel(imageUrl: any) {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
    this.modalImageUrl = this.getImageUrl(imageUrl);
  }

  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  openImageUpload(proj: Project) {
    this.selectedProject = proj;
    const modalElement = document.getElementById('imageUploadModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.images = Array.from(event.target.files);
    }
  }

  updateProjectImages() {
    if (this.selectedProject) {
      const formData = new FormData();
      if (this.selectedProject.id) {
        formData.append('id', this.selectedProject.id.toString())
      }
      for (let i = 0; i < this.images.length; i++) {
        formData.append('image', this.images[i]);
      }
      this.projectservices.updateProjectImages(formData).subscribe(
        response => {
          console.log('Images updated successfully', response);
          Swal.fire({
            title: 'Good job!',
            text: 'Images Updated',
            icon: 'success'
          });
          const modalElement = document.getElementById('imageUploadModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        },
        error => {
          console.error('Error updating images', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
          });
        }
      );
    }
  }
}
