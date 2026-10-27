import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuConfigService } from '../../services/menu-config.service';
import { MenuConfig } from '../../../../core/config/menu.config';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit {
  /**
   * Component Constructor
   * 
   * @param menuConfigService: MenuConfigService
   */
  constructor(
    private menuConfigService: MenuConfigService
  ) { 
    this.menuConfigService.loadConfigs(new MenuConfig().configs);
  }

  ngOnInit() {
  }

}
