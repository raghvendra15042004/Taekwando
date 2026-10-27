import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '..';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  login(userId: string, password: string): Observable<any> {
    password = window.btoa(password);
    return this.http.post(this.appService.getApiPath() + 'auth', {userId: userId, password: password});
  }

  get sessionData() {
    return JSON.parse(localStorage.getItem('sessionData'));
  }

  logout() {
    localStorage.removeItem('sessionData');
    window.location.reload();
  }
}
