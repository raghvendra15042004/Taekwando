import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

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
  public saveThread(boxId, bundleId, data) {
    var userData = JSON.parse(localStorage.getItem('sessionData'));
    return this.http.post(this.appService.getApiPath() + 'thread', {
      params: {
        boxId: boxId,
        bundleId: bundleId,
        template: JSON.stringify(data),
        user: JSON.stringify(userData.user)
      }
    })
  }

  public getThreads(bundleId: any, templateName:any, start: any, limit: any, filterConfig: any, sortOrder: any, searchText?: any) {
    const httpheaders = this.appService.getHTTPHeaders();
    return this.http.get(this.appService.getApiPath() + 'thread', {
      //headers: httpheaders,
      params: {
        bundleId: bundleId,
        templateName: templateName,
        start: start,
        limit: limit,
        filterConfig: JSON.stringify(filterConfig),
        sortOrder: JSON.stringify(sortOrder),
        searchText: (searchText == undefined) ? "" : searchText
      }
    })
  }

  public getThread(templateName:any, bundleId: any, threadId: any) {
    let url = this.appService.getApiPath() + 'thread/' + templateName + '/' + bundleId + '/' + threadId;
    return this.http.get(url);
  }

  public deleteThread(templateName:any, threadId: any) {
    let url = this.appService.getApiPath() + 'thread/' + templateName + '/' + threadId;
    //return this.http.delete(url);

    return this.http.post(this.appService.getApiPath() + 'delete-thread', {
      params: {
        templateName: templateName,
        threadId: threadId
      }
    })
  }

  public countThreads(bundleId: any, templateName:any, filterConfig: any, searchText?: any) {
    const httpheaders = this.appService.getHTTPHeaders();
    return this.http.get(this.appService.getApiPath() + 'thread/count', {
      headers: httpheaders,
      params: {
        bundleId: bundleId,
        templateName: templateName,
        filterConfig: JSON.stringify(filterConfig),
        searchText: (searchText == undefined) ? "" : searchText
      }
    })
  }

  public uploadToTempDir(formData) {
    return this.http.post(this.appService.getApiPath() + 'upload/toTempDir', formData);
  }

  /**
   * This service is used to create a new thread with the given data
   * 
   * @param bundleId Id of the bundle
   * @param data New thread info to creat
   */
  public saveCertificate(medal, eventType, certificateType, threadId) {
    return this.http.post(this.appService.getApiPath() + 'save-certificate', {
      params: {
        medal: medal,
        event: eventType,
        certificateType: certificateType,
        participantId: threadId
      }
    })
  }

  public getCertificate(participantId:any) {
    let url = this.appService.getApiPath() + 'certificate/' + participantId;
    return this.http.get(url);
  }

  

  public getCertificateById(certificateId: any) {
    let url = this.appService.getApiPath() + 'certificate-by-id/' + certificateId;
    return this.http.get(url);
  }
}
