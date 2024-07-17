import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) { }

  addProject(formdata: FormData): Observable<any> {
    const api = `${this.baseUrl}/sec/addprojects`;
    return this.http.post(api, formdata);
  }

  getAllProjects(): Observable<Project[]> {
    const api = `${this.baseUrl}/sec/getAllProjects`;
    return this.http.get<Project[]>(api);
  }

  deleteById(project: Project): Observable<any> {
    const api = `${this.baseUrl}/sec/deletebyid`;
    const id = project.id;
    return this.http.post(api, id);
  }

  getPdf(): Observable<Blob> {
    const api = `${this.baseUrl}/api/v2/getPdf`;
    return this.http.get(api, { responseType: 'blob' });
  }

  updateData(proj: Project): Observable<any> {
    const api = `${this.baseUrl}/sec/update`;
    return this.http.post(api, proj);
  }

  uploadFile(video: FormData): Observable<any> {
    const api = `${this.baseUrl}/sec/uploadvideo`;
    return this.http.post(api, video);
  }

  getVideos(): Observable<any> {
    const api = `${this.baseUrl}/sec/showvideo`;
    return this.http.get<any>(api);
  }

  deleteVideo(id: number): Observable<any> {
    const api = `${this.baseUrl}/sec/deletevideo`;
    const body = { id };
    return this.http.post<any>(api, body);
  }

  getDetail(title: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sec/getproject`, title)
  }

  uploadImages(formdata: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sec/uploadimages`, formdata)

  }
  updateProjectImages(formdata: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sec/updateImages`, formdata)

  }
  loadById(title: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sec/loadbytitle`, title)
  }
}
