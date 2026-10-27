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
import { ThreadService, AppService } from '../../core/services';
import * as moment from 'moment';
import { Meta } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  @BlockUI() blockUI: NgBlockUI;
  private onDestroy$: Subject<void> = new Subject<void>();
  private templateName: any;
  public boxId: Number;
  public inboxId: Number;
  public threadId;
  public inboxItem;
  public templateData: any;
  public registerModel: any = {};
  public template: any;
  private addMode: boolean;
  public thread: any;
  public inboxUIConfig: any;
  public bundleParams: any;
  public viewOnlyStatus = false;
  public uploadPath ="";
  gridDetailsViewConfg;

  profileImageUrl;
  adharCardUrl;
  registrationId;
  constructor(
    private injector: Injector,
    private activeRoute: ActivatedRoute,
    private bundleService: BundleService,
    private threadService: ThreadService,
    private templateService: TemplateService,
    private bundleParameter: BundleParameter,
    private rout: Router,
    private location: Location,
    private appService: AppService,
    private readonly meta: Meta
  ) { }

  ngOnInit() {
    console.log('pdfTable', this.pdfTable)
    this.uploadPath = this.appService.getApiPath() + 'uploads/';
    this.activeRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.boxId = 100;
      this.inboxId = 1001;
      this.threadId = param.threadId;
      this.registrationId = environment.registrationIdPrefix + String(this.threadId).padStart(3, '0');
      //this.bundleParams = param.bundleParams;
      this.inboxItem = this.bundleService.getBundle(this.inboxId);
      this.inboxUIConfig = this.inboxItem[0].inboxUIConfig;
      this.gridDetailsViewConfg = this.inboxUIConfig['gridDetailsViewConfg'];
      let templateName = this.inboxItem[0].defaultTemplate.name;
      if (this.threadId) {
        this.addMode = false;
        this.threadService.getThread(templateName, this.inboxId, this.threadId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res['status'] && res['status'] == 1 && res['data'].length > 0) {
            this.thread = res['data'][0]
            this.registerModel = res['data'][0]['recentData'];

            this.getBase64FromUrl(this.uploadPath + this.registerModel.profileImage).then(path => {
              this.profileImageUrl = path;
            })
    
            this.getBase64FromUrl(this.uploadPath + this.registerModel.adharCard).then(path => {
              this.adharCardUrl = path;
            })           
          }
        })
      }
    });
  }

  public getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      }
    });
  }

  downloadAsPDF(registrationId) {
    if (screen.width < 1024) {
      this.meta.removeTag('name="viewport"');
      this.meta.addTag({ name: 'viewport', content: 'width=1200' })
    }
    var data = this.pdfTable.nativeElement;
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      const pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
        heightLeft -= pageHeight;
      }
      pdf.save(registrationId+'.pdf');
      if (screen.width < 1024) {
        this.meta.removeTag('name="viewport"');
        this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' })
      }
    });
  }

  back() {
    console.log('this.location', this.location)
    this.location.back();
  }

  showDateWithFormat(unformatedDate) {
    const compareDate = moment(unformatedDate, "YYYY-MM-DD");
    return compareDate.format('DD-MM-YYYY');
  }
}
