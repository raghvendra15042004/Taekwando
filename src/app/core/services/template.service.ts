import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  public scriptFiles: Array<any>;
  public instance: any;
  public formConfig: Array<any>;

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }
  /**
   * It return the current template script file
   */
  get scriptPath(): Array<any> {
    return this.scriptFiles;
  }
  /**
   * It reset the current template script file name
   */
  set scriptPath(path: Array<any>) {
    this.scriptFiles = path;
  }
  /**
   * It return current template script instance.
   */
  get scriptInstance(): any {
    if(this.scriptFiles) {
      if(this.scriptFiles.length) {
        const scriptPath = (this.scriptFiles.length > 0) ? this.scriptFiles[0] : "";
        return import(`../../script/template/${scriptPath}.ts`).catch(function (Err) {
          console.log("Error in template script ---->", Err);
          return false;
        });
      }
    } else {
      return false;
    }
  }
  /**
   * It return the current template script Instance
   */
  get getScriptInstance(): any {
    return this.instance;
  }
  /**
   * It reset the current template script instance
   */
  set setScriptInstance(instance: any) {
    this.instance = instance;
  }
  /**
   * It return the current template config
   */
  get getTemplateConfig(): any {
    return this.formConfig;
  }
  /**
   * It reset the current template config
   */
  set setTemplateConfig(config: Array<any>) {
    this.formConfig = config;
  }
  /**
   * It returns the template data by the specified template name.
   * @param name : (Number) template Id
   */
  getTemplateByName(name: number | string): Observable<any> {
    const templateByNameObserver = new Observable(observer => {
      const url = this.appService.getApiPath() + 'template/' + name;
      this.http.get(url).subscribe(res => {
        observer.next(res);
        observer.complete();
      });
    });
    return templateByNameObserver;
  }

  public changeUI(config, items: Array<any>, type: string, status: any, ...restOfParams: any[]) {

    this.iterateTabElements(config, items, type, status, restOfParams).subscribe(responceList => {
      console.log(responceList);
    })
  }

  public iterateTabElements(config, items, type, status, restOfParams) {
    var results = [];
    items.forEach((item) => {
      results.push(this.updatePropertyWithObservable(config, item, type, status, restOfParams));
    })
    return forkJoin(results);
  }

  public updatePropertyWithObservable(config, item, type, status, restOfParams): Observable<any> {
    const updatePropertyWithObservable = new Observable(observer => {
      config.tabs.forEach((tab) => {
        if(tab.fields) {
          for(var field of tab.fields) {
            if(field['name'] == item) {
              field[type] = status;
              observer.next(item);
              observer.complete();
            }
          }
        }
      })
    })
    return updatePropertyWithObservable;
  }
}
