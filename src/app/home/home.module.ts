import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxsModule } from '@ngxs/store';
import { SmartItemState } from '../shared/state/smartItem.state';
import { LogComponent } from './log/log.component';
import { LogMessageState } from '../shared/state/log.state';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserState } from '../shared/state/user.state';
import { DetailComponent } from './detail/detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CategoryState} from '../shared/state/category.state';

@NgModule({
  declarations: [HomeComponent, LogComponent, UserComponent, DetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([SmartItemState, LogMessageState, UserState, CategoryState]),
    NgbModule
  ]
})
export class HomeModule { }
