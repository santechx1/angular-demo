import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertMessage } from '../../models';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: AlertMessage;
  @Output() closed = new EventEmitter();
  color = 'primary';
  text = 'Error inesperado';

  constructor() { }
  ngOnInit() {
    this.validate();
  }
  closeAlert() {
    this.closed.emit();
  }
  validate() {
    if (this.message.type === 'danger') {
      this.color = 'warn';
    }
    if (this.message.text !== null && this.message.text.length < 150) {
      this.text = this.message.text;
    }
  }
}
