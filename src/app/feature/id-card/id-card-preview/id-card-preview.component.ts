import { Component, OnInit, ViewChild, Injector, QueryList, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ThreadService, AppService, TemplateService, BundleService } from '../../../core/services';

@Component({
  selector: 'app-id-card-preview',
  templateUrl: './id-card-preview.component.html',
  styleUrls: ['./id-card-preview.component.scss']
})
export class IdCardPreviewComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  @BlockUI() blockUI: NgBlockUI;
  private onDestroy$: Subject<void> = new Subject<void>();
  public uploadPath = "";
  idCardId: any;
  idCardDetails: any;
  idCardModel: any;
  profileImage: any;
  constructor(
    private location: Location,
    //private injector: Injector,
    private activeRoute: ActivatedRoute,
    private bundleService: BundleService,
    private threadService: ThreadService,
    private templateService: TemplateService,
    //private bundleParameter: BundleParameter,
    private rout: Router,
    private appService: AppService,
    private readonly meta: Meta
  ) { }

  ngOnInit() {

    this.blockUI.start("Loading...");
    this.uploadPath = this.appService.getApiPath() + 'uploads/';
    this.activeRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.idCardId = param.id;
      console.log("this.idCardId", this.idCardId)
      if (this.idCardId) {
        this.threadService.getThread("IdcardTemplate", 1003, this.idCardId).pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
          this.blockUI.stop();



          if (res['status'] && res['status'] == 1 && res['data'].length > 0) {


            this.idCardDetails = res['data'][0]
            this.idCardModel = this.idCardDetails['recentData'];

            console.log('this.dataModel.profileImage--->', this.uploadPath + this.idCardModel.profileImage)
            this.getBase64FromUrl(this.uploadPath + this.idCardModel.profileImage).then((imageDetials: any) => {
              this.profileImage = imageDetials;
            })



            //this.certificateDetails = res['data'][0];
            //let threadId = this.certificateDetails['idCardId'];
            //let boxId = 100;
            //let inboxId = 1001;
            //this.registrationId = environment.registrationIdPrefix + String(threadId).padStart(3, '0');
            //'0524' + String(threadId).padStart(3, '0');
            // let inboxItem = this.bundleService.getBundle(inboxId);
            // let templateName = inboxItem[0].defaultTemplate.name;
            // this.threadService.getThread(templateName, inboxId, threadId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            //   this.blockUI.stop();
            //   if (res['status'] && res['status'] == 1 && res['data'].length > 0) {
            //     this.thread = res['data'][0];
            //     this.dataModel = res['data'][0]['recentData'];
            //     console.log('this.dataModel.profileImage--->', this.uploadPath + this.dataModel.profileImage)
            //     this.getBase64FromUrl(this.uploadPath + this.dataModel.profileImage).then((imageDetials: any) => {
            //       this.profileImage = imageDetials;
            //     })
            //   }
            // })
          }
        })
      }
    });
  }

  back() {
    console.log('this.location', this.location)
    this.location.back();
  }

  downloadAsPDF_old(registrationId: any) {
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
      pdf.save('certificate_' + registrationId + '.pdf');
      if (screen.width < 1024) {
        this.meta.removeTag('name="viewport"');
        this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' })
      }
    });
  }

  downloadAsPDF(registrationId: any) {
    const data = this.pdfTable.nativeElement;

    html2canvas(data, {
      scale: 2,
      useCORS: true
    }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');

      // Convert 250px to millimeters (96 DPI)
      const imgWidth = 350 * 25.4 / 96;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      // Create a custom-size PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [imgWidth, imgHeight]
      });

      pdf.addImage(
        contentDataURL,
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );

      pdf.save('idCard_' + this.idCardModel.name + '.pdf');
    });
  }

  public getBase64FromUrl = async (url: string) => {
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
    const targetWidth = 150;

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
  };

}
