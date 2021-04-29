import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {NgxsModule} from '@ngxs/store';
import {SmartItemState} from '../shared/state/smartItem.state';
import { LogComponent } from './log/log.component';
import {LogMessageState} from '../shared/state/log.state';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [HomeComponent, LogComponent, UserComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxsModule.forFeature([SmartItemState, LogMessageState])
  ]
})
export class HomeModule { }
