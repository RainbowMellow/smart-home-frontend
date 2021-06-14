import {Component, OnDestroy, OnInit} from '@angular/core';
import {SmartItemState} from '../shared/state/smartItem.state';
import {Observable} from 'rxjs';
import {SmartItem} from '../shared/models/smartItem.model';
import {Select, Store} from '@ngxs/store';
import {
  ListenForAllSmartItems,
  ListenForDeletedSmartItem,
  ListenForEditedSmartItem,
  ListenForNewSmartItem,
  ListenForToggledSmartItem,
  RequestSmartItems,
  StopListeningForAllSmartItems,
  StopListeningForDeletedSmartItem,
  StopListeningForEditedSmartItem,
  StopListeningForNewSmartItem, StopListeningForToggledSmartItem
} from '../shared/state/smartItem.actions';
import {UserState} from '../shared/state/user.state';
import {User} from '../shared/models/user.model';
import {UpdateSelectedSmartItemState} from '../shared/state/selectedSmartItem.action';
import {RequestLogout} from '../shared/state/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @Select(SmartItemState.smartItems)
  smartItems$: Observable<SmartItem[]> | undefined;

  @Select(UserState.loggedInUser)
  loggedInUser$: Observable<User> | undefined;

  isCreating = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([
      new ListenForAllSmartItems(),
      new RequestSmartItems(),
      new ListenForNewSmartItem(),
      new ListenForDeletedSmartItem(),
      new ListenForEditedSmartItem(),
      new ListenForToggledSmartItem()
  ]);
  }

  onSelect(smartItem: SmartItem): void {
    console.log('smartItem selected: ' + smartItem.name);
    this.store.dispatch(new UpdateSelectedSmartItemState(smartItem));
    this.showCreate(false);
  }

  ngOnDestroy(): void {
    this.store.dispatch([
      new StopListeningForAllSmartItems(),
      new StopListeningForNewSmartItem(),
      new StopListeningForDeletedSmartItem(),
      new StopListeningForEditedSmartItem(),
      new StopListeningForToggledSmartItem()
    ]);
  }

  showCreate(show: boolean): void {
    this.isCreating = show;
  }

  requestLogout(): void {
    this.store.dispatch([
      new RequestLogout(),
      new UpdateSelectedSmartItemState(null),
    ]);
  }
}
