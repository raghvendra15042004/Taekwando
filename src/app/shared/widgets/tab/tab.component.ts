import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TabComponent implements OnInit {
  @Input() tab_config;
  @Input() tab_model = {};
  @Input() form: NgForm;
  //@Output() tabEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log('form', this.form)
  }

  ngAfterViewInit(): void {
    //this.tabEvent.emit(this);
  }

}
