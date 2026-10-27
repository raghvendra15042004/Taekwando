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
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  @BlockUI() blockUI: NgBlockUI;
  private onDestroy$: Subject<void> = new Subject<void>();
  public certificateId: any;
  public templateData: any;
  public dataModel: any = {};
  public template: any;
  public thread: any;
  public inboxUIConfig: any;
  public bundleParams: any;
  public viewOnlyStatus = false;
  public uploadPath = "";
  gridDetailsViewConfg: any;
  certificateDetails: any;

  profileImage: any;
  certificateBgImage: any;
  adharCardUrl: any;
  registrationId: any;
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
    this.blockUI.start("Loading...");
    this.uploadPath = this.appService.getApiPath() + 'uploads/';
    this.activeRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.certificateId = param.certificateId;
      if (this.certificateId) {
        this.threadService.getCertificateById(this.certificateId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res['status'] && res['status'] == 1 && res['data'].length > 0) {
            this.certificateDetails = res['data'][0];
            let threadId = this.certificateDetails['participantId'];
            let boxId = 100;
            let inboxId = 1001;
            this.registrationId = environment.registrationIdPrefix + String(threadId).padStart(3, '0');
            //'0524' + String(threadId).padStart(3, '0');
            let inboxItem = this.bundleService.getBundle(inboxId);
            let templateName = inboxItem[0].defaultTemplate.name;
            this.threadService.getThread(templateName, inboxId, threadId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.blockUI.stop();
              if (res['status'] && res['status'] == 1 && res['data'].length > 0) {
                this.thread = res['data'][0];
                this.dataModel = res['data'][0]['recentData'];
                console.log('this.dataModel.profileImage--->', this.uploadPath + this.dataModel.profileImage)
                if (this.dataModel.profileImage) {
                  this.getBase64FromUrl(this.uploadPath + this.dataModel.profileImage).then((imageDetials: any) => {
                    this.profileImage = imageDetials;
                  })
                }

              }
            })
          }
        })
      }
    });

    this.certificateBgImage = this.getCertificateBgImageDimensions();
  }

  public getBase64FromUrl = async (url: string) => {
    try {
      const data = await fetch(url);
      const blob = await data.blob();

      const base64data: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(blob);

        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert image to Base64'));
          }
        };

        reader.onerror = () => reject(reader.error);
      });

      // Get image dimensions
      const dimensions = await new Promise<{
        originalWidth: number;
        originalHeight: number;
      }>((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          resolve({
            originalWidth: img.naturalWidth,
            originalHeight: img.naturalHeight
          });
        };

        img.onerror = () => reject(new Error('Failed to load image'));

        img.src = base64data;
      });

      // Calculate height for width = 125px
      const targetWidth = 110;

      const targetHeight = Math.round(
        (dimensions.originalHeight / dimensions.originalWidth) * targetWidth
      );

      return {
        path: base64data,
        originalWidth: dimensions.originalWidth,
        originalHeight: dimensions.originalHeight,
        width: targetWidth,
        height: targetHeight
      };
    } catch (error) {
      console.log(error)
    }
  };

  back() {
    console.log('this.location', this.location)
    this.location.back();
  }

  // downloadAsPDF(registrationId: any) {
  //   if (screen.width < 1024) {
  //     this.meta.removeTag('name="viewport"');
  //     this.meta.addTag({ name: 'viewport', content: 'width=1200' })
  //   }
  //   var data = this.pdfTable.nativeElement;
  //   html2canvas(data).then(canvas => {
  //     var imgWidth = 208;
  //     const pageHeight = 295;
  //     var imgHeight = canvas.height * imgWidth / canvas.width;
  //     let heightLeft = imgHeight;
  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jsPDF('p', 'mm', 'a4');
  //     var position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //     heightLeft -= pageHeight;
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
  //       heightLeft -= pageHeight;
  //     }
  //     pdf.save('certificate_' + registrationId + '.pdf');
  //     if (screen.width < 1024) {
  //       this.meta.removeTag('name="viewport"');
  //       this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' })
  //     }
  //   });
  // }


  downloadAsPDF(registrationId: any) {
    if (screen.width < 1024) {
      this.meta.removeTag('name="viewport"');
      this.meta.addTag({
        name: 'viewport',
        content: 'width=1200'
      });
    }

    const data = this.pdfTable.nativeElement;

    html2canvas(data, { scale: 2 }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      // A4 page dimensions in mm
      const pageWidth = pdf.internal.pageSize.getWidth();   // 210
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297

      // Page margins
      const margin = 1;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      console.log("availableWidth", availableWidth)
      console.log("availableHeight", availableHeight)

      // Original canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      console.log("canvasWidth", canvasWidth)
      console.log("canvasHeight", canvasHeight)

      // Calculate scale to fit within A4 while preserving aspect ratio
      const scale = Math.min(
        availableWidth / canvasWidth,
        availableHeight / canvasHeight
      );

      console.log("scale", scale)

      const imgWidth = canvasWidth * scale;
      const imgHeight = canvasHeight * scale;
      console.log("imgWidth", imgWidth)
      console.log("imgHeight", imgHeight)

      // Center image horizontally and vertically
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      console.log("x", x)
      console.log("y", y)

      pdf.addImage(
        contentDataURL,
        'PNG',
        x,
        y,
        imgWidth,
        imgHeight
      );

      pdf.save('certificate_' + registrationId + '.pdf');

      if (screen.width < 1024) {
        this.meta.removeTag('name="viewport"');
        this.meta.addTag({
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        });
      }
    });
  }


  public getCertificateBgImageDimensions = async () => {
    const url = 'assets/images/certificate.png';

    const img = new Image();

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = url;
    });

    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;

    // A4 portrait dimensions at 96 DPI
    const a4Width = 794;
    const a4Height = 1123;

    // Preserve aspect ratio and fit inside A4
    const scale = Math.min(
      a4Width / originalWidth,
      a4Height / originalHeight
    );

    const width = Math.round(originalWidth * scale);
    const height = Math.round(originalHeight * scale);

    console.log('Original width:', originalWidth);
    console.log('Original height:', originalHeight);
    console.log('A4 fitted width:', width);
    console.log('A4 fitted height:', height);

    return { width, height };
  };

  getWeightDivision(event: any) {
    if(event.toLowerCase() == "kyorugi" || event.toLowerCase() == "freshers") {
      return this.dataModel.weightDivision[0].split('(')[0].trim() || '';
    } else {
      return "";
    }    
  }

}
