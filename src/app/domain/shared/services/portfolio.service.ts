import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience.model';
import { Projects } from '../models/projects.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private http: HttpClient) {}

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`assets/data/experience.json`);
  }

  getProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(`assets/data/projects.json`);
  }
}
