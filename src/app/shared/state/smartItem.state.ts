import {SmartItem} from '../models/smartItem.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SmartItemService} from '../services/smart-item.service';
import {Subscription} from 'rxjs';
import {ListenForSmartItems, RequestSmartItems, StopListeningForSmartItems, UpdateSmartItems} from './smartItem.actions';

export interface SmartItemStateModel {
  smartItems: SmartItem[];
}

@State<SmartItemStateModel>({
  name: 'smartItem',
  defaults: {
    smartItems: []
  }
})
@Injectable()
export class SmartItemState {
  private smartItemsUnsub: Subscription | undefined;
  constructor(private smartItemService: SmartItemService) {
  }

  @Selector()
  static smartItems(state: SmartItemStateModel): SmartItem[] {
    return state.smartItems;
  }

  @Action(ListenForSmartItems)
  getSmartItems(ctx: StateContext<SmartItemStateModel>): void {
    this.smartItemsUnsub = this.smartItemService.listenForAllSmartItems()
      .subscribe(smartItems => {
        ctx.dispatch(new UpdateSmartItems(smartItems));
      });
  }

  @Action(StopListeningForSmartItems)
  stopListeningForSmartItems(): void {
    if (this.smartItemsUnsub) {
      this.smartItemsUnsub.unsubscribe();
    }
  }

  @Action(UpdateSmartItems)
  updateSmartItems(ctx: StateContext<SmartItemStateModel>, uc: UpdateSmartItems): void {
    const state = ctx.getState();
    const newState: SmartItemStateModel = {
      ...state,
      smartItems: uc.smartItems
    };
    ctx.setState(newState);
  }

  @Action(RequestSmartItems)
  requestSmartItems(): void {
    this.smartItemService.requestAllSmartItems();
  }
}
