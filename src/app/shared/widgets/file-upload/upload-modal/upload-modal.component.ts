import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { Observable, fromEvent, Subject } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';
import { ThreadService } from '../../../../core/services';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();
  @ViewChild('myInputFile', {static: false}) myInputFile: ElementRef;
  @Input() headerText;
  @Input() fieldConfig;
  @Input() fieldModel;
  @Input() threadId;
  fileModel: string;
  uploadFileDetails;
  uploadFileValidationStatus = true;
  uploadFileValidationMessage = '';
  public fileType;
  public fileDetails: any = {};
  isFileUploaded: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer,
    private threadService: ThreadService
  ) { }

  ngOnInit() {
    this.fileType = this.fieldConfig.fileType.toString();
  }

  inputFile(event) {
    if (!this.fieldConfig.disabled) {
      this.uploadFileDetails = event;
      const extension = (event.target.value).replace(/.*\./, '').toLowerCase();
      for (let i = 0; i < this.fieldConfig.fileType.length; i++) {
        if (extension === this.fieldConfig.fileType[i]) {
          this.uploadFileValidationStatus = false;
          break;
        }
        this.uploadFileValidationStatus = true;
        this.uploadFileValidationMessage = 'Please upload ' + this.fieldConfig.fileType.toString() + ' files only.';
      }
      if (event.target.files[0] / 1024 > this.fieldConfig.maxSize) {
        this.uploadFileValidationStatus = true;
        this.uploadFileValidationMessage = 'File size should be less than ' + this.fieldConfig.maxSize + ' KB.';
        this.fileDetails = {};
      }
      if (this.uploadFileValidationStatus) {
        this.fileDetails = {};
      } else {
        var reader = new FileReader();
        this.imageToBase64(reader, event.target.files[0])
          .subscribe(base64image => {
            this.fileDetails.thumbUrl = base64image;
            //this.fileDetails['thumbUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(base64image);
            //this.fileDetails['fileUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(base64image);
            if (event.target.files[0].type == 'application/pdf') {
              this.fileDetails['thumbUrl'] = '/assets/images/pdf.png';
            }
            if (event.target.files[0].type == 'application/doc' || event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
              this.fileDetails['thumbUrl'] = '/assets/images/doc.png';
            }
            this.fileDetails['fileName'] = event.target.files[0].name;
            this.fileDetails['fileSize'] = event.target.files[0].size / 1024;
            this.isFileUploaded = true;
          });
      }
      // _.forEach(event.target.files, (file) => {
      //   var fileName: any;
      //   var fileSize: any;
      //   var fileUrl: any;
      //   var thumbUrl: any;
      //   var reader = new FileReader();
      //   this.imageToBase64(reader, file)
      //   .subscribe(base64image => {
      //     fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(base64image); 
      //     thumbUrl = fileUrl;
      //   });

      //   if(file.type == 'application/pdf') {
      //     thumbUrl = '';
      //   } 
    }
  }

  /**
   * Returns the base64 string of the file reader data
   * @param fileReader 
   * @param fileToRead 
   */
  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

  clearFileDetails() {
    this.fileDetails = {};
    this.myInputFile.nativeElement.value = "";
    this.isFileUploaded = false;
  }

  saveUploadFile() {
    const formData = new FormData();
    formData.append('files', this.uploadFileDetails.target.files[0]);
    formData.append('fileType', this.fieldConfig.fileType);
    this.threadService.uploadToTempDir(formData).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res['status'] == 1) {
        this.activeModal.close(res['previewPath']);
      }
    });
  }
}