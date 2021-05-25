import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  ListenForSelectedSmartItem,
  UpdateSelectedSmartItemState,
  UpdateSelectedSmartItem, StopListeningForSelectedSmartItem,
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
  private selectedSmartItem: BehaviorSubject<SmartItem>;
  private unsub: Subscription | undefined;

  constructor() {
    this.selectedSmartItem = new BehaviorSubject<SmartItem>(null);
  }

  @Selector()
  static selectedSmartItem(state: SelectedSmartItemStateModel): SmartItem {
    return state.selectedSmartItem;
  }

  @Action(ListenForSelectedSmartItem)
  ListenForSelectedSmartItem(ctx: StateContext<SelectedSmartItemStateModel>): void {
    this.unsub = this.selectedSmartItem.asObservable()
      .subscribe(selectedSmartItem =>  {
        ctx.dispatch(new UpdateSelectedSmartItemState(selectedSmartItem));
      });
  }

  @Action(StopListeningForSelectedSmartItem)
  stopListeningForSelectedSmartItem(): void {
    if (this.unsub) {
      this.unsub.unsubscribe();
    }
  }

  @Action(UpdateSelectedSmartItem)
  UpdateSelectedSmartItem(ctx: StateContext<SelectedSmartItemStateModel>, action: UpdateSelectedSmartItem): void {
    this.selectedSmartItem.next(action.smartItem);
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
