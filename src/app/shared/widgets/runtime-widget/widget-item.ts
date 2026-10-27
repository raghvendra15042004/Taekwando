import { Type } from '@angular/core';

export class WidgetItem {
    constructor(public component: Type<any>, public Field: {}, public fieldModel: {}, public form: {}, public formConfig: any) {}
}