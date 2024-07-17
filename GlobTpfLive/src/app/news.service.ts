import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from './news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) { }

  uploadNews(formData: FormData): Observable<any> {
    const api = `${this.baseUrl}/sec/uploadnews`;
    return this.http.post(api, formData);
  }

  getLatestNews(page: number = 0, size: number = 10): Observable<News[]> {
    const url = `${this.baseUrl}/sec/latest?page=${page}&size=${size}`;
    return this.http.get<News[]>(url);
  }

  deleteById(id: number): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/sec/deletebyid/${id}`);
  }

  updateNews(news: News): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/sec/updatenews`, news);
  }
}
