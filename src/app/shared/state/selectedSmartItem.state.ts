import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  UpdateSelectedSmartItemState,
} from './selectedSmartItem.action';
import {SmartItem} from '../models/smartItem.model';
import {BehaviorSubject, Subscription} from 'rxjs';

export interface SelectedSmartItemStateModel {
  selectedSmartItem: SmartItem;
}

@State<SelectedSmartItemStateModel>({
  name: 'selectedSmartItem',
  defaults: {
    selectedSmartItem: null
  }
})
@Injectable()
export class SelectedSmartItemState {

  @Selector()
  static selectedSmartItem(state: SelectedSmartItemStateModel): SmartItem {
    return state.selectedSmartItem;
  }

  @Action(UpdateSelectedSmartItemState)
  UpdateSelectedSmartItemState(ctx: StateContext<SelectedSmartItemStateModel>, action: UpdateSelectedSmartItemState): void {
    const state = ctx.getState();
    const newState: SelectedSmartItemStateModel = {
      ...state,
      selectedSmartItem: action.smartItem
    };
    ctx.setState(newState);
  }
}
