import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService, TemplateService } from 'src/app/core/services';

@Component({
  selector: 'app-checkboxgroup',
  templateUrl: './checkboxgroup.component.html',
  styleUrls: ['./checkboxgroup.component.scss']
})
export class CheckboxgroupComponent implements OnInit {
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
    this.loadScriptFile();
    if(!this.fieldModel[this.Field.name]) {
      this.fieldModel[this.Field.name] = [];
    }
    if(this.fieldModel[this.Field.name] && this.fieldModel[this.Field.name].length) {
      this.updateCheckBoxes();
    }
  }

  loadScriptFile() {
    try {
      if(this.templateService.scriptFiles && this.templateService.scriptFiles.length) {
        this.appService.getScriptFileInstance(this.templateService.scriptFiles[0]).then((res: any) => {
          this.Field['scriptInstance'] = res.templateScript;
          if(this.fieldModel[this.Field.name] && this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName) {
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

  updateCheckBoxes() {
    this.fieldModel[this.Field.name].forEach(fieldModelValue => {
      this.Field.children.filter(checkbox => {
        if(fieldModelValue === checkbox.text) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
    });
  }

  change(event) {
    if(!this.fieldModel[this.Field.name]) {
      this.fieldModel[this.Field.name] = [];
    }
    if(this.fieldModel[this.Field.name] && this.fieldModel[this.Field.name].length) {
      this.updateCheckBoxes();
    } else {
      this.Field.children.filter(checkbox => {
        checkbox.checked = false;
      });
    }
  }

  changeCheckBox(event, checkBoxName, checkBoxValue) {
    this.Field.children.filter(checkbox => {
      if(checkbox.name === checkBoxName) {
        if(event.target.checked) {
          checkbox.checked = true;
          if(this.fieldModel[this.Field.name].indexOf(checkBoxValue) === -1) {
            this.fieldModel[this.Field.name].push(checkBoxValue);
          }
        } else {
          checkbox.checked = false;
          let index = this.fieldModel[this.Field.name].indexOf(checkBoxValue);
          this.fieldModel[this.Field.name].splice(index, 1);
        }
        if(this.Field.listeners && this.Field.listeners.change && this.Field.listeners.change.methodName) {
          this.templateService.formConfig = this.formConfig;
          try {
            new this.Field['scriptInstance']()[this.Field.listeners.change.methodName](this);
          } catch(exp) {
            console.log('Change method not found  -----> ',exp)
          }
        }
      }
    });
    this.fieldModel[this.Field.name] = JSON.parse(JSON.stringify(this.fieldModel[this.Field.name]));
    this.onChange.emit(this);
  }

}
