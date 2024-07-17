import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../project.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule


@Component({
  selector: 'app-add-project-gallary',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-project-gallary.component.html',
  styleUrl: './add-project-gallary.component.css'
})
export class AddProjectGallaryComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: string | undefined;
  images: File[] = [];
  formGroup: FormGroup = new FormGroup({});;

  constructor(private projectservices: ProjectService, private sanitizer: DomSanitizer, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projectservices.getAllProjects().pipe(
      map((projects: Project[]) => projects.map((project: Project) => this.createImage(project)))
    ).subscribe(response => {
      this.projects = response.map(project => {
        return project;
      });
    });

    this.formGroup = this.formBuilder.group({
      projectTitle: ['', Validators.required]
    });
  }

  createImage(project: Project): Project {
    return project;
  }


  onImageChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      for (let i = 0; i < files.length && i < 4; i++) {
        this.images.push(files[i]);
      }
    }
  }

  @ViewChild('projectTitle') projectTitle: ElementRef | undefined;
  onProjectChange() {
    this.selectedProject = this.formGroup.get('projectTitle')?.value;
    console.log(this.selectedProject);
  }

  onSubmit(event: Event) {
    event.preventDefault(); // This prevents the default form submission behavior

    const formData = new FormData();
    if (this.selectedProject) {
      formData.append('project', this.selectedProject);
    }

    // Append each image file individually
    for (let i = 0; i < this.images.length; i++) {
      formData.append('img', this.images[i]);
    }

    console.log(formData);

    this.projectservices.uploadImages(formData)
      .subscribe(
        resp => console.log(resp),
        err => console.log(err)
      );
    // You can perform any additional logic here, like submitting the data to a server or any other action.
  }

}
