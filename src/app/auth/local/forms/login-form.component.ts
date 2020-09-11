import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../models';
import { AlertMessage } from '../../../shared/models';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as auth from '../../actions/auth.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() loading: boolean;
  @Input() error: AlertMessage;
  @Output() submitted = new EventEmitter<Credentials>();
  hide = true;
  form: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<fromRoot.State>) { }
  ngOnInit() { }
  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
  alertClosed() {
    this.store.dispatch(new auth.ClearError());
  }
}
