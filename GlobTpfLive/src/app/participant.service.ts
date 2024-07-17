import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participant } from './participant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private baseUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) { }

  private postUrl = `${this.baseUrl}/addparticpent`;
  private getUrl = `${this.baseUrl}/auth`;

  addParticpent(particpent: Participant): Observable<any> {
    return this.http.post(this.postUrl, particpent);
  }

  getParticpent(): Observable<any> {
    return this.http.get(this.getUrl);
  }

  getParticipantByEmailAndPassword(email: string, password: string): Observable<any> {
    const newUrl = `${this.baseUrl}/sec/bylogin`;
    const body = { email, password };
    return this.http.post(newUrl, body);
  }

  getDisabledParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.baseUrl}/sec/displaydisabled`);
  }

  updateParticipant(id: any, enable: boolean): Observable<any> {
    return this.http.get(`${this.baseUrl}/sec/enable/${id}/${enable}`);
  }

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sec/usercount`);
  }

  updatePassword(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/sec/forgotpassword`, body);
  }

  updateBasicDetails(formdata: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/sec/updatebasicdetails`, formdata)
  }
}
