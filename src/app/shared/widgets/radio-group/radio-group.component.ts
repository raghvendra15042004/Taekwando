import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService, TemplateService } from 'src/app/core/services';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements OnInit {
  @Input() onChange = new EventEmitter<any>();
  @Input() fieldModel: any = {};
  @Input() Field: any;
  @Input() form: NgForm;
  @Input() formConfig: any;
  constructor(
    private appService: AppService,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    if(!this.fieldModel[this.Field.name]) {
      this.fieldModel[this.Field.name] = (this.Field.properties && this.Field.properties.defaultValue) ? this.Field.properties.defaultValue : '';
    }
    this.loadScriptFile();
  }

  loadScriptFile() {
    try {
      if(this.templateService.scriptFiles && this.templateService.scriptFiles.length) {
        this.appService.getScriptFileInstance(this.templateService.scriptFiles[0]).then((res: any) => {
          this.Field['scriptInstance'] = res.templateScript;
          if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName && this.Field.listeners.onLoad != false) {
            try {
              this.templateService.formConfig = this.formConfig;
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

  change(event) {
    if(this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName) {
      this.templateService.formConfig = this.formConfig;
      try {
        new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
      } catch(exp) {
        console.log('Change method not found  -----> ',exp)
      }
    }
    this.onChange.emit(this);
  }
}
