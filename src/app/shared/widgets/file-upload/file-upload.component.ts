import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService, TemplateService } from '../../../core/services';
import { UploadModalComponent } from './upload-modal/upload-modal.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() onChange = new EventEmitter<any>();
  @Input() fieldModel;
  @Input() Field: any;
  @Input() form: NgForm;
  @Input() formCon
  modalOption: NgbModalOptions = {};
  threadId;
  fileName;
  requiredError = false;
  constructor(
    private modalService: NgbModal,
    public activatedRout: ActivatedRoute,
    private appService: AppService,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    if(this.Field.mandatory) {
      this.requiredError = true;
    }
    if(!this.fieldModel[this.Field.name]) {
      this.fieldModel[this.Field.name] = (this.Field.type == 'array') ? [] : '';
    } else {
      this.fileName = this.fieldModel[this.Field.name];
    }
    this.loadScriptFile();

    let routeParams: any = this.activatedRout.params;
    this.threadId = routeParams.value.threadId;

  }


  loadScriptFile() {
    try {
      if(this.templateService.scriptFiles && this.templateService.scriptFiles.length) {
        this.appService.getScriptFileInstance(this.templateService.scriptFiles[0]).then((res: any) => {
          this.Field['scriptInstance'] = res.templateScript;
          if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName && this.Field.listeners.onLoad != false) {
            try {
              new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
            } catch(exp) {
              console.log('Script Instance not found  -----> ',exp)
            }
          }
        });
      }
    } catch(exp) {
      console.log(exp)
    }
  }

  openUploadModal() {
    this.modalOption.backdrop = 'static';
    this.modalOption.backdropClass = 'modal-custom';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'xl' as any;
    const modalRef = this.modalService.open(UploadModalComponent, this.modalOption);

    modalRef.componentInstance.headerText = this.Field.text;
    modalRef.componentInstance.fieldConfig = this.Field;
    modalRef.componentInstance.fieldModel = this.fieldModel[this.Field.name];
    modalRef.componentInstance.threadId = this.threadId;

    modalRef.result.then((result) => {
      if(result) {
        this.requiredError = false;
        this.fileName = result;
        this.fieldModel[this.Field.name] = result;
      }
    });
  }

  prevFiiewle() {
    if(this.fileName != "") {
      const link = document.createElement('a');
      link.href = this.appService.getApiPath() + '/uploads/' + this.fileName;
      link.target = 'new';
      link.click();
    }
  }

  filePath() {
    if(this.fileName != "") {
      return this.appService.getApiPath() + '/uploads/' + this.fileName;
    }
  }
}
