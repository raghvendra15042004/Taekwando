import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  origin;

  constructor() {
    this.origin = window.location.origin;
  }

  public getScriptFileInstance(scriptFileName) {
    return import(`../../script/template/${scriptFileName}`);
  }

  public getApiPath() {
    return environment.apiPath;
    //return this.origin + '/api/';
  }

  getHTTPHeaders() {
    const result = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });
    //result.set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    return result;
  }
}
