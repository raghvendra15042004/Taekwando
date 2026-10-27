import { Component, OnInit, ViewChild, Injector, QueryList, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BundleService } from '../../core/services/bundle.service';
import { TemplateService } from '../../core/services/template.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { BundleParameter } from '../../script/bundle-parameter';
import { ThreadService } from '../../core/services';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  @ViewChild('threadForm', { static: false }) form: NgForm;
  @BlockUI() blockUI: NgBlockUI;
  private onDestroy$: Subject<void> = new Subject<void>();
  private templateName: any;
  public boxId: Number;
  public inboxId: Number;
  public threadId;
  public inboxItem;
  public templateData: any;
  public dataModel: any = {};
  public template: any;
  private addMode: boolean;
  public thread: any;
  public inboxUIConfig: any;
  public bundleParams: any;
  public viewOnlyStatus = false;
  public pageTitle;
  templateScript: any;
  constructor(
    private injector: Injector,
    private activeRoute: ActivatedRoute,
    private bundleService: BundleService,
    private threadService: ThreadService,
    private templateService: TemplateService,
    private bundleParameter: BundleParameter,
    private rout: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.blockUI.start("Loading...");
    this.initialize();
  }

  initialize() {
    this.activeRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.boxId = param.boxId;
      this.inboxId = param.inboxId;
      this.inboxItem = this.bundleService.getBundle(this.inboxId);
      this.inboxUIConfig = this.inboxItem[0].inboxUIConfig;
      let templateName = this.inboxItem[0].defaultTemplate.name;

      let start = 0;
      let limit = 1;
      let sortingOrderConfig = "";
      let query = "";

      this.threadService.getThreads(this.inboxId, templateName, start, limit, query, sortingOrderConfig).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.blockUI.stop();
        if (res['status'] == 1 && res['data'].length > 0) {
          this.threadId = res['data'][0]['ai_id'];
        }
        if (this.threadId) {
          this.addMode = false;
          this.threadService.getThread(templateName, this.inboxId, this.threadId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            if (res['status'] && res['status'] == 1 && res['data'].length > 0) {
              this.thread = res['data'][0]
              this.dataModel = JSON.parse(JSON.stringify(res['data'][0]['recentData']));
              this.viewCustomForm();
            }
          })
        } else {
          this.addMode = true;
          this.viewCustomForm();
        }
      });
    });
  }

  viewCustomForm() {
    let templateName = this.inboxItem[0].defaultTemplate.name;
    this.templateService.getTemplateByName(templateName).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.template = res.data;
      this.pageTitle = this.template.pageTitle;
      this.templateService.scriptPath = this.template.scriptFiles;
      if (res.status && res.status == 1) {
        this.blockUI.stop();
        this.templateData = res.data;
        if (this.template.scriptFiles && this.template.scriptFiles.length) {
          this.templateService.scriptInstance.then((result) => {
            if (result != false) {
              this.templateService.setScriptInstance = new result.templateScript();
            }
            this.templateService.setTemplateConfig = this.templateData;
            setTimeout(() => {
              if (this.template.scriptFiles && this.template.scriptFiles.length) {
                this.templateService.scriptInstance.then((result) => {
                  if (this.template['postScript']) {
                    if (result && new result.templateScript()[this.template['postScript']]) {
                      this.templateScript = this.injector.get(result.templateScript);
                      this.templateScript[this.template['postScript']](this);
                    }
                  }
                })
              }
            })

          })
        }
      } else {
        this.blockUI.stop();
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.unsubscribe();
  }

  save(threadForm: any) {
    this.blockUI.start("Loading...");
    if (threadForm.valid) {
      if (this.addMode) {
        var templateData: any = {};
        templateData.infoData = this.dataModel;
        templateData.templateId = this.template.id;
        templateData.templateName = this.template.name;
        if (this.inboxUIConfig.preScript) {
          this.bundleParameter[this.inboxUIConfig.preScript](templateData, this).pipe(takeUntil(this.onDestroy$)).subscribe(responseTemplateData => {
            if (responseTemplateData !== false) {
              this.saveThread(responseTemplateData);
            } else {
              this.saveThread(templateData);
            }
          })
        }
      } else {
        var templateData: any = {};
        templateData.id = this.thread.ai_id;
        templateData.infoData = this.dataModel;
        templateData.templateId = this.template.id;
        templateData.templateName = this.template.name;
        if (this.inboxUIConfig.preScript) {
          this.bundleParameter[this.inboxUIConfig.preScript](templateData, this).pipe(takeUntil(this.onDestroy$)).subscribe(responseTemplateData => {
            if (responseTemplateData !== false) {
              this.saveThread(responseTemplateData);
            } else {
              this.saveThread(templateData);
            }
          })
        }
      }
    } else {
      this.blockUI.stop();
      Swal.fire({
        title: 'Please fill the required fields',
        icon: 'warning',
        showConfirmButton: true
      });
    }
  }

  saveThread(templateData) {
    this.threadService.saveThread(this.boxId, this.inboxId, templateData).pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      this.blockUI.stop();
      if (data && data['status'] == 1) {
        if (this.addMode)
          var popupText = "Successfully Added.";
        else
          var popupText = "Successfully Updated.";
        Swal.fire({
          title: "Success",
          text: popupText,
          icon: "success",
          showConfirmButton: true,
          showCancelButton: false
        }).then((status) => {
          if (status.value) {
            this.rout.navigateByUrl('feature/' + this.boxId + '/forms/' + this.inboxId);
          }
        });
      } else {
        Swal.fire({
          title: "Failed to add.",
          icon: "error",
          showConfirmButton: true
        })
      }
    }, error => {
      this.blockUI.stop();
      Swal.fire({
        title: "Please try later",
        icon: "error",
        showConfirmButton: true
      })
    })
  }
}
