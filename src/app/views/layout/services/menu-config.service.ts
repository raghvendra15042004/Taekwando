import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuConfigService {
  //Public properties
  onConfigUploaded$: Subject<any>;
  //Private properties
  private menuConfig: any;

  /**
   * Service Constructor
   */
  constructor() { 
    this.onConfigUploaded$ = new Subject();
  }

  /**
   * Returns the menu config
   */
  getMenus() {
    return this.menuConfig;
  }

  /**
   * Load Config
   * 
   * @param config: any
   */
  loadConfigs(config: any) {
    this.menuConfig = config;
    this.onConfigUploaded$.next(this.menuConfig);
  }
}
