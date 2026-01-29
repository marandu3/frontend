import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

// ---- Interfaces (matching your FastAPI models) ----
export interface Profile {
  name: string;
  title: string;
  description?: string;
  social_links?: any;
  profile_image_url?: string;
}

export interface Education {
  level: string;
  institution: string;
  field_of_study: string;
  location: string;
  start_year: number;
  end_year?: number;
}

export interface Skill {
  name: string;
  icon_url?: string;
  description?: string;
  category?: string;
}

export interface Project {
  title: string;
  description?: string;
  picture_url?: string;
  github_url?: string;
  live_url?: string;
  start_date?: string;
  end_date?: string;
  technologies?: string[];
}

export interface TimelineEvent {
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
}

// ---------------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private BASE = 'https://pbackend-felb.onrender.com';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<LoginResponse>(`${this.BASE}/login`, formData);
  }

  // ========== PROFILE ==========
  getProfile(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.BASE}/profile`);
  }

  createOrUpdateProfile(data: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.BASE}/profile`, data);
  }


  // ========== EDUCATION ==========
  getEducations(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.BASE}/education/`);
  }

  createEducation(data: Education): Observable<Education> {
    return this.http.post<Education>(`${this.BASE}/education/`, data);
  }

  updateEducation(level: string, data: Education): Observable<Education> {
    return this.http.put<Education>(`${this.BASE}/education/${encodeURIComponent(level)}`, data);
  }

  deleteEducation(level: string): Observable<any> {
    return this.http.delete(`${this.BASE}/education/${encodeURIComponent(level)}`);
  }


  // ========== SKILLS ==========
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.BASE}/skills/`);
  }

  createSkill(data: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.BASE}/skills/`, data);
  }

  updateSkill(name: string, data: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.BASE}/skills/${encodeURIComponent(name)}`, data);
  }

  deleteSkill(name: string): Observable<any> {
    return this.http.delete(`${this.BASE}/skills/${encodeURIComponent(name)}`);
  }


  // ========== PROJECTS ==========
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.BASE}/projects/`);
  }

  createProject(data: Project): Observable<Project> {
    return this.http.post<Project>(`${this.BASE}/projects/`, data);
  }

  updateProject(name: string, data: Project): Observable<Project> {
    return this.http.put<Project>(`${this.BASE}/projects/${encodeURIComponent(name)}`, data);
  }

  deleteProject(name: string): Observable<any> {
    return this.http.delete(`${this.BASE}/projects/${encodeURIComponent(name)}`);
  }


  // ========== TIMELINE ==========
  getTimelineEvents(): Observable<TimelineEvent[]> {
    return this.http.get<TimelineEvent[]>(`${this.BASE}/timeline/`);
  }

  createTimelineEvent(data: TimelineEvent): Observable<TimelineEvent> {
    return this.http.post<TimelineEvent>(`${this.BASE}/timeline/`, data);
  }

  updateTimelineEvent(title: string, data: TimelineEvent): Observable<TimelineEvent> {
    return this.http.put<TimelineEvent>(`${this.BASE}/timeline/${encodeURIComponent(title)}`, data);
  }

  deleteTimelineEvent(title: string): Observable<any> {
    return this.http.delete(`${this.BASE}/timeline/${encodeURIComponent(title)}`);
  }

}
