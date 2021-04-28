import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {NgxsModule} from '@ngxs/store';
import {SmartItemState} from '../shared/state/smartItem.state';
import { LogComponent } from './log/log.component';
import {LogMessageState} from '../shared/state/log.state';


@NgModule({
  declarations: [HomeComponent, LogComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxsModule.forFeature([SmartItemState, LogMessageState])
  ]
})
export class HomeModule { }
