import { Component, OnInit } from '@angular/core';
import {SmartItemState} from '../shared/state/smartItem.state';
import {Observable} from 'rxjs';
import {SmartItem} from '../shared/models/smartItem.model';
import {Select, Store} from '@ngxs/store';
import {ListenForSmartItems, RequestSmartItems} from '../shared/state/smartItem.actions';
import {SmartItemService} from '../shared/services/smart-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(SmartItemState.smartItems)
  smartItems$: Observable<SmartItem[]> | undefined;

  constructor(private store: Store,
              private service: SmartItemService) { }

  ngOnInit(): void {
    this.store.dispatch(new ListenForSmartItems());
    // this.store.dispatch(new RequestSmartItems());
    this.service.requestAllSmartItems();
  }

}
