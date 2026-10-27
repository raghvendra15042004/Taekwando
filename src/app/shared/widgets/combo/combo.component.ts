import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TemplateService, AppService, ThreadService } from '../../../core/services';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import _ from 'lodash';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent implements OnInit {
  @Output() onChange = new EventEmitter<any>();
  @Input() fieldModel;
  @Input() Field: any;
  @Input() form: NgForm;
  @Input() formConfig: any;
  @ViewChild("name", { static: true }) textField: ElementRef;
  dataSource = [];
  selectedItems = [];
  dropdownSettings: any = {};

  constructor(
    public appService: AppService,
    public templateService: TemplateService,
    public threadService: ThreadService
  ) { }

  ngOnInit() {
    if(!this.fieldModel[this.Field.name]) {
      this.fieldModel[this.Field.name] = (this.Field.properties && this.Field.properties.defaultValue) ? [this.Field.properties.defaultValue] : [];
    }
    this.loadScriptFile();
    setTimeout(() => {
      this.Field['data'] = this.Field.properties.dataSource;
    }, 500)
    
    this.dropdownSettings = {
      singleSelection: !this.Field.properties.multiSelect,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: this.Field.properties.multiSelect,
      itemsShowLimit: this.Field.itemsShowLimit ? this.Field.itemsShowLimit : 5,
      closeDropDownOnSelection: true,
      allowSearchFilter: true
    };
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

  onItemSelect(item: any, fieldName) {
    console.log(this)
    if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName) {
      try {
        this.templateService.formConfig = this.formConfig;
        new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
      } catch(exp) {
        console.log('Script Instance not found  -----> ',exp)
      }
    }
    this.onChange.emit(this)
  }

  onSelectAll(items: any, fieldName) {
    if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName) {
      try {
        this.templateService.formConfig = this.formConfig;
        new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
      } catch(exp) {
        console.log('Script Instance not found  -----> ',exp)
      }
    }
    this.onChange.emit(this)
  }

  onDeSelect(item: any, fieldName) {
    if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.onDeSelect && this.Field.listeners.onDeSelect.methodName) {
      try {
        this.templateService.formConfig = this.formConfig;
        new this.Field['scriptInstance']()[this.Field.listeners.onDeSelect.methodName](this);
      } catch(exp) {
        console.log('Script Instance not found  -----> ',exp)
      }
    }
    this.onChange.emit(this)
  }

  onDeSelectAll(items: any, fieldName) {
    if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName) {
      try {
        this.templateService.formConfig = this.formConfig;
        new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
      } catch(exp) {
        console.log('Script Instance not found  -----> ',exp)
      }
    }
    this.onChange.emit(this)
  }

  onFilterChange(item: any) {
    if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.onFilterChange && this.Field.listeners.onFilterChange.methodName) {
      try {
        this.templateService.formConfig = this.formConfig;
        new this.Field['scriptInstance']()[this.Field.listeners.onFilterChange.methodName](this);
      } catch(exp) {
        console.log('Script Instance not found  -----> ',exp)
      }
    }
    this.onChange.emit(this)
  }

}
