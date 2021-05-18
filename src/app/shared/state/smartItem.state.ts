import {SmartItem} from '../models/smartItem.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SmartItemService} from '../services/smart-item.service';
import {Subscription} from 'rxjs';
import {
  DeleteSmartItem, EditSmartItem,
  ListenForDeletedSmartItem, ListenForEditSmartItem,
  ListenForSmartItems,
  RequestSmartItems,
  StopListeningForSmartItems,
  UpdateSmartItems
} from './smartItem.actions';
import {EditSmartItemDto} from '../../home/detail/dtos/editSmartItem.dto';

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

  @Action(DeleteSmartItem)
  deleteSmartItem(id: number): void {
    this.smartItemService.deleteSmartItem(id);
  }

  @Action(ListenForDeletedSmartItem)
  listenForDeletedSmartItem(ctx: StateContext<SmartItemStateModel>): void {
    this.smartItemsUnsub = this.smartItemService.listenForDeleteSmartItem()
      .subscribe(smartItem => {
        const state = ctx.getState();
        let smartItems = [...state.smartItems];
        smartItems = smartItems.filter((s) => s.id !== smartItem.id);
        ctx.dispatch(new UpdateSmartItems(smartItems));
      });
  }

  @Action(EditSmartItem)
  editSmartItem(editDTO: EditSmartItemDto): void {
    this.smartItemService.editSmartItem(editDTO);
  }

  @Action(ListenForEditSmartItem)
  listenForEditedSmartItem(ctx: StateContext<SmartItemStateModel>): void {
    this.smartItemsUnsub = this.smartItemService.listenForEditSmartItem()
      .subscribe(smartItems => {
        ctx.dispatch(new UpdateSmartItems(smartItems));
      });
  }
}
