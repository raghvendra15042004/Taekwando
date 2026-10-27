import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'widet-template',
  templateUrl: './widet-template.component.html',
  styleUrls: ['./widet-template.component.scss']
})
export class WidetTemplateComponent implements OnInit {
  @Input() widget_config: any;
  @Input() widget_model: {};
  @Input() form: NgForm;
  //@Output() customViewEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log('model', this.widget_model)
  }
}
