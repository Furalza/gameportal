import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = '/api/about'; // Express API endpoint

  constructor(private http: HttpClient) {}

  getAboutContent(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
