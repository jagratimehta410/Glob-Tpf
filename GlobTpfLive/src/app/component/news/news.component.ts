import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { News } from '../../news';
import { NewsService } from '../../news.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  selectedNews: News | undefined;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchLatestNews();
  }

  fetchLatestNews(): void {
    this.newsService.getLatestNews().pipe(
      map((resp: any) => {
        return resp.content;
      })
    ).subscribe((newsData: News[]) => {
      // console.log(newsData);
      this.news = this.news.concat(newsData); // Concatenate fetched news to existing array
      // console.log(this.news);
    });

  }

  getImageUrl(base64Data: string | undefined): string {
    return `data:image/jpeg;base64,${base64Data}`;
  }

  trimDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }


  openModel(item: any | undefined) {
    this.selectedNews = item;
    const modelDiv = document.getElementById('news');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeModel() {
    const modelDiv = document.getElementById('news');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
