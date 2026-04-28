import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bug, Bugreq } from './type';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  constructor(private http: HttpClient) {}

  getBugById(id: number) {
    return this.http.get<Bug>(`https://localhost:7167/bug/${id}`);
  }

  getAllBug() {
    return this.http.get<Bug[]>('https://localhost:7167/bug/all');
  }

  postBug(data: Bugreq) {
    return this.http.post<Bug>('https://localhost:7167/bug', data);
  }

  putBug(id: number, data: Bugreq) {
    return this.http.put<Bug>(`https://localhost:7167/bug/${id}`, data);
  }

  deleteBug(id: number) {
    return this.http.delete(`https://localhost:7167/bug/${id}`);
  }
}
