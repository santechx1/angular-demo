import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { CdkDetailRowDirective } from './directives/cdk-detail-row.directive';
import { AlertComponent } from './components/alert/alert.component';
import { AfterIfDirective } from './directives/after-if.directive';
import { CollectionPickerComponent } from './components/collection-picker/collection-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardDirective } from './directives/clipboard.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    CdkDetailRowDirective,
    AlertComponent,
    AfterIfDirective,
    CollectionPickerComponent,
    ClipboardDirective
  ],
  exports: [
    CdkDetailRowDirective,
    AlertComponent,
    AfterIfDirective,
    CollectionPickerComponent,
    ClipboardDirective
  ]
})
export class SharedModule { }
