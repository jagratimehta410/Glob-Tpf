import { Component, Input, OnChanges, SimpleChanges, ElementRef, Renderer2, RendererStyleFlags2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() prjimage: any | undefined;
  @Input() prgtitle: string = '';

  safeImageUrl: SafeUrl | undefined;
  img: SafeUrl | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Initial checks and sanitization
    this.updateSafeImageUrl();
    if (typeof sessionStorage !== 'undefined') {
      const im = sessionStorage.getItem('immg');
      if (im) {
        this.img = this.sanitizer.bypassSecurityTrustUrl(im);
        console.log("image loaded");
        console.log(this.img);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Handle changes to input properties
    if (changes['prjimage']) {
      this.updateSafeImageUrl();
    }
    console.log(this.prjimage);
    console.log(this.prgtitle);
    console.log(this.safeImageUrl);
  }

  private updateSafeImageUrl(): void {
    if (this.prjimage) {
      this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.prjimage);
    }
  }
}