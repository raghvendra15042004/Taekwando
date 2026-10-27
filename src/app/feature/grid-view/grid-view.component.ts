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
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
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
  public uploadPath ="";
  gridDetailsViewConfg;

  closeResult: string;
  modalOptions: NgbModalOptions;

  certificateType: any = "";
  eventType: any = "";
  medal: any = "";

  certificateDetails: any;
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
    private readonly meta: Meta,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.blockUI.start("Loading...");
    this.uploadPath = this.appService.getApiPath() + 'uploads/';
    this.activeRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.boxId = param.boxId;
      this.inboxId = param.inboxId;
      this.threadId = param.threadId;
      this.bundleParams = param.bundleParams;
      this.inboxItem = this.bundleService.getBundle(this.inboxId);
      this.inboxUIConfig = this.inboxItem[0].inboxUIConfig;
      this.gridDetailsViewConfg = this.inboxUIConfig['gridDetailsViewConfg'];
      let templateName = this.inboxItem[0].defaultTemplate.name;
      if (this.threadId) {
        this.addMode = false;
        this.threadService.getThread(templateName, this.inboxId, this.threadId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res['status'] && res['status'] == 1 && res['data'].length > 0) {
            this.thread = res['data'][0]
            this.dataModel = JSON.parse(JSON.stringify(res['data'][0]['recentData']));
            console.log('dataModel', this.dataModel)
            let templateName = this.inboxItem[0].defaultTemplate.name;
            this.templateService.getTemplateByName(templateName).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.template = res.data;
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
                  })
                }
              } else {
                this.blockUI.stop();
              }
            });
          }
        })

        this.getCertificate();
      }
    });
  }

  getCertificate() {
    this.blockUI.start("Loading...");
    this.threadService.getCertificate(this.threadId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.blockUI.stop();
      if (res['status'] && res['status'] == 1 && res['data'].length > 0) {
        this.certificateDetails = res['data'];
      }
    })
  }

  back() {
    console.log('this.location', this.location)
    this.location.back();
  }

  prevFiiewle(fileName) {
    if(fileName != "") {
      const link = document.createElement('a');
      link.href = this.appService.getApiPath() + '/uploads/' + fileName;
      link.target = 'new';
      link.click();
    }
  }

  showDate(dateString, dateFormat) {
    return moment(dateString).format(dateFormat.toUpperCase());
  }

  showRegistrationId(threadId) {
    return environment.registrationIdPrefix + String( threadId ).padStart(3, '0');
  }

  downloadAsPDF() {
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
      pdf.save('newPDF.pdf');
      if (screen.width < 1024) {
        this.meta.removeTag('name="viewport"');
        this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' })
      }
    });
  }


  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveCertificateType() {
    if (this.eventType == "") {
      Swal.fire({
        title: 'Choose Event',
        icon: 'warning',
      })
      return;
    }

    if (this.certificateType == "") {
      Swal.fire({
        title: 'Choose Certificate Type',
        icon: 'warning',
      })
      return;
    } else if(this.certificateType == "Merit") {
      if (this.medal == "") {
        Swal.fire({
          title: 'Choose Medal',
          icon: 'warning',
        })
        return;
      }
    }

    this.blockUI.start("Loading...");

    this.threadService.saveCertificate(this.medal, this.eventType, this.certificateType, this.threadId).pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      this.blockUI.stop();
      if(data && data['status'] == 1){
        let popupText = "Certificate Updated Successfully.";
        Swal.fire({
          title: "Success",
          text: popupText,
          icon: "success",
          showConfirmButton: true,
          showCancelButton: false
        }).then((status) => {
          if(status.value) {
            this.getCertificate();
          }
        });;
      } else {
        let msg = "";
        if (data['message'] == 'UNIQUE-CONSTRAINT') {
          msg = "This mobile no is already exist.";
        } else {
          msg = data['message'];
        }
        Swal.fire({
          title: msg,
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

  OpenCertificate(certificate) {
    this.router.navigate(['feature/certificate/' + certificate.ai_id]);
  }
}
