import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TextfieldComponent } from '../textfield/textfield.component';
import { WidgetItem } from './widget-item';
import { TextareaComponent } from '../textarea/textarea.component';
import { ComboComponent } from '../combo/combo.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { CheckboxgroupComponent } from '../checkboxgroup/checkboxgroup.component';
import { DateFieldComponent } from '../date-field/date-field.component';
import { DateTimeFieldComponent } from '../date-time-field/date-time-field.component';
import { TimeFieldComponent } from '../time-field/time-field.component';
import { NumberfieldComponent } from '../numberfield/numberfield.component';
import { WidgetDirective } from '../../../directives/widget.directive';

@Component({
  selector: 'runtime-widget',
  templateUrl: './runtime-widget.component.html',
  styleUrls: ['./runtime-widget.component.scss']
})
export class RuntimeWidgetComponent implements OnInit {
  @Input() Field: any;
  @Input() fieldModel: any = {};
  @Input() form: NgForm;
  @Input() formConfig: any;
  @ViewChild(WidgetDirective, { static: true }) widgetContainer: WidgetDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if(this.Field) {
      let componentName;
      switch(this.Field.widget) {
        case "textfield":
          componentName = TextfieldComponent;
          break;
        case "numberfield":
          componentName = NumberfieldComponent;
          break;
        case "textarea":
          componentName = TextareaComponent;
          break;
        case "combo":
          componentName = ComboComponent;
          break;
        case "fileUpload": 
          componentName = FileUploadComponent
          break;
        case "radio": 
          componentName = RadioGroupComponent
          break;
        case "checkbox":
          componentName = CheckboxgroupComponent
          break;
        case "dateField":
          componentName = DateFieldComponent
          break;
        case "dateTimeField":
          componentName = DateTimeFieldComponent
          break;
        case 'timeField':
          componentName = TimeFieldComponent
          break;
      }

      if(componentName) {
        const component = new WidgetItem(componentName, this.Field, this.fieldModel, this.form,   this.formConfig);
        const componetFactory = this.componentFactoryResolver.resolveComponentFactory(component.component);
        const viewContainerRef = this.widgetContainer.viewContainerRef;
        const componentRef = viewContainerRef.createComponent(componetFactory);
        (componentRef.instance).Field = component.Field;
        (componentRef.instance).fieldModel = component.fieldModel; 
        (componentRef.instance).formConfig = component.formConfig; 
        (componentRef.instance).form = component.form;  
      }
    }
  }

}
