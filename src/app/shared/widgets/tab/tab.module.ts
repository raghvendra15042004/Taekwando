import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { FormsModule } from '@angular/forms';

import { TextfieldComponent } from '../textfield/textfield.component';
import { RuntimeWidgetComponent } from '../runtime-widget/runtime-widget.component';
import { LabelComponent } from '../label/label.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { CheckboxgroupComponent } from '../checkboxgroup/checkboxgroup.component';
import { ComboComponent } from '../combo/combo.component';
import { DateFieldComponent } from '../date-field/date-field.component';
import { DateTimeFieldComponent } from '../date-time-field/date-time-field.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { NumberfieldComponent } from '../numberfield/numberfield.component';
import { TimeFieldComponent } from '../time-field/time-field.component';

import { RegisterFormControlsDirective } from '../../../directives/register-form-controls.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UploadModalComponent } from '../file-upload/upload-modal/upload-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetDirective } from '../../../directives/widget.directive';


@NgModule({
  declarations: [
    TabComponent,
    WidgetDirective,
    RegisterFormControlsDirective,
    TextfieldComponent,
    RuntimeWidgetComponent, 
    LabelComponent, 
    TextareaComponent, 
    RadioGroupComponent, 
    CheckboxgroupComponent, 
    ComboComponent, 
    DateFieldComponent, 
    DateTimeFieldComponent, 
    FileUploadComponent, 
    UploadModalComponent,
    NumberfieldComponent, 
    TimeFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    NgbModule
  ],
  exports: [
    TabComponent,
    RegisterFormControlsDirective,
    TextfieldComponent,
    TextareaComponent,
    ComboComponent,
    FileUploadComponent,
    UploadModalComponent,
    RadioGroupComponent,
    CheckboxgroupComponent,
    DateFieldComponent,
    DateTimeFieldComponent,
    TimeFieldComponent,
    NumberfieldComponent
  ],
  entryComponents: [
    TextfieldComponent,
    TextareaComponent,
    ComboComponent,
    FileUploadComponent,
    UploadModalComponent,
    RadioGroupComponent,
    CheckboxgroupComponent,
    DateFieldComponent,
    DateTimeFieldComponent,
    TimeFieldComponent,
    NumberfieldComponent
  ]
})
export class TabModule { }
