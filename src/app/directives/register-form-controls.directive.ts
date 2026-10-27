import { Directive, Input, ElementRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Directive({
  selector: '[registerForm], [registerModel]',
  exportAs: 'registerForm, registerModel'
})
export class RegisterFormControlsDirective {

  @Input('registerForm') public form: NgForm;
  @Input('registerModel') public model: NgModel;

  constructor(private el: ElementRef) { 
    this.el = el.nativeElement;
  }

  ngOnInit() {
    if(this.form && this.model) {
      this.form.form.registerControl(this.model.name, this.model.control);
      this.form.addControl(this.model);
    }
  }
}
