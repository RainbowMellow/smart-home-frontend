import { Component, OnInit } from '@angular/core';
import {SmartItemState} from '../shared/state/smartItem.state';
import {Observable} from 'rxjs';
import {SmartItem} from '../shared/models/smartItem.model';
import {Select, Store} from '@ngxs/store';
import {ListenForSmartItems, RequestSmartItems} from '../shared/state/smartItem.actions';
import {SmartItemService} from '../shared/services/smart-item.service';
import {Category} from '../shared/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(SmartItemState.smartItems)
  smartItems$: Observable<SmartItem[]> | undefined;
  smartItem: SmartItem;

  constructor(private store: Store,
              private service: SmartItemService) { }

  ngOnInit(): void {
    this.store.dispatch([new ListenForSmartItems(), new RequestSmartItems()]);

    const cate: Category = {
      name: 'Lamp'
    };

    this.smartItem = {
      name: 'Lamp',
      category: cate,
      xPos: 2,
      yPos: 1,
      on: true
    };

  }
}
