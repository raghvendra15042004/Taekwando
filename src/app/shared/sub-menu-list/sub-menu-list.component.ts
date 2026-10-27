import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BundleService, BoxService } from '../../core/services';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'sub-menu-list',
  templateUrl: './sub-menu-list.component.html',
  styleUrls: ['./sub-menu-list.component.scss']
})
export class SubMenuListComponent implements OnInit, OnChanges {
  @BlockUI() blockUI: NgBlockUI;
  @Input() subMenu: any;
  @Output() onLoadSubMenu = new EventEmitter<any>();
  private onDestroy$: Subject<void> = new Subject<void>();
  public boxId: Number;
  public bundleId: Number;
  public boxItem;
  public inboxItem;
  public inboxItems;
  public bundle: any = [];
  public gridConfig: any = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private bundleService: BundleService, 
    private boxService: BoxService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.blockUI.start("Loading...");
    this.activeRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      console.log('param', param);
      this.boxId = param.boxId;
      this.bundleId = param.inboxId;
      this.boxItem = this.boxService.getBox(this.boxId);
      //this.bundle = this.bundleService.getBundle(this.boxItem[0].masterBundle);
      //console.log('this.bundle', this.bundle)
      //this.gridConfig = this.bundle[0]['inboxUIConfig']['gridViewConfg'];

      //this.bundle = this.bundleService.getBundle(this.bundleId);
      //this.bundleId = this.boxItem[0].masterBundle;
      this.inboxItems = this.bundleService.getBundlesByBoxId(this.boxId);
    });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
   // console.log('changes', changes)
  }

  loadSubmenu(item, currentIndex) {
    //this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }
    //this.bundleId = item.id;
    this.blockUI.start("Loading...");
    this.onLoadSubMenu.emit(item);
    let pageUrl =  '/feature/'+item.boxId+'/inbox/'+item.id
    this.router.navigate([pageUrl]);
  }

  ngOnDestroy() {
    this.onDestroy$.unsubscribe();
  }

}
