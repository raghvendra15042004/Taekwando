import { Component, OnInit } from '@angular/core';
import { MainMenuService } from '../../services/main-menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as objectPath from 'object-path';
import { MenuConfig } from '../../../../core/config/menu.config';
const systemConfig = require("../../../../core/config/systemConfig.json");

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public boxId: any;
  public bundleId: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private activeRoute: ActivatedRoute,
    public mainMenuService: MainMenuService,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('ewew');
   }

  public menuItems: any[] = [];

  ngOnInit() {
    this.boxId = localStorage.getItem('box_key');
    console.log('this.boxId', this.boxId)
    if(systemConfig.boxConfig.boxType != "single") {
      if(this.boxId && this.boxId != "") {
        this.menuItems = objectPath.get(new MenuConfig().defaults, 'menu.'+this.boxId);
      } else {
        this.menuItems = [];
      }
    } else {
      this.menuItems = objectPath.get(new MenuConfig().defaults, 'menu.'+systemConfig.boxConfig.startingBoxId);
    }
    
    console.log('this.menuItems', this.menuItems)
    // this.mainMenuService.menuList$.forEach(menuItem => {
    //   this.mainMenuService.menuList$.next(menuItem);
    // })
  }

  loadModule(pageUrl) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }
    //this.router.navigate([pageUrl]);
  }

  signOut() {
    this.authService.logout();
    // setTimeout(() => {
    //   this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }
    //   this.router.navigateByUrl('/auth');
    // }, 300)
  }
}
