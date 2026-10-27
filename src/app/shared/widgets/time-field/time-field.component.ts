import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbPopover, NgbPopoverConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppService, TemplateService } from 'src/app/core/services';
import * as moment from 'moment';

@Component({
  selector: 'app-time-field',
  templateUrl: './time-field.component.html',
  styleUrls: ['./time-field.component.scss']
})
export class TimeFieldComponent implements OnInit {
  @Input() onChange = new EventEmitter<any>();
  @Input() fieldModel: any = {};
  @Input() Field: any;
  @Input() form: NgForm;
  @Input() formConfig: any;

  hourStep = 1;
  minuteStep = 1;
  secondStep = 1;
  seconds = true;
  time = {hour: 0, minute: 0, second: 0};
  constructor(
    private config: NgbPopoverConfig,
    public renderer: Renderer2,
    public elemRef: ElementRef,
    private appService: AppService,
    private templateService: TemplateService,
  ) { 
    this.config.autoClose = 'outside';
    this.config.placement = 'auto';
  }

  ngOnInit() {
    if(this.Field.options && this.Field.options.defaultTime && !this.fieldModel[this.Field.name]) {
      this.fieldModel[this.Field.name] = this.Field.options.defaultTime;
      let timeArray = this.Field.options.defaultTime.split(":");
      this.time.hour = Number(timeArray[0]);
      this.time.minute = Number(timeArray[1]);
      this.time.second = Number(timeArray[2]);
    }

    if(!this.fieldModel[this.Field.name]) {
      this.fieldModel[this.Field.name] = "";
    }
    this.loadScriptFile();
  }

  loadScriptFile() {
    try {
      if(this.templateService.scriptFiles && this.templateService.scriptFiles.length) {
        this.appService.getScriptFileInstance(this.templateService.scriptFiles[0]).then((res: any) => {
          this.Field['scriptInstance'] = res.templateScript;
          if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName && this.Field.listeners.onLoad !== false) {
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

  onTimeChange(event: any) {
    if(event){
      this.time.hour = event.hour;
      this.time.minute = event.minute;
      this.time.second = event.second;

      const timeString = `${this.pad(this.time.hour)}:${this.pad(this.time.minute)}:${this.pad(this.time.second)}`;
      this.fieldModel[this.Field.name] = timeString;

      if(this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName && this.Field['scriptInstance']) {
        try {
          this.templateService.formConfig = this.formConfig;
          new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
        } catch(exp) {
          console.log('Script Instance not found  -----> ',exp)
        }
      }
      this.onChange.emit(this);
    }
  }

  pad(num) {
    return (num < 10 ? '0' : '') + num;
  }

  clearFieldModel() {
    this.fieldModel[this.Field.name] = "";
    this.time = {hour: 0, minute: 0, second: 0};
    if(this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName && this.Field['scriptInstance']) {
      try {
        this.templateService.formConfig = this.formConfig;
        new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
      } catch(exp) {
        console.log('Script Instance not found  -----> ',exp)
      }
    }
  }
}
