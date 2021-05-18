import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {NgxsModule} from '@ngxs/store';
import {SmartItemState} from '../shared/state/smartItem.state';
import { DetailComponent } from './detail/detail.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, DetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxsModule.forFeature([SmartItemState]),
    ReactiveFormsModule
  ]
})
export class HomeModule { }
