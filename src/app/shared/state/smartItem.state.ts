import {SmartItem} from '../models/smartItem.model';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
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
  UpdateSmartItems, UpdateToggledSmartItem
} from './smartItem.actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {LogService} from '../services/log.service';
import {UserState, UserStateModel} from './user.state';
import {DeleteSmartItemDto} from '../dtos/deleteSmartItem.dto';

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
              private logService: LogService,
              private store: Store) {
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
    const user = this.store.selectSnapshot(UserState.loggedInUser);
    const deleteDto = action.deleteDto;
    deleteDto.userName = user.name;
    this.smartItemService.deleteSmartItem(deleteDto);
  }

  @Action(ListenForDeletedSmartItem)
  listenForDeletedSmartItem(ctx: StateContext<SmartItemStateModel>): void {
    this.deletedSmartItemsUnsub = this.smartItemService.listenForDeletedSmartItem()
      .subscribe(id => {
        const state = ctx.getState();
        let smartItems = [...state.smartItems];
        smartItems = smartItems.filter((s) => s.id !== id);
        ctx.dispatch(new UpdateSmartItems(smartItems));
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
    const user = this.store.selectSnapshot(UserState.loggedInUser);
    const editDto = action.editDto;
    editDto.userName = user.name;
    this.smartItemService.editSmartItem(editDto);
  }

  @Action(ListenForEditedSmartItem)
  listenForEditedSmartItem(ctx: StateContext<SmartItemStateModel>): void {
    this.editedSmartItemsUnsub = this.smartItemService.listenForEditedSmartItem()
      .subscribe(smartItem => {
        const state = ctx.getState();
        const smartItems = [...state.smartItems];
        const index = smartItems.findIndex((s) => s.id === smartItem.id);
        smartItems[index] = smartItem;
        ctx.dispatch(new UpdateSmartItems(smartItems));
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
    const user = this.store.selectSnapshot(UserState.loggedInUser);
    const createDto = action.createDto;
    createDto.userName = user.name;
    this.smartItemService.createSmartItem(createDto);
  }

  @Action(ListenForNewSmartItem)
  listenForNewSmartItem(ctx: StateContext<SmartItemStateModel>): void {
    this.createdSmartItemsUnsub = this.smartItemService.listenForCreatedSmartItem()
      .subscribe(smartItem => {
        const state = ctx.getState();
        const smartItems = [...state.smartItems];
        smartItems.push(smartItem);
        ctx.dispatch(new UpdateSmartItems(smartItems));
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
    const user = this.store.selectSnapshot(UserState.loggedInUser);
    const toggleDto = action.toggleDto;
    toggleDto.userName = user.name;
    this.smartItemService.toggleSmartItem(toggleDto);
  }

  @Action(ListenForToggledSmartItem)
  listenForToggledSmartItem(ctx: StateContext<SmartItemStateModel>): void {
    this.toggledSmartItemsUnsub = this.smartItemService.listenForToggledSmartItem()
      .subscribe(toggleDto => {
        ctx.dispatch(new UpdateToggledSmartItem(toggleDto));
      });
  }

  @Action(UpdateToggledSmartItem)
  updateToggledSmartItem(ctx: StateContext<SmartItemStateModel>, action: UpdateToggledSmartItem): void {
    ctx.setState(
      patch({
        smartItems: updateItem<SmartItem>(item => item.id === action.toggleDto.id,
          patch({ on: action.toggleDto.on}))
      })
    );
  }

  @Action(StopListeningForToggledSmartItem)
  stopListeningForToggledSmartItem(): void {
    if (this.toggledSmartItemsUnsub) {
      this.toggledSmartItemsUnsub.unsubscribe();
    }
  }


}
