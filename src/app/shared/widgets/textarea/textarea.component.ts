import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TemplateService, AppService, ThreadService } from '../../../core/services';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Output() onChange = new EventEmitter<any>();
  @Input() fieldModel;
  @Input() Field: any;
  @Input() form: NgForm;
  @Input() formConfig: any;
  @ViewChild("name", { static: true }) textField: ElementRef;
  constructor(
    public appService: AppService,
    public templateService: TemplateService,
    public threadService: ThreadService
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

  click() {
    if(this.Field.listeners && this.Field.listeners.click && this.Field.listeners.click.methodName) {
      this.templateService.formConfig = this.formConfig;
      try {
        new this.Field['scriptInstance']()[this.Field.listeners.click.methodName](this);
      } catch(exp) {
        console.log('Click method not found  -----> ',exp)
      }
    }
  }

  // onblur() {
  //   if(this.Field.listeners && this.Field.listeners.onblur && this.Field.listeners.onblur.methodName) {
  //     this.templateService.formConfig = this.formConfig;
  //     try {
  //       new this.Field['scriptInstance']()[this.Field.listeners.onblur.methodName](this);
  //     } catch(exp) {
  //       console.log('On blur met nothod found  -----> ',exp)
  //     }
  //   }
  //   this.onChange.emit(this);
  // }

  change() {
    if(this.fieldModel[this.Field.name] && typeof this.fieldModel[this.Field.name] === 'string') {
      let regExp: RegExp;
      if(!this.Field.pattern) {
        regExp = new RegExp("[{}<>]", "g");
        setTimeout(function(){
          if(this.fieldModel[this.Field.name] && typeof this.fieldModel[this.Field.name] === 'string') {
            try {
              this.fieldModel[this.Field.name] = this.fieldModel[this.Field.name].repplace(regExp, '');
            } catch(exp) {
              console.log(exp);
            }
          }
        });
      }
    }
  }

  inputChange() {
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

  keyup() {
    if(this.Field.listeners && this.Field.listeners.keyup && this.Field.listeners.keyup.methodName) {
      this.templateService.formConfig = this.formConfig;
      try {
        new this.Field['scriptInstance']()[this.Field.listeners.keyup.methodName](this);
      } catch(exp) {
        console.log('Key up method not found  -----> ',exp)
      }
    }
  }

  action(button) {
    if(button.handler && button.handler.methodName) {
      this.templateService.formConfig = this.formConfig;
      try {
        new this.Field['scriptInstance']()[button.handler.methodName](this);
      } catch(exp) {
        console.log('Key up method not found  -----> ',exp)
      }
    }
  }

}