import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuConfigService } from './menu-config.service';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {
  //Public properties
  menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /**
   * Service Constructor
   * 
   * @param menuConfigService 
   */
  constructor(
    private menuConfigService: MenuConfigService
  ) { 
    this.loadMenu();
  }

  /**
   * Load menu list
   */
  loadMenu() {
    const menuItems: any = this.menuConfigService.getMenus();
    this.menuList$.next(menuItems);
  }
}
