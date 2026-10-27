import { Component, ElementRef, EventEmitter, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDatepicker, NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppService, TemplateService } from 'src/app/core/services';
import { DateFieldType } from './date-field.model';
import * as moment from 'moment';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent implements OnInit {
  @Input() onChange = new EventEmitter<any>();
  @Input() fieldModel: any = {};
  @Input() Field: DateFieldType;
  @Input() form: NgForm;
  @Input() formConfig: any;
  inputDatetimeFormat: string;
  maxDate: any;
  minDate: any;
  datetime;
  editableDateField: any;
  validDateFormatStatus: boolean = true;
  @ViewChild('popOver', {static: true}) popOver: NgbPopover
  @ViewChild('dp', {static: true}) dp: NgbDatepicker;
  constructor(
    private config: NgbPopoverConfig,
    private calendar: NgbCalendar,
    public renderer: Renderer2,
    public elemRef: ElementRef,
    private appService: AppService,
    private templateService: TemplateService
  ) { 
    this.config.autoClose = 'outside';
  }

  ngOnInit() {
    // Disable the feture date from today date.
    if(this.Field.isDesabledFutureDate) {
      this.maxDate = this.calendar.getToday();
    } else if(this.Field.maxDate) {
      this.maxDate = this.Field.maxDate;
    }
      
    //Disable the past date from today date.
    if(this.Field.isDisabledPastDate) {
      this.minDate = this.calendar.getToday();
    } else if(this.Field.minDate) {
      this.minDate = this.Field.minDate;
    }
      
    // Set format of the datefield
    this.inputDatetimeFormat = this.Field.format ? this.Field.format : 'MM-DD-YYYY';

    //Set the fieldModel Data
    if(this.fieldModel[this.Field.name]) {
      this.setDateSelection(this.fieldModel[this.Field.name]);
      
      this.fieldModel[this.Field.name] = moment(this.fieldModel[this.Field.name]).format(this.inputDatetimeFormat)
    } else {
      if(this.Field.properties && this.Field.properties.defaultValue) {
        this.setDateSelection(this.Field.properties.defaultValue);
        this.fieldModel[this.Field.name] = moment(this.Field.properties.defaultValue).format(this.inputDatetimeFormat)
      } else {
        this.fieldModel[this.Field.name] = "";
      }
    }
    this.loadScriptFile();
  }

  setDateSelection(date = "") {
    if(date) {
      this.datetime = {
        year: moment(date).toDate().getFullYear(),
        month: moment(date).toDate().getMonth() + 1,
        day: moment(date).toDate().getDate()
      }
    } else {
      this.datetime = {
        year: moment().toDate().getFullYear(),
        month: moment().toDate().getMonth() + 1,
        day: moment().toDate().getDate()
      }
    }
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

  openCalendar() {
    if(!this.fieldModel[this.Field.name]) {
      if(this.Field.defaultTodayDate !== false) {
        this.setDateSelection();
        this.fieldModel[this.Field.name] = moment().format(this.inputDatetimeFormat)
      } 
    }
  }

  onDateChange($event: any) {
    this.popOver.close();
    this.editableDateField = false;
    let selectedDate = '';
    if($event) {
      selectedDate = this.dateInDDMMYYYY($event);
      this.setDateSelection(selectedDate);
    }
    this.setFieldModelDate(selectedDate);
    if(this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName) {
      try {
        this.templateService.formConfig = this.formConfig;
        new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
      } catch(exp) {
        console.log('Script Instance not found  -----> ',exp)
      }
    }
  }

  dateInDDMMYYYY($event) {
    if($event.year) {
      let year = $event.year;
      let month = $event.month;
      let day = $event.day;
      
      year = ($event.year).toString();
      if($event.month) {
        month = ($event.month).toString();
        if(month.length === 1) {
          month = '0' + month;
        }
      }

      if($event.day) {
        day = ($event.day).toString();
        if(day.length === 1) {
          day = '0' + day;
        }
      }
      return (month + '-' + day + '-' + year)
    }
  }

  setFieldModelDate(selectedDate) {
    this.fieldModel[this.Field.name] = moment(selectedDate).format(this.inputDatetimeFormat); 
  }

  clearFieldModel() {
    this.fieldModel[this.Field.name] = "";
    this.datetime = {};
    if(this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName && this.Field['scriptInstance']) {
      try {
        this.templateService.formConfig = this.formConfig;
        new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
      } catch(exp) {
        console.log('Script Instance not found  -----> ',exp)
      }
    }
  }

  onBlur() {
    if(!this.validDateFormatStatus) {
      this.validDateFormatStatus = true;
    }
  }

}
