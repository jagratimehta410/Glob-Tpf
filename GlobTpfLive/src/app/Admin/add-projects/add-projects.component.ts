import { Component } from '@angular/core';
import { Project } from '../../project';
import { ProjectService } from '../../project.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { title } from 'process';

@Component({
  selector: 'app-add-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css'],
})
export class AddProjectsComponent {
  loading = false; // Add a loading state
  project: Project = {
    title: '',
    description: '',
    projectDetails: {
      startingDate: '',
      endingDate: '',
      benifit: ['']
    },
    work: []
  };
  images: File[] = [];
  imagePreviews: string[] = [];

  addBenefit(): void {
    this.project.projectDetails.benifit.push('');
  }

  removeBenefit(index: number): void {
    this.project.projectDetails.benifit.splice(index, 1);
  }

  addWork(): void {
    this.project.work?.push({ title: '', description: '' });
  }

  removeWork(index: number): void {
    this.project.work?.splice(index, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  constructor(private projectService: ProjectService, private sanitizer: DomSanitizer) { }

  validate(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);

    if (selectedDate < currentDate) {
      return { currentDateValidator: true };
    }

    return null;
  }

  onSubmit(form: NgForm) {
    if (form.invalid || this.images.length < 2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields and upload at least two images.',
      });
      return;
    }

    this.loading = true; // Start loading

    const currentDate = new Date();
    const startingDate = new Date(this.project.projectDetails.startingDate);
    const endingDate = new Date(this.project.projectDetails.endingDate);

    if (startingDate < currentDate || endingDate < currentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Starting and ending dates cannot be less than the current date!',
      });
      this.loading = false; // Stop loading
      return; // Stop form submission
    }

    if (!this.project.title.trim() || !this.project.description.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Title and description fields cannot be empty!',
      });
      this.loading = false; // Stop loading
      return; // Stop form submission
    }

    const projectData = this.preparedFormData(this.project);

    this.projectService.addProject(projectData).subscribe(
      response => {
        Swal.fire({
          title: 'Good job!',
          text: 'Project Added',
          icon: 'success',
          allowOutsideClick: false,
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

  preparedFormData(project: Project): FormData {
    const formData = new FormData();
    formData.append('project', new Blob([JSON.stringify(project)], { type: 'application/json' }));
    formData.append('projectdetail', new Blob([JSON.stringify(project.projectDetails)], { type: 'application/json' }));

    for (let i = 0; i < this.images.length; i++) {
      formData.append('image', this.images[i]);
    }
    return formData;
  }

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      this.images = []; // Clear existing images
      this.imagePreviews = []; // Clear existing previews

      for (let i = 0; i < files.length; i++) {
        this.images.push(files[i]);
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
}
