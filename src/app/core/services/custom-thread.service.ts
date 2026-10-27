import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CustomThreadService {

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  /**
   * This service is used to create a new thread with the given data
   * 
   * @param bundleId Id of the bundle
   * @param data New thread info to creat
   */
   public createTieup() {
    var userData = JSON.parse(localStorage.getItem('sessionData'));
    return this.http.post(this.appService.getApiPath() + 'create-tiesheet', {
      params: {
        user: JSON.stringify(userData.user)
      }
    })
  }


  public getTieups(start: any, limit: any, filterConfig: any, searchText?: any) {
    return this.http.get(this.appService.getApiPath() + 'tiesheet', {
      params: {
        start: start,
        limit: limit,
        filterConfig: JSON.stringify(filterConfig),
        searchText: (searchText == undefined) ? "" : searchText
      }
    })
  }

  // public deleteThread(templateName:any, threadId: any) {
  //   let url = this.appService.getApiPath() + 'thread/' + templateName + '/' + threadId;
  //   return this.http.delete(url);
  // }

  public countTieups(filterConfig: any, searchText?: any) {
    const httpheaders = this.appService.getHTTPHeaders();
    return this.http.get(this.appService.getApiPath() + 'tiesheet/count', {
      headers: httpheaders,
      params: {
        filterConfig: JSON.stringify(filterConfig),
        searchText: (searchText == undefined) ? "" : searchText
      }
    })
  }
}
