import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {NgxsModule} from '@ngxs/store';
import {SmartItemState} from '../shared/state/smartItem.state';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxsModule.forFeature([SmartItemState]),
    NgbModule
  ]
})
export class HomeModule { }
