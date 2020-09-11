import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './components/core/core.component';
import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../../material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './effects/core.effects';
import { reducers } from './reducers';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedModule } from '../../shared';
import { AzureModule } from 'src/app/auth/azure/azure.module';
import { LoadConfigEffects } from './effects/load-config.effect';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    StoreModule.forFeature('core', reducers),
    SharedModule,
    EffectsModule.forFeature([CoreEffects, LoadConfigEffects]),
    AzureModule
  ],
  declarations: [CoreComponent, SideMenuComponent],
  exports: [],
  entryComponents: []
})
export class CoreModule { }
