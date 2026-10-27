import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbPopover, NgbPopoverConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppService, TemplateService } from 'src/app/core/services';
import { DateTimeFieldType } from './date-time-field.model';
import * as moment from 'moment';

@Component({
  selector: 'app-date-time-field',
  templateUrl: './date-time-field.component.html',
  styleUrls: ['./date-time-field.component.scss']
})
export class DateTimeFieldComponent implements OnInit {

  @Input() onChange = new EventEmitter<any>();
  @Input() fieldModel: any = {};
  @Input() Field: DateTimeFieldType;
  @Input() form: NgForm;
  @Input() formConfig: any;
  inputDatetimeFormat: string;
  hourStep = 1;
  minuteStep = 1;
  secondStep = 1;
  seconds = true;
  maxDate: any;
  minDate: any;
  moment: any = moment;
  showTimePickerToggle = false;
  datetime: any;
  editableStatus;
  localdateTimeModel;
  inputFormatToShow;
  editableDateField: any;
  validDateFormatStatus: boolean = true;
  @ViewChild('popOver', {static: true}) popOver: NgbPopover
  constructor(
    private config: NgbPopoverConfig,
    private calendar: NgbCalendar,
    public renderer: Renderer2,
    public elemRef: ElementRef,
    private appService: AppService,
    private templateService: TemplateService,
    private cdRef: ChangeDetectorRef
  ) { 
    this.config.autoClose = 'outside';
    this.config.placement = 'auto';
  }

  ngOnInit() {
    // Disable the feture date from today date.
    if(this.Field.isDesabledFutureDate)
      this.maxDate = this.calendar.getToday();
    //Disable the past date from today date.
    if(this.Field.isDisabledPastDate)
      this.minDate = this.calendar.getToday();
    // Set format of the datefield
    this.inputDatetimeFormat = this.Field.format ? this.Field.format : 'MM-DD-YYYY hh:mm:ss A';

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
        day: moment(date).toDate().getDate(),
        hour: moment(date).toDate().getHours(),
        minute: moment(date).toDate().getMinutes(),
        second: moment(date).toDate().getSeconds(),
        timeZoneOffset: moment(date).toDate().getTimezoneOffset()
      }
    } else {
      this.datetime = {
        year: moment().toDate().getFullYear(),
        month: moment().toDate().getMonth() + 1,
        day: moment().toDate().getDate(),
        hour: moment().toDate().getHours(),
        minute: moment().toDate().getMinutes(),
        second: moment().toDate().getSeconds(),
        timeZoneOffset: moment().toDate().getTimezoneOffset()
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
    if($event) {
      if($event.year) {
        $event = `${$event.year}-${$event.month}-${$event.day}`;
        const date =  this.formLocalString($event);
        if(!date) {
          this.fieldModel[this.Field.name] = this.fieldModel[this.Field.name];
          return;
        }
        if(!this.datetime) {
          this.datetime = date;
        }

        this.datetime.year = date.year;
        this.datetime.month = date.month;
        this.datetime.day = date.day;
        this.datetime.hour = moment().toDate().getHours();
        this.datetime.minute = moment().toDate().getMinutes();
        this.datetime.second = moment().toDate().getSeconds();
        this.setFieldModelDate();
        if(this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName) {
          try {
            this.templateService.formConfig = this.formConfig;
            new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
          } catch(exp) {
            console.log('Script Instance not found  -----> ',exp)
          }
        }
      }
    }    
  }

  formLocalString(dateString: string) {
    const date =  moment(dateString).toDate();
    const isValidDate = !isNaN(date.valueOf());
    if(!dateString || !isValidDate) {
      return null;
    }
    return ({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      timeZoneOffset: date.getTimezoneOffset()
    });
  }

  setFieldModelDate() {
    this.fieldModel[this.Field.name] = moment(this.convertToISODateString(this.datetime)).toDate().toUTCString(); 
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

  toggleDateTimeState($event) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

  onTimeChange(event: NgbTimeStruct) {
    if(event){
      this.datetime.hour = event.hour;
      this.datetime.minute = event.minute;
      this.datetime.second = event.second;

      this.setFieldModelDate();

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

  private isInteger(value: any): value is number {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  }

  convertToISODateString(date): string {
    if(this.isInteger(date.year) && this.isInteger(date.month) && this.isInteger(date.day)) {
      const year = date.year.toString().padStart(2, '0');
      const month = date.month.toString().padStart(2, '0');
      const day = date.day.toString().padStart(2, '0');

      if(!date.hour) {
        date.hour = 0;
      }
      if(!date.minute) {
        date.minute = 0;
      }
      if(!date.second) {
        date.second = 0;
      }
      if(!date.timeZoneOffset) {
        date.timeZoneOffset = moment().toDate().getTimezoneOffset();
      }

      const hour = date.hour.toString().padStart(2, '0');
      const minute = date.minute.toString().padStart(2, '0');
      const second = date.second.toString().padStart(2, '0');

      const tzo = -date.timeZoneOffset;
      const dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      }
      const isoString = `${pad(year)}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}${dif}${pad(tzo / 60)}:${pad(tzo % 60)}`;
      return isoString;
    }
    return null;
  }

}
