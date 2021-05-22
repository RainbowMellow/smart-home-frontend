import {SmartItem} from '../models/smartItem.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SmartItemService} from '../services/smart-item.service';
import {Subscription} from 'rxjs';
import {
  CreateSmartItem,
  DeleteSmartItem,
  EditSmartItem,
  ListenForAllSmartItems,
  ListenForDeletedSmartItem,
  ListenForEditedSmartItem,
  ListenForNewSmartItem, ListenForToggledSmartItem,
  RequestSmartItems,
  StopListeningForAllSmartItems,
  StopListeningForDeletedSmartItem,
  StopListeningForEditedSmartItem,
  StopListeningForNewSmartItem, StopListeningForToggledSmartItem,
  ToggleSmartItem,
  UpdateSmartItems
} from './smartItem.actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {LogService} from '../services/log.service';
import {UserStateModel} from './user.state';

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
  private allSmartItemsUnsub: Subscription | undefined;
  private deletedSmartItemsUnsub: Subscription | undefined;
  private editedSmartItemsUnsub: Subscription | undefined;
  private createdSmartItemsUnsub: Subscription | undefined;
  private toggledSmartItemsUnsub: Subscription | undefined;
  constructor(private smartItemService: SmartItemService,
              private logService: LogService) {
  }

  @Selector()
  static smartItems(state: SmartItemStateModel): SmartItem[] {
    return state.smartItems;
  }

  @Action(ListenForAllSmartItems)
  getSmartItems(ctx: StateContext<SmartItemStateModel>): void {
    this.allSmartItemsUnsub = this.smartItemService.listenForAllSmartItems()
      .subscribe(smartItems => {
        ctx.dispatch(new UpdateSmartItems(smartItems));
      });
  }

  @Action(StopListeningForAllSmartItems)
  stopListeningForAllSmartItems(): void {
    if (this.allSmartItemsUnsub) {
      this.allSmartItemsUnsub.unsubscribe();
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
  deleteSmartItem(ctx: StateContext<SmartItemStateModel>, action: DeleteSmartItem): void {
    this.smartItemService.deleteSmartItem(action.id);
  }

  @Action(ListenForDeletedSmartItem)
  listenForDeletedSmartItem(ctx: StateContext<SmartItemStateModel>, uctx: StateContext<UserStateModel>): void {
    this.deletedSmartItemsUnsub = this.smartItemService.listenForDeletedSmartItem()
      .subscribe(id => {
        const state = ctx.getState();
        let smartItems = [...state.smartItems];
        const deletedItem = smartItems.find(item => item.id === id);
        smartItems = smartItems.filter((s) => s.id !== id);
        ctx.dispatch(new UpdateSmartItems(smartItems));
        this.logService.triggerLogMessage({
          userString: uctx.getState().loggedInUser.name,
          message: `${deletedItem.name} was removed`,
          timeStamp: new Date()
        });
      });
  }

  @Action(StopListeningForDeletedSmartItem)
  stopListeningForDeletedSmartItem(): void {
    if (this.deletedSmartItemsUnsub) {
      this.deletedSmartItemsUnsub.unsubscribe();
    }
  }

  @Action(EditSmartItem)
  editSmartItem(ctx: StateContext<SmartItemStateModel>, action: EditSmartItem): void {
    this.smartItemService.editSmartItem(action.editDto);
  }

  @Action(ListenForEditedSmartItem)
  listenForEditedSmartItem(ctx: StateContext<SmartItemStateModel>, uctx: StateContext<UserStateModel>): void {
    this.editedSmartItemsUnsub = this.smartItemService.listenForEditedSmartItem()
      .subscribe(smartItem => {
        const state = ctx.getState();
        const smartItems = [...state.smartItems];
        const index = smartItems.findIndex((s) => s.id === smartItem.id);
        smartItems[index] = smartItem;
        ctx.dispatch(new UpdateSmartItems(smartItems));
        this.logService.triggerLogMessage({
          userString: uctx.getState().loggedInUser.name,
          message: `${smartItem.name} was updated`, // maybe add more detailed description here
          item: smartItem,
          timeStamp: new Date()
        });
      });
  }

  @Action(StopListeningForEditedSmartItem)
  stopListeningForEditedSmartItem(): void {
    if (this.editedSmartItemsUnsub) {
      this.editedSmartItemsUnsub.unsubscribe();
    }
  }

  @Action(CreateSmartItem)
  createSmartItem(ctx: StateContext<SmartItemStateModel>, action: CreateSmartItem): void {
    this.smartItemService.createSmartItem(action.createDto);
  }

  @Action(ListenForNewSmartItem)
  listenForNewSmartItem(ctx: StateContext<SmartItemStateModel>, uctx: StateContext<UserStateModel>): void {
    this.createdSmartItemsUnsub = this.smartItemService.listenForCreatedSmartItem()
      .subscribe(smartItem => {
        const state = ctx.getState();
        const smartItems = [...state.smartItems];
        smartItems.push(smartItem);
        ctx.dispatch(new UpdateSmartItems(smartItems));
        this.logService.triggerLogMessage({
          userString: uctx.getState().loggedInUser.name,
          message: `${smartItem.name} was created`,
          item: smartItem,
          timeStamp: new Date()
        });
      });
  }

  @Action(StopListeningForNewSmartItem)
  stopListeningForNewSmartItem(): void {
    if (this.createdSmartItemsUnsub) {
      this.createdSmartItemsUnsub.unsubscribe();
    }
  }

  @Action(ToggleSmartItem)
  toggleSmartItem(ctx: StateContext<SmartItemStateModel>, action: ToggleSmartItem): void {
    this.smartItemService.toggleSmartItem(action.toggleDto);
    console.log('state toggle smartItem called');
  }

  @Action(ListenForToggledSmartItem)
  listenForToggledSmartItem(ctx: StateContext<SmartItemStateModel>, uctx: StateContext<UserStateModel>): void {
    console.log('state listen for toggle smartItem was called');
    this.toggledSmartItemsUnsub = this.smartItemService.listenForToggledSmartItem()
      .subscribe(toggleDto => {
        ctx.setState(
          patch({
            smartItems: updateItem<SmartItem>(item => item.id === toggleDto.id,
              patch({ on: toggleDto.on}))
          })
        );
        const smartItem = ctx.getState().smartItems.find(item => item.id === toggleDto.id);
        const on = (toggleDto.on) ? 'on' : 'off';
        this.logService.triggerLogMessage({
          // userString: uctx.getState().loggedInUser.name,
          userString: 'tralala',
          message: `${smartItem.name} was turned ${on}`,
          item: smartItem,
          timeStamp: new Date()
        });
      });
  }

  @Action(StopListeningForToggledSmartItem)
  stopListeningForToggledSmartItem(): void {
    if (this.toggledSmartItemsUnsub) {
      this.toggledSmartItemsUnsub.unsubscribe();
    }
  }


}
