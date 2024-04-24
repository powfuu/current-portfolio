import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience.model';
import { Projects } from '../../models/projects.model';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getExperience(): Observable<Experience[]> {
    if (this.utilService.langIsEs()) {
      return this.http.get<Experience[]>(`assets/data/es/experience.json`);
    }
    return this.http.get<Experience[]>(`assets/data/en/experience.json`);
  }

  getProjects(): Observable<Projects[]> {
    if (this.utilService.langIsEs()) {
      return this.http.get<Projects[]>(`assets/data/es/projects.json`);
    }
    return this.http.get<Projects[]>(`assets/data/en/projects.json`);
  }
}
